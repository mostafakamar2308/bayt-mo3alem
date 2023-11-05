function SegmentComponent({ question, students }) {
  return (
    <div className="px-4 py-2 mt-4 mb-2 text-xl border-2 border-gray-400 rounded-md ">
      <p className="p-2 border rounded-md">
        {question.questionContent.segment}
      </p>
      {question.questionContent.questions.map((question, index) => {
        return (
          <div key={index} className="mt-4">
            <div className="flex justify-between">
              <h3 className="">{question.questionHead}</h3>
              <div
                data-tooltip-id="correctNo"
                data-tooltip-content={`${question.stats.correctNo} of ${students} answered it correctly `}
                className="p-2 text-3xl border rounded-md"
              >
                {question.stats.correctNo} /{students}{" "}
              </div>
            </div>
            {question.answers.map((answer, index) => (
              <h5
                key={answer.value}
                className={`p-2 flex justify-between items-center  border mt-3 border-purple rounded-xl ${
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
        );
      })}
    </div>
  );
}

export default SegmentComponent;
