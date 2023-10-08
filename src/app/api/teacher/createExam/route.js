import dbConnect from "@/DB/connect";
import { cookies } from "next/headers";
import exam from "@/DB/Models/Exam";
import Teacher from "@/DB/Models/Teacher";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
  const { examName, grade, questions, from } = await request.json();
  try {
    await dbConnect();
    const token = cookies().get("token");
    const user = jwt.verify(token.value, process.env.JWT_SECRET);
    const teacherId = new mongoose.Types.ObjectId(user.id);
    const newExam = await exam.create({
      examName,
      grade,
      totalScore: questions.length,
      Questions: questions,
      from,
      teacherId,
    });
    let teacher = await Teacher.findOne({ _id: teacherId });
    teacher.examIds.push(newExam._id);
    teacher = await teacher.save();
    return NextResponse.json({ newExam, success: true });
  } catch (error) {
    return NextResponse.json({ error, success: false });
  }
}
