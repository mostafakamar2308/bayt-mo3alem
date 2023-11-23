"use client";
import generateMCQQuestionsFromText from "@/utils/generateMCQQuestions";
import generateSegmentQuestions from "@/utils/generateSegmentQuestions";
import { useState } from "react";
function GenerateQuestions({
  addNewQuestions,
  closeModal,
  addSegmentQuestion,
}) {
  const [questionType, setQuestionType] = useState("general");
  const [content, setContent] = useState("");
  const [segmentContent, setSegmentContent] = useState("");
  const [step, setStep] = useState("copy");
  const changeSegmentContent = (e) => {
    setSegmentContent(e.target.value);
  };
  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };
  const handleChangeQuestionType = (e) => {
    setQuestionType(e.target.value);
  };
  const generateQuestions = () => {
    if (questionType === "general") {
      const questions = generateMCQQuestionsFromText(content);
      console.log(questions);
      addNewQuestions(questions);
    } else if (questionType === "segment") {
      const questions = generateSegmentQuestions(segmentContent, content);
      console.log(questions);
      addSegmentQuestion(questions);
    }
    closeModal();
  };

  return (
    <div className="fixed w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,.5)]">
      <div className="p-4 bg-white rounded-md lg:w-1/2 ">
        <div>
          <select
            value={questionType}
            className="w-full mb-2 text-xl bg-transparent border rounded-md border-purple"
            name="type"
            onChange={handleChangeQuestionType}
          >
            <option value="general">General</option>
            <option value="translation">Translation</option>
            <option value="segment">Segment</option>
          </select>
        </div>
        {questionType === "segment" && (
          <textarea
            autoFocus
            value={segmentContent}
            placeholder="Type the comprehensive segment here"
            onChange={changeSegmentContent}
            className="w-full h-20 p-1 text-lg bg-transparent border rounded-md border-purple"
          />
        )}
        <textarea
          autoFocus
          value={content}
          onChange={handleChangeContent}
          placeholder="Type your questions here"
          className="w-full h-40 p-1 text-lg bg-transparent border rounded-md border-purple"
        />
        <button
          onClick={generateQuestions}
          className="w-full p-2 text-xl text-white border rounded-md bg-orange"
        >
          {" "}
          Generate Questions
        </button>
      </div>
    </div>
  );
}

export default GenerateQuestions;
