import Exam from "@/DB/Models/Exam";
import Teacher from "@/DB/Models/Teacher";
import { subjects } from "@/constants";
import Link from "next/link";
async function ExamCard({ exam }) {
  const examDetails = await Exam.findOne({ _id: exam.examId });
  const teacher = await Teacher.findOne({ _id: examDetails.teacherId });
  const examSubject = subjects.filter(
    (subject) => subject.value === teacher.subject
  )[0].name;
  console.log({ exam, examDetails, teacher });
  return (
    <div className="flex justify-between w-5/6 p-4 mt-4 border rounded-md border-purple">
      <div className="flex flex-col gap-2">
        <h3 className="text-3xl">{examDetails.examName}</h3>

        <h4>الاستاذ: {teacher.name}</h4>
        <h4 className="flex gap-1">مادة: {examSubject}</h4>

        <p className="text-xl">عدد الاسئلة: {examDetails.totalScore} أسئلة</p>
        <p>
          امتحنته يوم:{" "}
          {examDetails.from.toLocaleDateString("ar-EG", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div
          data-progress={exam.stats.rawScore}
          id="circle-grade"
          data-total-score={examDetails.totalScore}
          style={{
            "--progress": `${
              (exam.stats.rawScore / examDetails.totalScore) * 360
            }deg`,
          }}
        >
          {" "}
          {exam.stats.rawScore} / {exam.totalScore}
        </div>
        <Link
          href={"/student-dashboard/exam/" + exam.examId.toString()}
          className="px-4 py-2 text-xl text-center duration-300 border-2 rounded-md border-purple hover:bg-purple hover:border-white hover:text-white"
        >
          إجاباتك
        </Link>
      </div>
    </div>
  );
}

export default ExamCard;
