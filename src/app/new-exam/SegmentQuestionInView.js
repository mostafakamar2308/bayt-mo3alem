function SegmentQuestionInView({ question, changeQuestionAnswer }) {
  const handleChange = (questionHead, e) => {
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
    changeQuestionAnswer({
      ...question,
      questionContent: { ...question.questionContent, questions: newQuestions },
    });
  };

  return (
    <div className="w-full px-4 py-2 mb-2 text-xl border-2 border-gray-400 rounded-md lg:w-1/2">
      <p className="p-2 border rounded-md">
        {question.questionContent.segment}
      </p>
      {question.questionContent.questions.map((question) => {
        return (
          <>
            <div key={question.explaination}>
              <h2 className="mb-2 text-2xl font-semibold">
                {question.questionHead}
              </h2>
              {question.answers.map((answer, index) => (
                <div
                  key={answer.value}
                  className={`flex rounded-md justify-between p-2 ${
                    answer.correct ? "bg-green-500" : ""
                  }`}
                >
                  <h3>{answer.value}</h3>
                  <input
                    id={answer.value.split(" ").join("_")}
                    className=""
                    type="radio"
                    onChange={(e) => handleChange(question.questionHead, e)}
                    name={question.questionHead}
                    defaultChecked={answer.correct}
                  />
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
