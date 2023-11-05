"use client";
import Image from "next/image";
import plus from "@/Assets/plus.png";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import NewQuestionForm from "./NewQuestionForm";
import { grades } from "@/constants";
import MCQQuestionInView from "./MCQQuestionInView";
import { DtPicker } from "react-calendar-datetime-picker";
import "react-calendar-datetime-picker/dist/style.css";
import { useRouter } from "next/navigation";
import { toastError, toastSuccess } from "@/Components/Toast";
import SegmentQuestionComponent from "./SegmentQuestionComponent";
import SegmentQuestionInView from "./SegmentQuestionInView";

function ExamForm() {
  const [examDetails, setExamDetails] = useState({
    examName: "",
    grade: "grade 1",
    questions: [],
    stats: {
      times: [],
      averageTimes: 0,
      scores: [],
      averageScore: 0,
      highestScore: [{ owners: [], score: 0 }],
      lowestScore: [{ owners: [], score: 0 }],
    },
    from: "",
  });
  const Router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [newQuestionModal, setNewQuestionModal] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const toggleNewQuestionPop = () => {
    setNewQuestionModal((prev) => !prev);
  };
  const changeExamDetails = (e) => {
    setExamDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const addNewQuestion = (question) => {
    console.log(question);
    setExamDetails((prev) => ({
      ...prev,
      questions: [...prev.questions, question],
    }));
  };

  const handleSubmit = async () => {
    const req = await fetch("/api/teacher/createExam", {
      method: "POST",
      body: JSON.stringify(examDetails),
    });
    const response = await req.json();
    console.log(response);
    if (response && response.success) {
      toastSuccess("تم نشر الامتحان بنجاح");
      Router.push("/teacher-dashboard?exam=" + response.newExam._id);
    } else {
      toastError("حدث خطأ حاول مرة أخري");
    }
  };

  const changeQuestionAnswer = (newQuestion) => {
    console.log(newQuestion);
    setExamDetails((prev) => {
      const newQuestions = prev.questions.map((question) => {
        console.log(question);
        if (question.questionType !== "segment") {
          return question.questionContent.questionHead ==
            newQuestion.questionContent.questionHead
            ? newQuestion
            : question;
        } else {
          return question.questionContent.segment ==
            newQuestion.questionContent.segment
            ? newQuestion
            : question;
        }
      });
      return {
        ...prev,
        questions: newQuestions,
      };
    });
  };
  const handleChangeCalendar = (result) => {
    if (result) {
      console.log(result);
      setExamDetails((prev) => ({
        ...prev,
        from: new Date(result.year, result.month - 1, result.day),
      }));
    }
  };
  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4 lg:w-4/5 grow lg:items-center lg:flex-nowrap">
        <input
          autoFocus
          className="px-4 py-2 text-lg bg-transparent border-b-2 border-gray-400 focus:outline-none"
          placeholder="Exam Name"
          name="examName"
          onChange={changeExamDetails}
        />
        <select
          className="px-4 py-2 text-lg bg-transparent border-2 border-gray-400 rounded-md "
          defaultValue={examDetails.grade}
          name="grade"
          onChange={changeExamDetails}
        >
          {grades.map((grade) => (
            <option value={grade.value} key={grade.value}>
              {grade.name}
            </option>
          ))}
        </select>
        <DtPicker
          showTimeInput
          onChange={handleChangeCalendar}
          placeholder="Date:"
          fromLabel="من يوم:"
          inputClass=" bg-transparent "
        />
      </div>
      <div className="flex flex-col items-center gap-4 m-4">
        {examDetails.questions.map((question, index) =>
          question.questionType !== "segment" ? (
            <MCQQuestionInView
              changeQuestionAnswer={changeQuestionAnswer}
              question={question}
              key={question.questionHead}
            />
          ) : (
            <SegmentQuestionInView
              changeQuestionAnswer={changeQuestionAnswer}
              question={question}
              key={index}
            />
          )
        )}
      </div>
      <button
        onClick={toggleNewQuestionPop}
        className="fixed flex gap-2 p-2 px-4 rounded-full bg-secondary bottom-10 right-10"
      >
        <Image src={plus} alt="add new question" width={28} />
        Create New Question{" "}
      </button>
      {isMounted && newQuestionModal
        ? createPortal(
            <NewQuestionForm
              addNewQuestion={addNewQuestion}
              closeModal={toggleNewQuestionPop}
            />,
            document.body
          )
        : null}
      {examDetails.questions.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-xl font-bold border-2 border-gray-400 rounded-lg bg-orange hover:shadow-md"
          >
            Puplish Exam{" "}
          </button>
        </div>
      )}
    </div>
  );
}

export default ExamForm;
