import getStudentIdFromToken from "@/utils/getStudentFromToken";
import Student from "@/DB/Models/Student";
import ExamCard from "./PrevExamCard";

async function page() {
  const { id } = getStudentIdFromToken();
  const [student] = await Student.find({ _id: id });
  return (
    <div className="">
      <h2 className="p-4 text-3xl border-b w-fit border-purple">
        أهلا بك يا <span className="font-bold text-purple">{student.name}</span>
      </h2>
      <div className="p-2">
        <p className="text-xl">
          لقد امتحنت حتي الان: {student.examsSubmitted.length} امتحان
        </p>
        <div className="flex flex-col items-center">
          {student.examsSubmitted.map((exam) => (
            <ExamCard key={exam.examId} exam={exam} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
