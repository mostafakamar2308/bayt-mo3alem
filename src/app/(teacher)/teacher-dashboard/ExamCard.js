import Exam from "@/DB/Models/Exam";
import { archivo_black } from "@/app/fonts";
import { grades } from "@/constants";
import dateRange from "@/utils/dateInPast";
import Link from "next/link";

async function ExamCard({ examId }) {
  const examData = await Exam.findOne({ _id: examId });
  if (examData) {
    const range = dateRange(examData.from);
    return (
      <Link
        href={"/teacher-dashboard/exam/" + examId}
        className="flex items-center justify-between w-1/2 p-4 mt-3 border rounded-lg shadow-md border-accent shadow-accent"
      >
        <div className="">
          <div className="flex items-center gap-2">
            <h1 className={`${archivo_black.className}  text-xl `}>
              {examData.examName}
            </h1>
            <span className="p-1 px-2 text-white border rounded-3xl bg-lightBlue border-purple">
              {range === "past"
                ? "Finished"
                : range === "present"
                ? "Pending"
                : "Not Started"}
            </span>
          </div>
          <p className="mt-2 text-sm">
            {grades.filter((grade) => grade.value === examData.grade)[0].name}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p>Number of Questions: {examData.totalScore}</p>
          <p className="mt-2">
            Date:{" "}
            {examData.from.toLocaleDateString("en", {
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
