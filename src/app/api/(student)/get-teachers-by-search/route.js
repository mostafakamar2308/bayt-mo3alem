import { NextResponse } from "next/server";
import Teacher from "@/DB/Models/Teacher";

export async function GET(request) {
  const params = request.nextUrl.searchParams;
  // used REGEX to do partial search for name, may be use Elastic search next time
  const teachers = await Teacher.find({
    subject: params.get("subject"),
    name: new RegExp(params.get("name"), "i"),
  });
  const teachersArr = teachers.map((teacher) => ({
    name: teacher.name,
    phoneNumber: teacher.phoneNumber,
    subject: teacher.subject,
    gender: teacher.gender,
    id: teacher._id.toString(),
  }));
  return NextResponse.json({ success: true, teachers: teachersArr });
}
