import Exam from "@/DB/Models/Exam";
import { grades } from "@/constants";
import Link from "next/link";
async function ExamCard({ examId }) {
  const examData = await Exam.findOne({ _id: examId });
  if (examData) {
    return (
      <Link
        href={"/teacher-dashboard/exam/" + examId}
        className="flex items-center justify-between w-1/2 p-4 mt-3 border rounded-lg shadow-md border-accent shadow-accent"
      >
        <div className="">
          <h2 className="text-xl">{examData.examName}</h2>
          <p className="mt-2 text-sm">
            {grades.filter((grade) => grade.value === examData.grade)[0].name}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p>عدد الاسئلة: {examData.totalScore}</p>
          <p className="mt-2">
            يوم:{" "}
            {examData.from.toLocaleDateString("ar-EG-u-nu-latn", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </Link>
    );
  } else {
    return <></>;
  }
}

export default ExamCard;
