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
    <div className="lg:p-4 p-2  lg:max-h-[90vh] max-h-[95vh]">
      <textarea
        required
        name="questionHead"
        placeholder="Question Head"
        onChange={changeQuestionHeadORExplain}
        className="w-full p-3 mb-4 bg-transparent border-b-2 lg:w-3/4"
      />
      {questionDetails.answers.map((answer, index) => (
        <div className="flex items-end gap-4 mb-2" key={index}>
          <input
            id={index}
            required
            onChange={changeAnswerText}
            className="p-3 bg-transparent bg-white border-b-2 lg:w-3/4 text-text"
            placeholder="Answer"
          />
          <input
            onChange={changeCorrectAnswer}
            type="radio"
            className="w-6 h-6 "
            id={index}
            defaultChecked={answer.correct}
            name="answer"
          />
        </div>
      ))}
      <textarea
        name="explaination"
        placeholder="Explaination"
        className="w-full p-3 bg-transparent border-2 rounded-md lg:w-3/4"
        onChange={changeQuestionHeadORExplain}
        value={questionDetails.explaination}
      ></textarea>
      <div className="flex justify-end gap-4">
        <button
          onClick={closeModal}
          className="p-2 text-xl text-white rounded-md bg-purple"
        >
          Cancel
        </button>
        <button
          className="p-2 text-xl text-white rounded-md bg-orange"
          onClick={(e) => {
            e.preventDefault();
            addNewQuestion({ questionType, questionContent: questionDetails });
            closeModal();
          }}
        >
          Add Question{" "}
        </button>
      </div>
    </div>
  );
}

export default MCQQuestionComponent;
