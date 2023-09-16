"use client";
import { useState } from "react";
const initialState = {
  type: "MCQ",
  questionHead: "",
  answers: [{ correct: true, value: "" }],
};

function NewQuestionForm() {
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
    <dialog
      id="my_modal_1"
      className=" rounded-lg w-1/2 backdrop:bg-[rgba(0,0,0,.5)]"
    >
      <div className="flex flex-col w-full gap-5 p-4 overflow-hidden text-xl bg-white rounded-lg text-text ">
        <div className="">
          <input
            placeholder="رأس السؤال"
            onChange={changeQuestionHead}
            className="w-3/4 p-3 mb-4 bg-transparent border-b-2"
          />
          {questionDetails.answers.map((answer, index) => (
            <div className="flex items-end gap-4 mb-2" key={index}>
              <input
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
          <button className="p-2 text-xl rounded-md bg-orange">حفظ</button>
          <form method="dialog">
            <button className="p-2 text-xl text-white rounded-md bg-purple">
              إلغاء
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default NewQuestionForm;
