import Exam from "@/DB/Models/Exam";
import { archivo_black } from "@/app/fonts";
import { grades } from "@/constants";
import dateRange from "@/utils/dateInPast";
import Link from "next/link";
import ExamSharerButton from "./ExamSharerButton";

async function ExamCard({ examId }) {
  const examData = await Exam.findOne({ _id: examId });
  if (examData) {
    const range = dateRange(examData.from);
    return (
      <div className="flex flex-wrap items-center justify-between w-full p-4 mt-3 border rounded-lg shadow-md lg:w-2/3 border-accent shadow-accent">
        <div className="w-full lg:w-fit">
          <div className="flex items-center justify-between gap-2">
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
        <div className="flex flex-col justify-center lg:items-center">
          <p>Students No.: {examData.studentIds.length}</p>
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
        <div className="flex justify-between w-full lg:flex-col lg:w-fit">
          <ExamSharerButton examID={examData._id.toString()} />
          <Link
            href={"/teacher-dashboard/exam/" + examId}
            className="p-2 mt-2 text-center duration-300 border rounded-md border-purple hover:bg-purple hover:text-white"
          >
            See Results
          </Link>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default ExamCard;
