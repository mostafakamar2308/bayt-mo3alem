import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
5;
import Teacher from "@/DB/Models/Teacher";
import Student from "@/DB/Models/Student";
import jwt from "jsonwebtoken";
import getStudentIdFromToken from "@/utils/getStudentFromToken";
import dbConnect from "@/DB/connect";

export async function PUT(request) {
  try {
    const { teacherPhoneNumber } = await request.json();
    if (!teacherPhoneNumber) {
      NextResponse.json({
        success: false,
        message: "send teacher phone number",
      });
    }

    const studentToken = getStudentIdFromToken();
    await dbConnect();
    const teacher = await Teacher.findOne({ phoneNumber: teacherPhoneNumber });
    const student = await Student.findOne({ email: studentToken.email });
    if (
      student.teacherIds.filter(
        (id) => id.toString() === teacher._id.toString()
      ).length === 0
    ) {
      teacher.studentIds.push(student._id);
      student.teacherIds.push(teacher._id);
      await teacher.save();
      await student.save();
    }
    console.log(teacher, student);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.error({ success: false, message: error });
  }
}
