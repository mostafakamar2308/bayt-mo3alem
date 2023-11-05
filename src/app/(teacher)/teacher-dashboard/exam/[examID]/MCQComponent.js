import React from "react";

function MCQComponent({ question, students }) {
  return (
    <div className="p-4 mt-6 border rounded-md border-accent">
      <div className="flex justify-between">
        <h3 className="">{question.questionContent.questionHead}</h3>
        <div
          data-tooltip-id="correctNo"
          data-tooltip-content={`${question.questionContent.stats.correctNo} of ${students} answered it correctly `}
          className="p-2 text-3xl border rounded-md"
        >
          {question.questionContent.stats.correctNo} /{students}{" "}
        </div>
      </div>
      <div className="p-2 mb-2">
        {question.questionContent.answers.map((answer, index) => (
          <h5
            key={answer.value}
            className={`p-2 flex justify-between items-center border mt-3 border-purple rounded-xl ${
              answer.correct ? " bg-green-600 text-white" : ""
            }
               
              `}
          >
            <p className="">{answer.value}</p>
            <p
              className="p-2 border rounded-md"
              data-tooltip-id="correctNo"
              data-tooltip-content={`${answer.stats.choosen} of ${students} choose this `}
            >
              {(answer.stats.choosen / students) * 100}%
            </p>
          </h5>
        ))}
      </div>
      {question.explaination && <div>التفسير: {question.explaination}</div>}
    </div>
  );
}

export default MCQComponent;
