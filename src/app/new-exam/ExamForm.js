"use client";
import Image from "next/image";
import plus from "@/Assets/plus.png";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import NewQuestionForm from "./NewQuestionForm";
import GenerateQuestions from "./GenerateQuestions";
import { grades } from "@/constants";
import MCQQuestionInView from "./MCQQuestionInView";
import { DtPicker } from "react-calendar-datetime-picker";
import "react-calendar-datetime-picker/dist/style.css";
import { useRouter } from "next/navigation";
import { toastError, toastSuccess } from "@/Components/Toast";
import SegmentQuestionInView from "./SegmentQuestionInView";
import moment from "moment/moment";

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
  const [generateQuestionModal, setGenerateQuestionModal] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const toggleNewQuestionPop = () => {
    setNewQuestionModal((prev) => !prev);
  };

  const toggleGenerateQuestionModal = () => {
    setGenerateQuestionModal((prev) => !prev);
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
  const addNewQuestions = (questions) => {
    console.log(questions);
    setExamDetails((prev) => ({
      ...prev,
      questions: [...prev.questions, ...questions],
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

  const changeQuestion = (newQuestion) => {
    console.log(newQuestion);
    setExamDetails((prev) => {
      const newQuestions = prev.questions.map((question) => {
        if (question.questionType === newQuestion.questionType) {
          if (question.questionType !== "segment") {
            return question.questionContent.questionHead ==
              newQuestion.questionContent.questionHead ||
              question.questionContent.answers[0].value ===
                newQuestion.questionContent.answers[0].value
              ? newQuestion
              : question;
          } else {
            return question.questionContent.segment ==
              newQuestion.questionContent.segment
              ? newQuestion
              : question;
          }
        } else {
          return question;
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
        from: moment(`${result.year}-${result.month}-${result.day}`).format(
          "YYYY-MM-DD"
        ),
      }));
    }
  };
  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4 lg:w-4/5 grow lg:items-center lg:flex-nowrap">
        <input
          autoFocus
          className="w-full py-2 text-lg bg-transparent border-b-2 border-gray-400 indent-2 focus:outline-none text-text"
          placeholder="Exam Name"
          name="examName"
          onChange={changeExamDetails}
        />
        <select
          className="w-full py-2 text-lg bg-transparent border-2 border-gray-400 rounded-md indent-2 "
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
      <div className="flex flex-col items-center gap-2 mt-2 lg:m-4">
        {examDetails.questions.map((question, index) =>
          question.questionType !== "segment" ? (
            <MCQQuestionInView
              changeQuestion={changeQuestion}
              question={question}
              key={question.questionHead}
            />
          ) : (
            <SegmentQuestionInView
              changeQuestion={changeQuestion}
              question={question}
              key={index}
            />
          )
        )}
      </div>
      <button
        onClick={toggleGenerateQuestionModal}
        className="fixed flex gap-2 p-2 px-4 rounded-full bg-secondary bottom-24 right-5 lg:right-10"
      >
        <Image src={plus} alt="add new question" width={28} />
        Generate Questions
      </button>
      <button
        onClick={toggleNewQuestionPop}
        className="fixed flex gap-2 p-2 px-4 rounded-full bg-secondary bottom-10 right-5 lg:right-10"
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
      {isMounted && generateQuestionModal
        ? createPortal(
            <GenerateQuestions
              addNewQuestions={addNewQuestions}
              addSegmentQuestion={addNewQuestion}
              closeModal={toggleGenerateQuestionModal}
            />,
            document.body
          )
        : null}

      {examDetails.questions.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 text-xl font-bold text-white border-2 border-gray-400 rounded-lg lg:w-1/2 bg-orange hover:shadow-md"
          >
            Puplish Exam{" "}
          </button>
        </div>
      )}
    </div>
  );
}

export default ExamForm;
