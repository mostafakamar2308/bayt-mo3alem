"use client";
import Image from "next/image";
import plus from "@/Assets/plus.png";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import NewQuestionForm from "./NewQuestionForm";
import { grades } from "@/constants";
import QuestionInView from "./QuestionInView";
import {
  DtPicker,
  convertToEn,
  convertToFa,
} from "react-calendar-datetime-picker";
import "react-calendar-datetime-picker/dist/style.css";

function ExamForm() {
  const [examDetails, setExamDetails] = useState({
    examName: "",
    grade: "grade 1",
    questions: [],
    from: "",
    to: "",
  });
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
    setExamDetails((prev) => ({
      ...prev,
      questions: [...prev.questions, question],
    }));
  };

  const changeQuestionAnswer = (newQuestion) => {
    setExamDetails((prev) => {
      const newQuestions = prev.questions.map((question) => {
        if (question.questionHead == newQuestion.questionHead) {
          return {
            ...newQuestion,
          };
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
    if (result && result.to) {
      setExamDetails((prev) => ({
        ...prev,
        from: new Date(result.from.year, result.from.month, result.from.day),
        to: new Date(result.to.year, result.to.month, result.to.day),
      }));
    }
  };
  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4 lg:w-4/5 grow lg:items-center lg:flex-nowrap">
        <input
          autoFocus
          className="px-4 py-2 text-lg bg-transparent border-b-2 border-gray-400 focus:outline-none"
          placeholder="أدخل اسم الامتحان"
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
          placeholder="تاريخ بداية الامتحان"
          type="range"
          fromLabel="من يوم:"
          toLabel="إلي يوم:"
          inputClass=" bg-transparent "
        />
      </div>
      <div className="flex flex-col items-center gap-4 m-4">
        {examDetails.questions.map((question) => (
          <QuestionInView
            changeQuestionAnswer={changeQuestionAnswer}
            question={question}
            key={question.questionHead}
          />
        ))}
      </div>
      <button
        onClick={toggleNewQuestionPop}
        className="fixed w-24 h-24 rounded-full bottom-10 left-10"
      >
        <Image src={plus} alt="add new question" />
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
        <div className="flex gap-4 text-xl">
          <button className="px-4 py-2 border-2 border-gray-400 rounded-lg hover:shadow-md">
            عرض
          </button>
          <button className="px-4 py-2 font-bold border-2 border-gray-400 rounded-lg bg-orange hover:shadow-md">
            حفظ ونشر
          </button>
        </div>
      )}
    </div>
  );
}

export default ExamForm;
