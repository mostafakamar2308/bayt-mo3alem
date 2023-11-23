import { useState } from "react";

function SegmentQuestionInView({ question, changeQuestion }) {
  const [questionHeadEditable, setQuestionHeadEditable] = useState({
    state: false,
    questionIndex: 0,
  });
  const [answerEditable, setAnswerEditable] = useState({
    state: false,
    answerIndex: 0,
    questionIndex: 0,
  });
  const handleChangeAnswer = (questionHead, e) => {
    const ID = e.target.id.split("_").join(" ");

    const newQuestions = question.questionContent.questions.map((question) => {
      if (questionHead === question.questionHead) {
        return {
          ...question,
          answers: question.answers.map((answer) =>
            answer.value == ID
              ? { ...answer, correct: true }
              : { ...answer, correct: false }
          ),
        };
      } else {
        return question;
      }
    });
    changeQuestion({
      ...question,
      questionContent: { ...question.questionContent, questions: newQuestions },
    });
  };

  const handleChangeAnswerValue = (e) => {
    const newQuestion = {
      ...question,
      questionContent: {
        ...question.questionContent,
        questions: question.questionContent.questions.map(
          (currQuestion, currQuestionIndex) => {
            if (currQuestionIndex === answerEditable.questionIndex) {
              return {
                ...currQuestion,
                answers: currQuestion.answers.map((answer, answerIndex) =>
                  answerEditable.answerIndex == answerIndex
                    ? { ...answer, value: e.target.value }
                    : answer
                ),
              };
            } else {
              return currQuestion;
            }
          }
        ),
      },
    };
    changeQuestion(newQuestion);
  };

  const handleChangeQuestionHead = (newQuestionHead) => {
    const newQuestions = {
      ...question,
      questionContent: {
        ...question.questionContent,
        questions: question.questionContent.questions.map(
          (currQuestion, currQuestionIndex) => {
            if (currQuestionIndex === questionHeadEditable.questionIndex) {
              return {
                ...currQuestion,
                questionHead: newQuestionHead,
              };
            } else {
              return currQuestion;
            }
          }
        ),
      },
    };
    console.log(newQuestions);
    changeQuestion(newQuestions);
  };

  return (
    <div className="w-full px-4 py-2 mb-2 text-xl border-2 border-gray-400 rounded-md lg:w-1/2">
      <p className="p-2 border rounded-md">
        {question.questionContent.segment}
      </p>
      {question.questionContent.questions.map((question, questionIndex) => {
        return (
          <>
            <div key={question.explaination}>
              {questionHeadEditable.state &&
              questionHeadEditable.questionIndex === questionIndex ? (
                <input
                  placeholder={"You Can Type your question Head here"}
                  autoFocus
                  defaultValue={question.questionHead}
                  className="w-full p-1 bg-transparent border-purple"
                  onBlur={(e) => {
                    handleChangeQuestionHead(e.target.value);
                    setQuestionHeadEditable(false);
                  }}
                />
              ) : (
                <div className="flex justify-between gap-2">
                  <h2 className="mb-2 text-2xl font-semibold">
                    {question.questionHead}
                  </h2>
                  <button
                    className="px-2 py-1 border"
                    onClick={() =>
                      setQuestionHeadEditable({ questionIndex, state: true })
                    }
                  >
                    Edit
                  </button>
                </div>
              )}
              {question.answers.map((answer, currAnswerIndex) => (
                <div
                  key={answer.value}
                  className={`flex rounded-md justify-between p-2 ${
                    answer.correct ? "bg-green-500" : ""
                  }`}
                >
                  {answerEditable.state &&
                  answerEditable.answerIndex === currAnswerIndex &&
                  answerEditable.questionIndex == questionIndex ? (
                    <input
                      placeholder={"Type your Answer"}
                      autoFocus
                      id={answer.value.split(" ").join("_")}
                      defaultValue={answer.value}
                      className="w-full p-1 bg-transparent border-purple"
                      onBlur={(e) => {
                        handleChangeAnswerValue(e);
                        setAnswerEditable({
                          state: false,
                          answerIndex: currAnswerIndex,
                          questionIndex: questionIndex,
                        });
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
                          onChange={(e) =>
                            handleChangeAnswer(question.questionHead, e)
                          }
                          name={question.questionHead.split(" ").join("_")}
                          defaultChecked={answer.correct}
                        />
                        <button
                          className="px-2 py-1 border"
                          onClick={(e) =>
                            setAnswerEditable(() => ({
                              state: true,
                              questionIndex,
                              answerIndex: currAnswerIndex,
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
            </div>
            <hr></hr>
          </>
        );
      })}
    </div>
  );
}

export default SegmentQuestionInView;
