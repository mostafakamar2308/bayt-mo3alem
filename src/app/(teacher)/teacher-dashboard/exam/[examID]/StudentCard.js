import Student from "@/DB/Models/Student";
import dbConnect from "@/DB/connect";
import Link from "next/link";

async function StudentCard({ id, examID, totalScore }) {
  const student = await Student.findOne({ _id: id });
  const examStats = student.examsSubmitted[0].exams.find(
    (exam) => exam.exam.examId.toString() === examID
  );
  return (
    <div className="flex items-center justify-between p-2 mt-2 border rounded-md shadow-sm shadow-purple border-purple">
      <h1 className="text-xl font-semibold lg:text-2xl lg:fontbold">
        {student.name}
      </h1>
      <div className="flex flex-col items-end">
        <p className="text-xl">
          score: {examStats.exam.stats.rawScore} / {totalScore}
        </p>
        <Link
          className="p-2 duration-300 border rounded-md shadow-sm hover:bg-purple hover:text-white border-purple shadow-purple"
          href={
            "/teacher-dashboard/exam/" +
            examID.toString() +
            "/" +
            student._id.toString()
          }
        >
          See Student&apos;s answers
        </Link>
      </div>
    </div>
  );
}

export default StudentCard;
