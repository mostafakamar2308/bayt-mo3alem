function MCQQuestionInView({ question, changeQuestionAnswer }) {
  const handleChange = (e) => {
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
    changeQuestionAnswer(newQuestion);
  };
  return (
    <div className="w-full px-4 py-2 mb-2 text-xl border-2 border-gray-400 rounded-md lg:w-1/2">
      <h2 className="mb-2 text-2xl font-semibold">
        {question.questionContent.questionHead}
      </h2>
      {question.questionContent.answers.map((answer, index) => (
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
            onChange={handleChange}
            name={question.questionContent.questionHead.split(" ").join("_")}
            defaultChecked={answer.correct}
          />
        </div>
      ))}
      <div className="p-2 mt-2 border rounded-md ">
        تفسير الاجابة:
        <br></br>
        {question.questionContent.explaination}
      </div>
    </div>
  );
}

export default MCQQuestionInView;
