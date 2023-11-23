"use client";
import { useState } from "react";
import MCQQuestionComponent from "./MCQQuestionComponent";
import SegmentQuestionComponent from "./SegmentQuestionComponent";

function NewQuestionForm({ addNewQuestion, closeModal }) {
  const [questionType, setQuestionType] = useState("vocabulary");

  const handleChange = (e) => {
    setQuestionType(e.target.value);
  };

  return (
    <div className="fixed w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,.5)]">
      <div className="p-4 bg-white rounded-md lg:w-1/2 ">
        <div>
          <select
            value={questionType}
            className="w-full mb-2 text-xl bg-transparent border rounded-md border-purple"
            name="type"
            onChange={handleChange}
          >
            <option value="general">General</option>
            <option value="translation">Translation</option>
            <option value="segment">Segment</option>
          </select>
          {questionType !== "segment" ? (
            <MCQQuestionComponent
              questionType={questionType}
              addNewQuestion={addNewQuestion}
              closeModal={closeModal}
            />
          ) : (
            <SegmentQuestionComponent
              questionType={questionType}
              addNewQuestion={addNewQuestion}
              closeModal={closeModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default NewQuestionForm;
