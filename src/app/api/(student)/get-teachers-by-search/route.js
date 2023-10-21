import { NextResponse } from "next/server";
import Teacher from "@/DB/Models/Teacher";
import Student from "@/DB/Models/Student";
import getStudentIdFromToken from "@/utils/getStudentFromToken";

export async function GET(request) {
  const params = request.nextUrl.searchParams;
  // used REGEX to do partial search for name, may be use Elastic search next time
  const teachers = await Teacher.find({
    subject: params.get("subject"),
    name: new RegExp(params.get("name"), "i"),
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
  return NextResponse.json({ success: true, teachers: teachersArr });
}
