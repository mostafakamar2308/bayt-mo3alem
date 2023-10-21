import TeachersPart from "./TeachersPart";
import Teacher from "@/DB/Models/Teacher";
import Student from "@/DB/Models/Student";
import getStudentIdFromToken from "@/utils/getStudentFromToken";
async function page() {
  const teachers = await Teacher.find({
    subject: "arabic",
    name: new RegExp("", "i"),
  });
  const { id } = getStudentIdFromToken();
  console.log(id);
  const student = await Student.findOne({ _id: id });
  console.log(student);
  const teachersArr = teachers.map((teacher) => ({
    name: teacher.name,
    phoneNumber: teacher.phoneNumber,
    subject: teacher.subject,
    gender: teacher.gender,
    id: teacher._id.toString(),
    examIds: teacher.examsCreated
      .find((group) => group.grade === student.grade)
      .exams.map((exam) => exam.id.toString()),
  }));
  return (
    <div className="p-2">
      <TeachersPart teachers={teachersArr} />
    </div>
  );
}

export default page;
