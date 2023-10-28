"use client";

import { useState } from "react";

function SegmentQuestionComponent({
  addNewQuestion,
  questionType,
  closeModal,
}) {
  const [segmentDetails, setSegmentDetails] = useState({
    segment: "",
    questions: [
      {
        questionHead: "",
        answers: [
          { correct: true, value: "" },
          { correct: false, value: "" },
          { correct: false, value: "" },
          { correct: false, value: "" },
        ],
      },
    ],
  });
  const handleChangeSement = (e) => {
    setSegmentDetails((prev) => ({ ...prev, segment: e.target.value }));
  };
  const handleChangeQuestionHead = (e) => {
    const questionId = e.target.id.split("-")[1];
    const newQuestions = segmentDetails.questions.map((question, index) => {
      if (index === Number(questionId)) {
        return { ...question, questionHead: e.target.value };
      } else {
        return question;
      }
    });
    setSegmentDetails((prev) => ({ ...prev, questions: newQuestions }));
  };

  const changeAnswerValue = (e) => {
    const questionId = e.target.parentElement.parentElement.id.split("-")[1];
    const answerId = e.target.parentElement.id;
    const newQuestions = segmentDetails.questions.map((question, index) => {
      if (index === Number(questionId)) {
        return {
          ...question,
          answers: question.answers.map((answer, index) => {
            if (index == answerId) {
              return { ...answer, value: e.target.value };
            } else {
              return answer;
            }
          }),
        };
      } else {
        return question;
      }
    });
    setSegmentDetails((prev) => ({ ...prev, questions: newQuestions }));
  };

  const changeQuestionAnswer = (e) => {
    const questionId = e.target.parentElement.parentElement.id.split("-")[1];
    const answerId = e.target.parentElement.id;
    const newQuestions = segmentDetails.questions.map((question, index) => {
      if (index === Number(questionId)) {
        return {
          ...question,
          answers: question.answers.map((answer, index) => {
            if (index == answerId) {
              return { ...answer, correct: true };
            } else {
              return { ...answer, correct: false };
            }
          }),
        };
      } else {
        return question;
      }
    });
    setSegmentDetails((prev) => ({ ...prev, questions: newQuestions }));
  };

  const addQuestion = () => {
    setSegmentDetails((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          questionHead: "",
          answers: [
            { correct: true, value: "" },
            { correct: false, value: "" },
            { correct: false, value: "" },
            { correct: false, value: "" },
          ],
        },
      ],
    }));
  };
  return (
    <div dir="ltr" className="overflow-auto text-lg max-h-[70vh] p-2">
      <textarea
        name="segment"
        value={segmentDetails.segment}
        className="w-full p-3 mb-3 text-xl text-left bg-transparent border border-b-2 rounded-md h-60 "
        onChange={handleChangeSement}
      />
      <div>
        {segmentDetails.questions.map((question, questionIndex) => (
          <div
            key={questionIndex}
            className="mb-2 border-b"
            id={"question-" + questionIndex}
          >
            <input
              id={"questionHead-" + questionIndex}
              name="questionHead"
              onChange={handleChangeQuestionHead}
              className="w-full bg-transparent border"
              placeholder="Question Head"
              defaultValue={question.questionHead}
            />
            <div id={"answersQuestion-" + questionIndex} className="w-1/2 ">
              {question.answers.map((answer, answerIndex) => (
                <div
                  key={answerIndex}
                  id={answerIndex}
                  className="flex items-center mt-2 gap-4 mb-2 [&>*]:bg-transparent [&>*]:border"
                >
                  <input
                    onChange={changeAnswerValue}
                    className="p-1 rounded-md"
                    placeholder="Answer"
                    defaultValue={answer.value}
                  />
                  <input
                    type="radio"
                    className="w-6 h-6 "
                    onChange={changeQuestionAnswer}
                    defaultChecked={answer.correct}
                    name={"answerforQuestion-" + questionIndex}
                  ></input>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={addQuestion}>Add Question</button>
      <div className="flex self-end gap-4">
        <button
          className="p-2 text-xl rounded-md bg-orange"
          onClick={(e) => {
            e.preventDefault();
            addNewQuestion({ questionType, questionContent: segmentDetails });
            closeModal();
          }}
        >
          أضف القطعة
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

export default SegmentQuestionComponent;
