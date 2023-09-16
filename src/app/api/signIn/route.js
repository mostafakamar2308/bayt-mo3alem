import Teacher from "@/DB/Models/Teacher";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "Please enter your email and Password",
      });
    }
    const teacher = await Teacher.findOne({ email: email });
    if (!teacher) {
      return NextResponse.json({ success: false, message: "No teacher found" });
    }
    const isMatch = await teacher.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json({
        success: false,
        message: "Wrong Password, please try again",
      });
    } else {
      const token = jwt.sign(
        { email: teacher.email, id: teacher._id },
        process.env.JWT_SECRET
      );
      const cookieStore = cookies();
      cookieStore.set("token", token);
      return NextResponse.json({ success: true }, { status: "201" });
    }
  } catch (e) {
    console.error(e);
  }
}
