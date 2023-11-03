"use client";

import { useState } from "react";

function MCQQuestionComponent({ addNewQuestion, questionType, closeModal }) {
  const [questionDetails, setQuestionDetails] = useState({
    questionHead: "",
    explaination: "",
    stats: { correctNo: 0 },
    answers: [
      { correct: true, value: "", stats: { choosen: 0 } },
      { correct: false, value: "", stats: { choosen: 0 } },
      { correct: false, value: "", stats: { choosen: 0 } },
      { correct: false, value: "", stats: { choosen: 0 } },
    ],
  });
  const changeQuestionHeadORExplain = (e) => {
    setQuestionDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const changeCorrectAnswer = (e) => {
    const id = e.target.id;

    setQuestionDetails((prev) => ({
      ...prev,
      answers: prev.answers.map((answer, index) => {
        if (index == id) {
          return { ...answer, correct: true };
        } else {
          return { ...answer, correct: false };
        }
      }),
    }));
  };
  const changeAnswerText = (e) => {
    const id = e.target.id;
    setQuestionDetails((prev) => ({
      ...prev,
      answers: prev.answers.map((answer, index) => {
        if (index == id) {
          return { ...answer, value: e.target.value };
        } else {
          return answer;
        }
      }),
    }));
  };
  return (
    <div className="p-4  max-h-[90vh]">
      <textarea
        required
        name="questionHead"
        placeholder="رأس السؤال"
        onChange={changeQuestionHeadORExplain}
        className="w-3/4 p-3 mb-4 bg-transparent border-b-2"
      />
      {questionDetails.answers.map((answer, index) => (
        <div className="flex items-end gap-4 mb-2" key={index}>
          <input
            id={index}
            required
            onChange={changeAnswerText}
            className="w-3/4 p-3 bg-transparent border-b-2"
            placeholder="إجابة"
          />
          <input
            onChange={changeCorrectAnswer}
            type="radio"
            className="w-6 h-6 "
            id={index}
            defaultChecked={answer.correct}
            name="answer"
          ></input>
        </div>
      ))}
      <textarea
        name="explaination"
        placeholder="تفسير الاجابة"
        className="w-3/4 p-3 bg-transparent border-2 rounded-md"
        onChange={changeQuestionHeadORExplain}
        value={questionDetails.explaination}
      ></textarea>
      <div className="flex self-end gap-4">
        <button
          className="p-2 text-xl rounded-md bg-orange"
          onClick={(e) => {
            e.preventDefault();
            addNewQuestion({ questionType, questionContent: questionDetails });
            closeModal();
          }}
        >
          أضف السؤال
        </button>
        <button
          onClick={closeModal}
          className="p-2 text-xl text-white rounded-md bg-purple"
        >
          إلغاء
        </button>
      </div>
    </div>
  );
}

export default MCQQuestionComponent;
