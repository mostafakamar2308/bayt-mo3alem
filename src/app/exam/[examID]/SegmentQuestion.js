const SegmentQuestion = ({ wholeQuestion, currentAnswers, chooseAnswer }) => {
  console.log(currentAnswers);
  return (
    <div className="flex flex-col justify-center gap-5 p-2 grow min-h-fit lg:p-4 lg:items-stretch">
      <p className="p-1 text-4xl border border-green-600 rounded-md">
        {wholeQuestion.segment}
      </p>
      {wholeQuestion.questions.map((question, index) => (
        <>
          <p className="text-4xl">{question.questionHead}</p>
          <div className="flex flex-col gap-4 ">
            {question.answers.map((answer) => (
              <button
                onClick={(e) => {
                  chooseAnswer(e, question.questionHead, wholeQuestion.segment);
                }}
                className={`
                ${
                  currentAnswers &&
                  answer.value === currentAnswers[index]?.choosenAnswer &&
                  "bg-yellow-400"
                } 
                p-2 text-xl text-right border rounded-md border-purple hover:bg-purple hover:text-white`}
                key={answer.value}
              >
                {answer.value}
              </button>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};
export default SegmentQuestion;
