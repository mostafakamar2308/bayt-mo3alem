import { useState } from "react";

function MCQQuestionInView({ question, changeQuestion }) {
  const [explainationEditable, setExplainationEditable] = useState(false);
  const [questionHeadEditable, setQuestionHeadEditable] = useState(false);
  const [answerEditable, setAnswerEditable] = useState({
    state: false,
    index: 0,
  });
  const handleChangeAnswer = (e) => {
    const ID = e.target.id.split("_").join(" ");
    const newQuestion = {
      ...question,
      questionContent: {
        ...question.questionContent,
        answers: question.questionContent.answers.map((answer) =>
          answer.value == ID
            ? { ...answer, correct: true }
            : { ...answer, correct: false }
        ),
      },
    };
    changeQuestion(newQuestion);
  };
  const handleChangeExplaination = (newExplaination) => {
    const newQuestion = {
      ...question,
      questionContent: {
        ...question.questionContent,
        explaination: newExplaination,
      },
    };
    changeQuestion(newQuestion);
  };
  const handleChangeAnswerValue = (e) => {
    const ID = e.target.id.split("_").join(" ");
    const newQuestion = {
      ...question,
      questionContent: {
        ...question.questionContent,
        answers: question.questionContent.answers.map((answer) =>
          answer.value == ID ? { ...answer, value: e.target.value } : answer
        ),
      },
    };
    changeQuestion(newQuestion);
  };

  const handleChangeQuestionHead = (newQuestionHead) => {
    const newQuestion = {
      ...question,
      questionContent: {
        ...question.questionContent,
        questionHead: newQuestionHead,
      },
    };
    changeQuestion(newQuestion);
  };
  return (
    <div className="w-full px-4 py-2 mb-2 text-xl border-2 border-gray-400 rounded-md lg:w-1/2">
      {questionHeadEditable ? (
        <input
          placeholder={"You Can Type your question Head here"}
          autoFocus
          defaultValue={question.questionContent.questionHead}
          className="w-full p-1 bg-transparent border-purple"
          onBlur={(e) => {
            handleChangeQuestionHead(e.target.value);
            setQuestionHeadEditable(false);
          }}
        />
      ) : (
        <div className="flex justify-between gap-2">
          <h2 className="mb-2 text-2xl font-semibold">
            {question.questionContent.questionHead}
          </h2>
          <button
            className="px-2 py-1 border"
            onClick={() => setQuestionHeadEditable(true)}
          >
            Edit
          </button>
        </div>
      )}
      {question.questionContent.answers.map((answer, index) => (
        <div
          key={answer.value}
          className={`flex rounded-md justify-between p-2 ${
            answer.correct ? "bg-green-500" : ""
          }`}
        >
          {answerEditable.state && answerEditable.index === index ? (
            <input
              placeholder={"Type your Answer"}
              autoFocus
              id={answer.value.split(" ").join("_")}
              defaultValue={answer.value}
              className="w-full p-1 bg-transparent border-purple"
              onBlur={(e) => {
                handleChangeAnswerValue(e);
                setAnswerEditable({ state: false, index: index });
              }}
            />
          ) : (
            <div className="flex justify-between grow">
              <h3 className="grow">{answer.value}</h3>
              <div className="flex gap-2">
                <input
                  id={answer.value.split(" ").join("_")}
                  className=""
                  type="radio"
                  onChange={handleChangeAnswer}
                  name={question.questionContent.questionHead
                    .split(" ")
                    .join("_")}
                  defaultChecked={answer.correct}
                />
                <button
                  className="px-2 py-1 border"
                  data-index={index}
                  onClick={(e) =>
                    setAnswerEditable(() => ({
                      state: true,
                      index,
                    }))
                  }
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="p-2 mt-2 border rounded-md ">
        Answer Explaination:
        <br></br>
        {explainationEditable ? (
          <input
            placeholder={"You Can Type your explaination here"}
            autoFocus
            defaultValue={question.questionContent.explaination}
            className="w-full p-1 bg-transparent border-purple"
            onBlur={(e) => {
              handleChangeExplaination(e.target.value);
              setExplainationEditable(false);
            }}
          />
        ) : (
          <div className="flex justify-between">
            <p>{question.questionContent.explaination}</p>
            <button
              className="px-2 py-1 border rounded-md"
              onClick={() => setExplainationEditable(true)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MCQQuestionInView;
