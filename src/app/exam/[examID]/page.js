import Exam from "@/DB/Models/Exam";
import Teacher from "@/DB/Models/Teacher";

import MultiExamForm from "./MultiExamForm";
import jwt from "jsonwebtoken";
import dbConnect from "@/DB/connect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function page({ params }) {
  const { examID } = params;
  await dbConnect();
  const { value } = cookies().get("student-token");
  const studentData = jwt.verify(value, process.env.JWT_SECRET);
  const exam = await Exam.findById(examID);
  if (!exam) {
    redirect("/student-dashboard");
  }
  console.log(
    exam.studentIds
      .map((student) => student.toString())
      .includes(studentData.id)
  );
  if (
    exam.studentIds
      .map((student) => student.toString())
      .includes(studentData.id)
  ) {
    redirect("/student-dashboard/exam/" + exam._id.toString());
  }
  const teacher = await Teacher.findById(exam.teacherId);
  const serializedExam = JSON.parse(JSON.stringify(exam));
  const serializedTeacher = JSON.parse(JSON.stringify(teacher));
  const questionWithoutAnswers = serializedExam.Questions.map((question) => {
    if (question.questionType !== "segment") {
      const newAnswers = question.questionContent.answers.map((answer) => {
        answer.correct = null;
        return answer;
      });
      return {
        ...question,
        questionContent: {
          ...question.questionContent,
          answers: newAnswers,
          explaination: "",
        },
      };
    } else {
      return question;
    }
  });

  return (
    <MultiExamForm
      exam={serializedExam}
      teacher={serializedTeacher}
      questions={questionWithoutAnswers}
    />
  );
}

export default page;
