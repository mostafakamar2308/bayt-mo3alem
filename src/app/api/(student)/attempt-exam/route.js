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
    const { score, percentageScore, examQuestionWithAnswers } = evaluateAnswers(
      answers,
      exam.Questions
    );
    exam.Questions = examQuestionWithAnswers;
    console.log("exam evaluated successfully");
    const isStudentAttemptPrev = exam.studentIds.includes(student._id);
    if (!isStudentAttemptPrev) {
      exam.studentIds.push(student._id);
    }

    // check if there is a subject
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
    if (exam.stats.highestScore[0].score < score) {
      exam.stats.highestScore[0].score = score;
      exam.stats.highestScore[0].owners = [student._id];
    } else if (exam.stats.highestScore[0].score == score) {
      exam.stats.highestScore[0].owners.push(student._id);
    }
    if (exam.stats.lowestScore[0].score == 0) {
      exam.stats.lowestScore[0].score = score;
    } else {
      if (exam.stats.lowestScore[0].score > score) {
        exam.stats.lowestScore[0].score = score;
        exam.stats.lowestScore[0].owners = [student._id];
      } else if (exam.stats.lowestScore[0].score == score) {
        exam.stats.lowestScore[0].owners.push(student._id);
      }
    }
    const accumulativeAverageScore =
      (score + exam.stats.averageScore * exam.stats.scores.length) /
      (exam.stats.scores.length + 1);
    console.log(accumulativeAverageScore);
    exam.stats.averageScore = accumulativeAverageScore;
    exam.stats.scores.push(score);
    exam.markModified("Questions");
    await exam.save();
    await student.save();
    return NextResponse.json({
      success: true,
      score,
      percentageScore,
      examQuestionWithAnswers,
    });
  } catch (error) {
    return NextResponse.json({ error: error, success: false });
  }
}

function evaluateAnswers(studentAnswers, examQuestionWithAnswers) {
  // Create a variable to keep track of the student's score
  let score = 0;
  let examLength = 0;
  console.log("start evaluation");
  // Loop through each student answer
  for (let i = 0; i < studentAnswers.length; i++) {
    const studentAnswer = studentAnswers[i];
    if (studentAnswer.segment) {
      //this is a segment question
      console.log("segment Question Evaluation");
      const segmentStudentAnswers = studentAnswer.answers;
      const segmentQuestions = examQuestionWithAnswers.find(
        (question) => question.questionContent.segment === studentAnswer.segment
      ).questionContent.questions;
      examLength += segmentQuestions.length;
      for (let i = 0; i < segmentQuestions.length; i++) {
        const questionHead = segmentQuestions[i].questionHead;
        const chosenAnswer = segmentQuestions[i].answers.find(
          (answer) => answer.correct
        );

        // Find the corresponding exam question with answers
        const examQuestion = segmentStudentAnswers.find(
          (question) => question.questionHead === questionHead
        );

        // If the exam question is found, check the chosen answer
        if (examQuestion) {
          // If a correct answer exists and it matches the student's chosen answer, increment the score
          if (examQuestion.choosenAnswer === chosenAnswer.value) {
            score++;
            segmentQuestions[i].stats.correctNo++;
            chosenAnswer.stats.choosen++;
          } else {
            console.log("segment question not correct");
            console.log(examQuestion.choosenAnswer);
            const choosenAnswer = segmentQuestions[i].answers.find(
              (answer) => examQuestion.choosenAnswer === answer.value
            );
            choosenAnswer.stats.choosen++;
            console.log(choosenAnswer);
          }
        }
      }
    } else {
      console.log("mcq question Evaluation");
      examLength++;
      const questionHead = studentAnswer.questionHead;
      const chosenAnswer = studentAnswer.choosenAnswer;

      // Find the corresponding exam question with answers
      const examQuestion = examQuestionWithAnswers.find(
        (question) => question.questionContent.questionHead === questionHead
      );

      // If the exam question is found, check the chosen answer
      if (examQuestion) {
        const correctAnswer = examQuestion.questionContent.answers.find(
          (answer) => answer.correct
        );

        // If a correct answer exists and it matches the student's chosen answer, increment the score
        if (correctAnswer && correctAnswer.value === chosenAnswer) {
          score++;
          correctAnswer.stats.choosen++;
          examQuestion.questionContent.stats.correctNo++;
        } else {
          console.log("wrong mcq answer");
          console.log(chosenAnswer);
          const choosenAnswer = examQuestion.questionContent.answers.find(
            (answer) => chosenAnswer === answer.value
          );
          choosenAnswer.stats.choosen++;
          console.log("wrong mcq question Evaluation done success");
        }
      }
    }
  }

  // Calculate the percentage score
  const percentageScore = (score / examLength) * 100;

  return {
    score: score,
    percentageScore: percentageScore,
    examQuestionWithAnswers,
  };
}
