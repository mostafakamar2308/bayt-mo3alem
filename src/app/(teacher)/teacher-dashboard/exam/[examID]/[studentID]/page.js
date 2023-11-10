import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Exam from "@/DB/Models/Exam";
import Student from "@/DB/Models/Student";
import { redirect } from "next/navigation";
async function page({ params }) {
  console.log(params);

  const exam = await Exam.findById(params.examID);
  const student = await Student.findById(params.studentID);
  const studentExam = student.examsSubmitted[0].exams.find(
    (submittedExam) => submittedExam.exam.examId == exam._id.toString()
  );

  return (
    <div className="p-4" dir="ltr">
      <h3 className="flex items-center gap-1 mb-4 text-3xl">
        Exam of: {student.name.split(" ")[0]}!
      </h3>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="text-xl ">
            Student&apos; results in{" "}
            <span className="font-semibold text-purple">{exam.examName}</span>
          </div>
          <p>
            Attempted on: {new Date(studentExam.date).toLocaleDateString("en")}
          </p>
        </div>
        <div
          data-progress={studentExam.exam.stats.rawScore}
          id="circle-grade"
          data-total-score={exam.totalScore}
          style={{
            "--progress": `${
              (studentExam.exam.stats.rawScore / exam.totalScore) * 360
            }deg`,
          }}
        >
          {" "}
          {studentExam.exam.stats.rawScore} / {exam.totalScore}
        </div>
      </div>

      <h4 className="text-xl"> Answers:</h4>
      <div className="lg:p-4">
        {exam.Questions.map((question, index) => {
          if (question.questionType !== "segment") {
            const studentChoosenAnswer = studentExam.exam.examAnswers.find(
              (answer) =>
                answer.questionHead === question.questionContent.questionHead
            ).choosenAnswer;
            return (
              <div
                key={question._id}
                className="p-4 mt-6 border rounded-md border-accent"
              >
                <h3 className="">{question.questionContent.questionHead}</h3>
                <div className="p-2 mb-2">
                  {question.questionContent.answers.map((answer, index) => (
                    <h5
                      key={answer.value}
                      className={`p-2 border mt-3 border-purple rounded-xl ${
                        answer.correct ? " bg-green-600 text-white" : ""
                      }
                       ${
                         studentChoosenAnswer == answer.value && !answer.correct
                           ? "!bg-red-500 text-white"
                           : ""
                       }
                      `}
                    >
                      {answer.value}
                    </h5>
                  ))}
                </div>
                {question.explaination && (
                  <div>التفسير: {question.explaination}</div>
                )}
              </div>
            );
          } else {
            const studentSegmentQuestion = studentExam.exam.examAnswers.find(
              (answer) => answer.segment === question.questionContent.segment
            );
            return (
              <div
                key={index}
                className="px-4 py-2 mt-4 mb-2 text-xl border-2 border-gray-400 rounded-md "
              >
                <p className="p-2 border rounded-md">
                  {question.questionContent.segment}
                </p>
                {question.questionContent.questions.map((question, index) => {
                  const studentChoosenAnswer =
                    studentSegmentQuestion.answers.find(
                      (answer) => answer.questionHead === question.questionHead
                    ).choosenAnswer;
                  return (
                    <div key={index} className="mt-4">
                      <h2 className="mb-1 text-2xl font-semibold">
                        {question.questionHead}
                      </h2>
                      {question.answers.map((answer, index) => (
                        <h5
                          key={answer.value}
                          className={`p-2 border mt-3 border-purple rounded-xl ${
                            answer.correct ? " bg-green-600 text-white" : ""
                          }
                          ${
                            studentChoosenAnswer == answer.value &&
                            !answer.correct
                              ? "!bg-red-500 text-white"
                              : ""
                          }
                      `}
                        >
                          {answer.value}
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
  );
}

export default page;
