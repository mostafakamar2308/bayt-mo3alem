import Exam from "@/DB/Models/Exam";
import { grades } from "@/constants";
import BarchartComponent from "./BarchartComponent";
import dbConnect from "@/DB/connect";
import dateRange from "@/utils/dateInPast";
import getHardestSections from "@/utils/getHardestSections";
import getGradeDistribution from "@/utils/getGradeDistribution";
import SegmentComponent from "../SegmentComponent";
import MCQComponent from "./MCQComponent";
import { archivo_black } from "@/app/fonts";
import { Suspense } from "react";
import StudentCard from "./StudentCard";

async function page({ params }) {
  await dbConnect();
  const exam = await Exam.findOne({ _id: params.examID });
  const range = dateRange(exam.from);
  console.log(exam);

  const gradeDistribution = getGradeDistribution(
    exam.stats.scores,
    exam.totalScore
  );
  const formattedHardestQuestions = getHardestSections(
    exam.Questions,
    exam.studentIds.length
  );
  // TODO: sort questions by difficulty
  const sortedExamQuestions = exam.Questions.filter(
    (question) => question.questionType !== "segment"
  ).sort(
    (a, b) =>
      a.questionContent.stats.correctNo - b.questionContent.stats.correctNo
  );
  const problematicQuestions = sortedExamQuestions.filter(
    (question) =>
      question.questionContent.stats.correctNo ===
      sortedExamQuestions[0].questionContent.stats.correctNo
  );
  return (
    <div className="p-2 ">
      <div className="flex items-center gap-2">
        <h2 className={`${archivo_black.variable} text-2xl font-bold`}>
          {exam.examName}
        </h2>
        <span className="p-1 text-white border rounded-3xl bg-purple border-purple">
          {range === "past"
            ? "Finished"
            : range === "present"
            ? "Pending"
            : "Not Started"}
        </span>
      </div>

      <h4>{grades.find((grade) => grade.value === exam.grade).name}</h4>
      <div className="flex flex-col flex-wrap gap-4 mt-2 lg:flex-row lg:justify-center">
        <div className="text-center border rounded-lg lg:p-3 lg:grow">
          <h3 className="text-xl lg:text-3xl">Average Score</h3>
          <h2 className="text-2xl text-center">
            {exam.stats.averageScore.toFixed(2)}
          </h2>
        </div>
        <div className="text-center border rounded-lg lg:p-3 lg:grow">
          <h3 className="text-xl lg:text-3xl">Average Time</h3>
          <h2 className="text-2xl text-center">0:00</h2>
        </div>
        <div className="text-center border rounded-lg lg:p-3 lg:grow">
          <h3 className="text-xl lg:text-3xl">Number of Students</h3>
          <h2 className="text-2xl text-center">{exam.studentIds.length}</h2>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4 mt-2 lg:flex-row">
        <div className="p-3 text-center border rounded-lg grow">
          <h3 className="text-xl lg:text-3xl">Highest Score</h3>
          <h2 className="text-2xl text-center">
            {exam.stats.highestScore[0].score}
          </h2>
        </div>
        <div className="p-3 text-center border rounded-lg grow">
          <h3 className="text-xl lg:text-3xl">Lowest Score</h3>
          <h2 className="text-2xl text-center">
            {exam.stats.lowestScore[0].score}
          </h2>
        </div>
      </div>
      <div className="p-4 mt-2 border rounded-md">
        <h3
          className={`${archivo_black.variable} text-2xl font-semibold border-b w-fit pr-2 border-black`}
        >
          Grades Distribution
        </h3>
        <Suspense
          fallback={<div>Loading Bar chart for your student Grades</div>}
        >
          <BarchartComponent data={gradeDistribution} dataKey={"gradeRange"} />
        </Suspense>
      </div>
      <div className="mt-3">
        <div className="p-4 mt-2 border rounded-md">
          <h3
            className={`${archivo_black.variable} text-2xl font-semibold border-b w-fit pr-2 border-black`}
          >
            Section Analysis (most problematic sections)
          </h3>
          <div>
            <Suspense
              fallback={<div>Loading Bar chart for hardest questions</div>}
            >
              <BarchartComponent
                data={formattedHardestQuestions}
                dataKey={"section"}
              />
            </Suspense>
          </div>
        </div>
        <div className="p-4 mt-2 border rounded-md">
          <h3
            className={`${archivo_black.variable} mb-3 text-2xl font-semibold border-b w-fit pr-2 border-black`}
          >
            Students:
          </h3>{" "}
          <Suspense fallback={<div>Loading Students ...</div>}>
            {exam.studentIds.map((ele) => (
              <StudentCard
                id={ele}
                key={ele.toString()}
                examID={exam._id.toString()}
                totalScore={exam.totalScore}
              />
            ))}
          </Suspense>
        </div>
        <div className="p-4 mt-2 border rounded-md">
          <h3
            className={`${archivo_black.variable} mb-3 text-2xl font-semibold border-b w-fit pr-2 border-black`}
          >
            Problematic Questions:
          </h3>
          {problematicQuestions.map((question, index) => (
            <MCQComponent
              students={exam.studentIds.length}
              key={index}
              question={question}
            />
          ))}
        </div>
        <div className="p-4 mt-2 border rounded-md">
          <h3
            className={`${archivo_black.variable} text-2xl font-bold border-b w-fit pr-2 border-black`}
          >
            Question Analysis
          </h3>

          {exam.Questions.map((question, index) => {
            if (question.questionType !== "segment") {
              return (
                <MCQComponent
                  students={exam.studentIds.length}
                  key={question._id}
                  question={question}
                />
              );
            } else {
              return (
                <SegmentComponent
                  students={exam.studentIds.length}
                  key={index}
                  question={question}
                />
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
