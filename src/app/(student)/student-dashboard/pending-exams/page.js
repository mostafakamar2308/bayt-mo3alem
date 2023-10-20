import dbConnect from "@/DB/connect";
import Calendar from "./Calendar";
import getStudentIdFromToken from "@/utils/getStudentFromToken";
import Student from "@/DB/Models/Student";
import Teacher from "@/DB/Models/Teacher";
import Exam from "@/DB/Models/Exam";

async function page() {
  await dbConnect();
  const { id } = getStudentIdFromToken();
  const student = await Student.findOne({ _id: id });
  const teachers = await Teacher.find({ _id: { $in: student.teacherIds } });
  const teachersExams = teachers.map((teacher) => teacher.examIds).flat();
  const exams = await Exam.find({ _id: { $in: teachersExams } });
  const examsFormatted = exams.map((exam) => ({
    start: exam.from,
    end: exam.from,
    allDay: true,

    title: exam.examName,
    id: exam._id.toString(),
  }));
  console.log(examsFormatted);
  return (
    <div>
      <Calendar exams={JSON.parse(JSON.stringify(examsFormatted))} />
    </div>
  );
}

export default page;
