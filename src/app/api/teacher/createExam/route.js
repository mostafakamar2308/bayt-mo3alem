import dbConnect from "@/DB/connect";
import { cookies } from "next/headers";
import exam from "@/DB/Models/Exam";
import Teacher from "@/DB/Models/Teacher";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
  const { examName, grade, questions, from, stats } = await request.json();
  try {
    await dbConnect();
    const token = cookies().get("token");
    const user = jwt.verify(token.value, process.env.JWT_SECRET);
    const teacherId = new mongoose.Types.ObjectId(user.id);
    let teacher = await Teacher.findOne({ _id: teacherId });
    const newExam = await exam.create({
      examName,
      grade,
      totalScore: questions.length,
      Questions: questions,
      from,
      teacherId,
      stats,
      subject: teacher.subject,
    });
    const group = teacher.examsCreated.filter((group) => group.grade === grade);

    if (group.length > 0) {
      teacher.examsCreated
        .find((exam) => exam.grade === grade)
        .exams.push({ date: from, id: newExam._id });
      console.log("finished?");
    } else {
      teacher.examsCreated.push({
        grade: grade,
        exams: [{ date: from, id: newExam._id }],
      });
    }
    console.log(teacher);

    teacher = await teacher.save();
    cookies().set("newExamCallback", newExam._id.toString(), {
      expires: Date.now() + 24 * 60 * 60 * 1000,
    });
    return NextResponse.json({ newExam, success: true });
  } catch (error) {
    return NextResponse.json({ error, success: false });
  }
}
