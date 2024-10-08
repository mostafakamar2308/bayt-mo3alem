import getStudentIdFromToken from "@/utils/getStudentFromToken";
import Student from "@/DB/Models/Student";
import ExamCard from "./PrevExamCard";
import { subjects } from "@/constants";
import { Suspense } from "react";
import LoadingSpinner from "@/Components/LoadingSpinner";

async function page() {
  const { id } = getStudentIdFromToken();
  const student = await Student.findOne({ _id: id });

  return (
    <div className="">
      <h2 className="p-4 text-3xl border-b w-fit border-purple">
        Hi <span className="font-bold text-purple">{student.name}</span>!
      </h2>
      <div className="p-2">
        <p className="text-xl">
          You have attempted {student.examsSubmitted.length} exams
        </p>
        <div>
          {student.examsSubmitted.map((subject) => {
            return (
              <div key={subject._id} className="flex flex-col items-center">
                <p className="self-start m-4 mb-0 text-2xl font-bold">
                  امتحانات مادة:{" "}
                  <span className="text-blue-500">
                    {
                      subjects.find(
                        (constSubject) =>
                          constSubject.value === subject.subjectName
                      ).name
                    }
                  </span>
                </p>
                <Suspense fallback={<LoadingSpinner />}>
                  {subject.exams.map((exam) => (
                    <ExamCard key={exam.examId} exam={exam.exam} />
                  ))}
                </Suspense>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default page;
