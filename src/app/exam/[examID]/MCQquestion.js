"use client";

function MCQquestion({ question, chooseAnswer, currentAnswer }) {
  return (
    <div className="flex flex-col justify-center gap-5 p-2 grow lg:p-4 lg:items-stretch">
      <p className="text-4xl">{question.questionHead}</p>
      <div className="flex flex-col gap-4 ">
        {question.answers.map((answer, index) => (
          <button
            onClick={(e) => {
              chooseAnswer(e);
            }}
            className={`p-2 text-xl text-left  border rounded-md border-purple hover:bg-purple hover:text-white  
                ${
                  currentAnswer === answer.value
                    ? "bg-yellow-400 hover:bg-yellow-400 hover:text-text"
                    : ""
                }`}
            key={index}
          >
            {answer.value}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MCQquestion;
