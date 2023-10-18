import Student from "@/DB/Models/Student";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/DB/connect";
export async function POST(request) {
  try {
    const { email, password } = await request.json();
    await dbConnect();
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "Please enter your email and Password",
      });
    }
    const student = await Student.findOne({ email: email });
    if (!student) {
      return NextResponse.json({ success: false, message: "No student found" });
    }
    const isMatch = await student.comparePassword(password);
    console.log(isMatch);
    if (!isMatch) {
      return NextResponse.json({
        success: false,
        message: "Wrong Password, please try again",
      });
    } else {
      const token = jwt.sign(
        { email: student.email, id: student._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      const cookieStore = cookies();
      cookieStore.set("student-token", token, {
        expires: Date.now() + 24 * 60 * 60 * 1000,
      });
      return NextResponse.json({ success: true }, { status: 201 });
    }
  } catch (e) {
    console.error(e);
  }
}
