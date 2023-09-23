function QuestionInView({ question, changeQuestionAnswer }) {
  const handleChange = (e) => {
    const ID = e.target.id.split("_").join(" ");
    const newQuestion = {
      ...question,
      answers: question.answers.map((answer) =>
        answer.value == ID
          ? { ...answer, correct: true }
          : { ...answer, correct: false }
      ),
    };
    changeQuestionAnswer(newQuestion);
  };
  return (
    <div className="w-1/2 px-4 py-2 mb-2 text-xl border-2 border-gray-400 rounded-md">
      <h2 className="mb-2 text-2xl font-semibold">{question.questionHead}</h2>
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
            onChange={handleChange}
            name={question.questionHead}
            defaultChecked={answer.correct}
          />
        </div>
      ))}
    </div>
  );
}

export default QuestionInView;
