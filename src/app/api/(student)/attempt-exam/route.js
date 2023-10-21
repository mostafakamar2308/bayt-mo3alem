import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Student from "@/DB/Models/Student";
import Exam from "@/DB/Models/Exam";
import { redirect } from "next/navigation";

export async function POST(request) {
  const { answers, examID } = await request.json();
  const { value } = cookies().get("student-token");
  try {
    const { id: studentID } = jwt.verify(value, process.env.JWT_SECRET);
    let exam = await Exam.findById(examID);
    let student = await Student.findById(studentID);
    if (!student) {
      return NextResponse.json({
        success: false,
        message: "student not verified",
      });
    }
    const { score, percentageScore } = evaluateAnswers(answers, exam.Questions);
    const isStudentAttemptPrev = exam.studentIds.includes(student._id);
    if (!isStudentAttemptPrev) {
      exam.studentIds.push(student._id);
      exam = await exam.save();
    }

    //check if there is a subject
    const examSubjects = student.examsSubmitted.find(
      (subject) => subject.subjectName === exam.subject
    );
    if (examSubjects) {
      // check if the exam is there by its id
      const prevExam = examSubjects.exams.find(
        (currExam) => currExam.exam.examId.toString() === String(examID)
      );
      if (!prevExam) {
        examSubjects.exams.push({
          date: exam.from,
          exam: {
            examId: exam._id,
            stats: {
              timeSpent: 50,
              rawScore: score,
              percentileScore: percentageScore,
            },
            examAnswers: answers,
          },
        });
      }
    } else {
      // No subject so create it from scratch
      student.examsSubmitted.push({
        subjectName: exam.subject,
        exams: [
          {
            date: exam.from,
            exam: {
              examId: exam._id,
              stats: {
                timeSpent: 50,
                rawScore: score,
                percentileScore: percentageScore,
              },
              examAnswers: answers,
            },
          },
        ],
      });
    }

    student = await student.save();

    return NextResponse.json({ success: true, score, percentageScore });
  } catch (error) {
    return NextResponse.json({ error: error, success: false });
  }
}

function evaluateAnswers(studentAnswers, examQuestionWithAnswers) {
  // Create a variable to keep track of the student's score
  let score = 0;

  // Loop through each student answer
  for (let i = 0; i < studentAnswers.length; i++) {
    const studentAnswer = studentAnswers[i];
    const questionHead = studentAnswer.questionHead;
    const chosenAnswer = studentAnswer.choosenAnswer;

    // Find the corresponding exam question with answers
    const examQuestion = examQuestionWithAnswers.find(
      (question) => question.questionHead === questionHead
    );

    // If the exam question is found, check the chosen answer
    if (examQuestion) {
      const correctAnswer = examQuestion.answers.find(
        (answer) => answer.correct
      );

      // If a correct answer exists and it matches the student's chosen answer, increment the score
      if (correctAnswer && correctAnswer.value === chosenAnswer) {
        score++;
      }
    }
  }

  // Calculate the percentage score
  const percentageScore = (score / examQuestionWithAnswers.length) * 100;

  return {
    score: score,
    percentageScore: percentageScore,
  };
}
