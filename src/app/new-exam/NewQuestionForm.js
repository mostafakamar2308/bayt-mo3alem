"use client";
import { useState } from "react";
const initialState = {
  type: "MCQ",
  questionHead: "",
  answers: [{ correct: true, value: "" }],
};

function NewQuestionForm({ addNewQuestion, closeModal }) {
  const [questionDetails, setQuestionDetails] = useState(initialState);
  const addAnswer = () => {
    questionDetails.answers.length < 5
      ? setQuestionDetails((prev) => ({
          ...prev,
          answers: [...prev.answers, { correct: false, value: "" }],
        }))
      : "";
  };
  const changeQuestionHead = (e) => {
    setQuestionDetails((prev) => ({ ...prev, questionHead: e.target.value }));
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
          console.log({ index, id });
          return { ...answer, value: e.target.value };
        } else {
          return answer;
        }
      }),
    }));
  };
  return (
    <div className="absolute w-screen h-screen bg-[rgba(0,0,0,.5)]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addNewQuestion(questionDetails);
          closeModal();
        }}
        className="absolute flex flex-col w-1/2 gap-5 p-4 overflow-hidden text-xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg top-1/2 left-1/2 text-text "
      >
        <div className="">
          <input
            required
            placeholder="رأس السؤال"
            onChange={changeQuestionHead}
            className="w-3/4 p-3 mb-4 bg-transparent border-b-2"
          />

          {questionDetails.answers.map((answer, index) => (
            <div className="flex items-end gap-4 mb-2" key={index}>
              <input
                required
                onChange={changeAnswerText}
                id={index}
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
          <button
            onClick={addAnswer}
            className="w-1/2 p-3 border rounded-lg hover:bg-gray-400"
          >
            + أضف اجابة...{" "}
          </button>
        </div>
        <div className="flex self-end gap-4">
          <button
            type="submit"
            className="p-2 text-xl rounded-md bg-orange"
            onSubmit={(e) => {
              e.preventDefault();
              addNewQuestion(questionDetails);
              closeModal();
            }}
          >
            حفظ
          </button>
          <button
            onClick={closeModal}
            className="p-2 text-xl text-white rounded-md bg-purple"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewQuestionForm;
