import Exam from "@/DB/Models/Exam";
import Teacher from "@/DB/Models/Teacher";
import Student from "@/DB/Models/Student";
import dateRange from "@/utils/dateInPast";
import MultiExamForm from "./MultiExamForm";
import jwt from "jsonwebtoken";
import dbConnect from "@/DB/connect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import formatExam from "@/utils/formatExam";
import mongoose from "mongoose";
import Link from "next/link";

async function page({ params }) {
  const { examID } = params;
  await dbConnect();
  const { value } = cookies().get("student-token");
  const { id: studentId } = jwt.verify(value, process.env.JWT_SECRET);
  const exam = await Exam.findById(examID);
  if (!exam) {
    redirect("/student-dashboard");
  }
  if (
    exam.studentIds.map((student) => student.toString()).includes(studentId)
  ) {
    redirect("/student-dashboard/exam/" + exam._id.toString());
  }
  const teacher = await Teacher.findById(exam.teacherId);
  const student = await Student.findOne({ _id: studentId });
  const isSubscribed = student.teacherIds.find(
    (teacher) => teacher.toString() === teacher._id.toString()
  );
  if (!isSubscribed) {
    student.teacherIds.push(teacher._id);
    if (teacher.studentIds.length > 0) {
      const studentGrade = teacher.studentIds.find(
        (grade) => grade.grade === student.grade
      );
      if (studentGrade) {
        studentGrade.students.push(student._id);
      } else {
        teacher.studentIds.push({
          grade: student.grade,
          students: [student._id],
        });
      }
    } else {
      teacher.studentIds = [{ grade: student.grade, students: [student._id] }];
    }
    await student.save();
    await teacher.save();
    console.log(teacher);
  }
  // if (!isSubscribed) {
  //   teacher.studentIds.push({
  //     grade: exam.grade,
  //     students: [new mongoose.Types.ObjectId(studentId)],
  //   });
  //   await teacher.save();
  // } else {
  //   const isStudent = isSubscribed.students.find(
  //     (student) => student.toString() === studentId
  //   );
  //   if (!isStudent) {
  //     isSubscribed.students.push(new mongoose.Types.ObjectId(studentId));
  //     student.teacherIds.push(teacher._id);
  //     await student.save();
  //     await teacher.save();
  //   }
  // }
  const serializedExam = JSON.parse(JSON.stringify(exam));
  const serializedTeacher = JSON.parse(JSON.stringify(teacher));
  const formattedQuestions = formatExam(serializedExam);
  const range = dateRange(exam.from);

  if (range === "past") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h3 className="text-3xl">
          Exam:{" "}
          <span className="font-bold text-purple">
            {serializedExam.examName}
          </span>
        </h3>
        <div className="text-2xl">This exam has finished</div>
        <p className="text-2xl border-b border-orange hover:border-b-2">
          <Link href={"/student-dashboard/pending-exams"}> See next exams</Link>
        </p>
      </div>
    );
  } else if (range === "future") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h3 className="text-3xl">
          Exam:{" "}
          <span className="font-bold text-purple">
            {serializedExam.examName}
          </span>
        </h3>
        <div className="text-2xl">This exam hasn&apos;t started</div>
        <div>
          {" "}
          it will start on{" "}
          {exam.from.toLocaleDateString("en", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
        <p className="text-2xl border-b border-orange hover:border-b-2">
          <Link href={"/student-dashboard/pending-exams"}> See next exams</Link>
        </p>
      </div>
    );
  } else {
    return (
      <MultiExamForm
        examID={exam._id.toString()}
        examName={exam.examName}
        teacher={serializedTeacher}
        questions={formattedQuestions}
      />
    );
  }
}

export default page;
