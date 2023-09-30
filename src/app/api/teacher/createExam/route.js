import dbConnect from "@/DB/connect";
import { cookies } from "next/headers";
import exam from "@/DB/Models/Exam";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
  const { examName, grade, questions, from, to } = await request.json();
  try {
    await dbConnect();
    const token = cookies().get("token");
    const user = jwt.verify(token.value, process.env.JWT_SECRET);
    const teacherId = new mongoose.Types.ObjectId(user.id);
    const newExam = await exam.create({
      examName,
      grade,
      totalScore: questions.length,
      questions,
      from,
      to,
      teacherId,
    });
    return NextResponse.json({ newExam, success: true });
  } catch (error) {
    return NextResponse.json({ error, success: false });
  }
}
