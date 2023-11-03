import Exam from "@/DB/Models/Exam";
import { grades } from "@/constants";
import Barchart from "./Barchart";
import dbConnect from "@/DB/connect";

const dateInPastArrow = (date) => new Date().getTime() - date.getTime() > 0;
async function page({ params }) {
  await dbConnect();
  const exam = await Exam.findOne({ _id: params.examID });
  const isCompleted = dateInPastArrow(exam.from);
  const data = [
    { gradeRange: "0-25%", amount: 0 },
    { gradeRange: "26-50%", amount: 0 },
    { gradeRange: "51-75%", amount: 0 },
    { gradeRange: "76-100%", amount: 0 },
  ];
  exam.stats.scores.forEach((score) => {
    const scorePercentage = (score / exam.totalScore) * 100;
    if (scorePercentage < 26) {
      data[0].amount++;
    } else if (scorePercentage < 51) {
      data[1].amount++;
    } else if (scorePercentage < 76) {
      data[2].amount++;
    } else {
      data[3].amount++;
    }
  });

  const hardestSections = {
    vocabulary: 0,
    expression: 0,
    segment: 0,
    grammer: 0,
    translation: 0,
  };

  for (let i = 0; i < exam.Questions.length; i++) {
    if (exam.Questions[i].questionType === "segment") {
      for (
        let j = 0;
        j < exam.Questions[i].questionContent.questions.length;
        j++
      ) {
        console.log(
          exam.studentIds.length -
            exam.Questions[i].questionContent.questions[j].stats.correctNo
        );
        hardestSections.segment +=
          exam.studentIds.length -
          exam.Questions[i].questionContent.questions[j].stats.correctNo;
      }
    } else {
      hardestSections[exam.Questions[i].questionType] +=
        exam.studentIds.length -
        exam.Questions[i].questionContent.stats.correctNo;
    }
  }
  const formattedHardestQuestions = Object.entries(hardestSections).map(
    (item) => ({
      section: item[0],
      amount: item[1],
    })
  );
  console.log(formattedHardestQuestions);

  return (
    <div className="p-2">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl">{exam.examName}</h2>
        <span className="p-1 text-white border rounded-3xl bg-purple border-purple">
          {isCompleted ? "Finished" : "Pending"}
        </span>
      </div>

      <h4>{grades.find((grade) => grade.value === exam.grade).name}</h4>
      <div className="flex justify-center gap-4 mt-2">
        <div className="p-3 text-center border rounded-lg grow">
          <h3 className="text-3xl">Average Score</h3>
          <h2 className="text-2xl text-center">{exam.stats.averageScore}</h2>
        </div>
        <div className="p-3 text-center border rounded-lg grow">
          <h3 className="text-3xl">Average Time</h3>
          <h2 className="text-2xl text-center">0:00</h2>
        </div>
        <div className="p-3 text-center border rounded-lg grow">
          <h3 className="text-3xl">Number of Students</h3>
          <h2 className="text-2xl text-center">{exam.studentIds.length}</h2>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-2">
        <div className="p-3 text-center border rounded-lg grow">
          <h3 className="text-3xl">Highest Score</h3>
          <h2 className="text-2xl text-center">
            {exam.stats.highestScore[0].score}
          </h2>
        </div>
        <div className="p-3 text-center border rounded-lg grow">
          <h3 className="text-3xl">Lowest Score</h3>
          <h2 className="text-2xl text-center">
            {exam.stats.lowestScore[0].score}
          </h2>
        </div>
      </div>
      <div className="p-4 mt-2 border rounded-md">
        <h3 className="text-xl">Grades Distribution</h3>
        <Barchart data={data} dataKey={"gradeRange"} />
      </div>
      <div className="mt-3">
        <h3 className="text-2xl">Question Analysis</h3>
        <div>
          <h3>Sections of the Exam Analysis</h3>
          <div>
            <Barchart data={formattedHardestQuestions} dataKey={"section"} />
          </div>
        </div>
        <div className="p-4">
          {exam.Questions.map((question, index) => {
            if (question.questionType !== "segment") {
              return (
                <div
                  key={question._id}
                  className="p-4 mt-6 border rounded-md border-accent"
                >
                  <div className="flex justify-between">
                    <h3 className="">
                      {question.questionContent.questionHead}
                    </h3>
                    <div
                      data-tooltip-id="correctNo"
                      data-tooltip-content={`${question.questionContent.stats.correctNo} of ${exam.studentIds.length} answered it correctly `}
                      className="p-2 text-3xl border rounded-md"
                    >
                      {question.questionContent.stats.correctNo} /
                      {exam.studentIds.length}{" "}
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
                          data-tooltip-content={`${answer.stats.choosen} of ${exam.studentIds.length} choose this `}
                        >
                          {(answer.stats.choosen / exam.studentIds.length) *
                            100}
                          %
                        </p>
                      </h5>
                    ))}
                  </div>
                  {question.explaination && (
                    <div>التفسير: {question.explaination}</div>
                  )}
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className="px-4 py-2 mt-4 mb-2 text-xl border-2 border-gray-400 rounded-md "
                >
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
                            data-tooltip-content={`${question.stats.correctNo} of ${exam.studentIds.length} answered it correctly `}
                            className="p-2 text-3xl border rounded-md"
                          >
                            {question.stats.correctNo} /{exam.studentIds.length}{" "}
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
                              data-tooltip-content={`${answer.stats.choosen} of ${exam.studentIds.length} choose this `}
                            >
                              {(answer.stats.choosen / exam.studentIds.length) *
                                100}
                              %
                            </p>
                          </h5>
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default page;
// const hardestQuestions = { score: exam.totalScore, items: [] };
// for (let i = 0; i < exam.Questions.length; i++) {
//   if (exam.Questions[i].questionType === "segment") {
//     for (let j = 0; j < exam.Questions[i].questionContent.questions; j++) {
//       if (
//         exam.Questions[i].questionContent.questions[j].stats.correctNo <
//         hardestQuestions.score
//       ) {
//         hardestQuestions.score =
//           exam.Questions[i].questionContent.questions[j].stats.correctNo;
//         hardestQuestions.items = [
//           exam.Questions[i].questionContent.questions[j],
//         ];
//       } else if (
//         exam.Questions[i].questionContent.questions[j].stats.correctNo <
//         hardestQuestions.score
//       ) {
//         hardestQuestions.items.push(
//           exam.Questions[i].questionContent.questions[j]
//         );
//       }
//     }
//   } else {
//     if (
//       exam.Questions[i].questionContent.stats.correctNo <
//       hardestQuestions.score
//     ) {
//       hardestQuestions.score =
//         exam.Questions[i].questionContent.stats.correctNo;
//       hardestQuestions.items = [exam.Questions[i]];
//     } else if (
//       exam.Questions[i].questionContent.stats.correctNo <
//       hardestQuestions.score
//     ) {
//       hardestQuestions.items.push(exam.Questions[i]);
//     }
//   }
// }
