"use client";

import { toastError, toastSuccess } from "@/Components/Toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MCQquestion from "./MCQquestion";
import SegmentQuestion from "./SegmentQuestion";

function MultiExamForm({ examName, examID, questions, teacher }) {
  const [step, setMultiStep] = useState("start");
  const [answers, setAnswer] = useState([]);
  const Router = useRouter();

  const chooseMCQAnswer = (e) => {
    const newAnswer = {
      questionHead: questions[step].questionContent.questionHead,
      choosenAnswer: e.target.textContent,
    };
    console.log(newAnswer);
    if (
      answers.find((answer) => answer.questionHead === newAnswer.questionHead)
    ) {
      setAnswer((prev) =>
        prev.map((answer) =>
          answer.questionHead === newAnswer.questionHead ? newAnswer : answer
        )
      );
    } else {
      setAnswer((prev) => [...prev, newAnswer]);
    }
  };
  const chooseSegmentAnswer = (e, questionHead, segment) => {
    const newAnswer = {
      questionHead,
      choosenAnswer: e.target.textContent,
    };
    const currentSegment = answers.find((answer) => answer.segment === segment);
    console.log(currentSegment);
    if (currentSegment) {
      console.log("segment is here");
      const currentAnswers = currentSegment.answers;
      const currentQuestion = currentAnswers.find(
        (answer) => answer.questionHead === questionHead
      );
      console.log(currentQuestion);
      if (currentQuestion) {
        setAnswer((prev) => {
          return prev.map((question) => {
            if (question.segment === segment) {
              return {
                segment,
                answers: question.answers.map((answer) => {
                  if (answer.questionHead === questionHead) {
                    return newAnswer;
                  } else {
                    return answer;
                  }
                }),
              };
            } else {
              console.log(question);
              return question;
            }
          });
        });
      } else {
        setAnswer((prev) => {
          return prev.map((question) => {
            if (question.segment === segment) {
              return {
                segment,
                answers: [...question.answers, newAnswer],
              };
            } else {
              return question;
            }
          });
        });
      }
    } else {
      console.log("segment isn't here");
      console.log(segment);
      setAnswer((prev) => [...prev, { segment, answers: [newAnswer] }]);
    }
  };
  const SendAnswers = async () => {
    const request = await fetch("/api/attempt-exam", {
      method: "POST",
      body: JSON.stringify({ answers, examID }),
    });
    const response = await request.json();
    if (response.success) {
      toastSuccess("تم تسليم الامتحان بنجاح");
      Router.push("/student-dashboard/exam/" + examID);
    } else {
      toastError("حدث خطأ حاول مجددا");
    }
  };
  const startExam = () => setMultiStep(0);
  const goToNextQuestion = (e) => setMultiStep((prev) => prev + 1);
  const goToPreviousQuestion = (e) => setMultiStep((prev) => prev - 1);
  const goToStep = (index) => {
    setMultiStep(index);
  };
  if (step === "start") {
    return (
      <Beginning
        examName={examName}
        teacherName={teacher.name}
        goToNextQuestion={startExam}
      />
    );
  } else if (step < questions.length) {
    return (
      <div className="flex flex-col min-h-screen">
        <h1>امتحان اللغة العربية</h1>
        <h3>أستاذ: {teacher.name}</h3>
        <div className="flex gap-4">
          <QuestionsStepper
            currStep={step}
            goToStep={goToStep}
            questionLength={questions.length}
          />
        </div>
        <div className="flex flex-col grow">
          <h4>
            السؤال {step + 1}: ({questions[step].questionType})
          </h4>
          {questions[step].questionType !== "segment" ? (
            <MCQquestion
              chooseAnswer={chooseMCQAnswer}
              currentAnswer={
                answers.find(
                  (answer) =>
                    answer.questionHead ===
                    questions[step].questionContent.questionHead
                )?.choosenAnswer
              }
              question={questions[step].questionContent}
            />
          ) : (
            <SegmentQuestion
              wholeQuestion={questions[step].questionContent}
              currentAnswers={
                answers.find(
                  (answer) =>
                    answer.segment === questions[step].questionContent.segment
                )?.answers
              }
              chooseAnswer={chooseSegmentAnswer}
            />
          )}
          <div className="flex justify-center gap-2 p-2">
            <button
              className="w-1/3 p-4 border rounded-md border-purple hover:bg-purple hover:text-white"
              onClick={goToNextQuestion}
              disabled={step == questions.length}
            >
              Next Question
            </button>
            <button
              className="w-1/3 p-4 border rounded-md border-purple disabled:bg-gray-500/60 disabled:text-text hover:text-white hover:bg-purple"
              onClick={goToPreviousQuestion}
              disabled={step == 0}
            >
              Previous Question
            </button>
          </div>
        </div>
      </div>
    );
  } else if (step >= questions.length) {
    return (
      <Ending
        examName={examName}
        goToStep={goToStep}
        answersLength={answers.length}
        questionsLength={questions.length}
        sendAnswers={SendAnswers}
      />
    );
  }
}

const QuestionsStepper = ({ questionLength, goToStep, currStep, solved }) => {
  return [...Array(questionLength).keys()].map((question, index) => (
    <button
      className={` p-4 text-2xl border rounded-md ${
        currStep == index && "bg-purple text-white"
      }`}
      key={index}
      onClick={() => goToStep(index)}
    >
      {index + 1}
    </button>
  ));
};

const Ending = ({
  examName,
  sendAnswers,
  goToStep,
  answersLength,
  questionsLength,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <p className="text-xl">
        أنهيت الان امتحان:{" "}
        <span className="font-bold text-purple"> {examName} </span>
      </p>
      <p>
        لقد جاوبت علي {answersLength} سؤال من أصل {questionsLength} سؤال
      </p>
      <button
        className="px-8 py-2 text-white border rounded-md shadow-md border-purple bg-purple"
        onClick={() => goToStep(0)}
      >
        راجع مجددا
      </button>
      <button
        onClick={sendAnswers}
        className="px-8 py-2 text-white border rounded-md shadow-md border-purple bg-purple"
      >
        سلم الامتحان
      </button>
    </div>
  );
};

const Beginning = ({ examName, goToNextQuestion, teacherName }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5 text-center">
      <h2 className="text-3xl">السلام عليكم</h2>
      <p className="text-xl">
        أنت الان علي وشك دخول امتحان:{" "}
        <span className="font-bold text-purple"> {examName} </span>
      </p>
      <p className="text-lg text-purple">لأستاذ: {teacherName}</p>
      <button
        className="px-8 py-2 text-white border rounded-md shadow-md border-purple bg-purple"
        onClick={goToNextQuestion}
      >
        هيا بنا
      </button>
    </div>
  );
};

const Question = () => {};

export default MultiExamForm;
