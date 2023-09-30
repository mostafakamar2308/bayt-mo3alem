import Student from "@/DB/Models/Student";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(request) {
  try {
    const { name, email, password, parentPhoneNumber, grade } =
      await request.json();
    const newStudent = await Student.create({
      name,
      email: email.toLowerCase(),
      password,
      parentPhoneNumber,
      grade,
    });
    const token = jwt.sign(
      { email: newStudent.email, id: newStudent._id },
      process.env.JWT_SECRET
    );
    const cookieStore = cookies();
    cookieStore.set("token", token);
    return NextResponse.json({ success: true, token });
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: error,
    });
  }
}
