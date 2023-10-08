"use client";

import { toastError, toastSuccess } from "@/Components/Toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

function MultiExamForm({ exam, questions, teacher }) {
  const [step, setMultiStep] = useState("start");
  const [answers, setAnswer] = useState([]);
  const Router = useRouter();

  const chooseAnswer = (e) => {
    const answer = {
      questionHead: questions[step].questionHead,
      choosenAnswer: e.target.textContent,
    };
    setAnswer((prev) => [...prev, answer]);
  };

  const SendAnswers = async () => {
    console.log(exam);
    const request = await fetch("/api/attempt-exam", {
      method: "POST",
      body: JSON.stringify({ answers, examID: exam._id }),
    });
    const response = await request.json();
    if (response.success) {
      toastSuccess("تم تسليم الامتحان بنجاح");
      Router.push("/student-dashboard/exam/" + exam._id);
    } else {
      toastError("حدث خطأ حاول مجددا");
      console.log(response);
    }
  };
  const startExam = () => setMultiStep(0);
  const goToNextQuestion = (e) => setMultiStep((prev) => prev + 1);
  console.log(step);
  if (step === "start") {
    return (
      <Beginning
        examName={exam.examName}
        teacherName={teacher.name}
        goToNextQuestion={startExam}
      />
    );
  } else if (step < questions.length) {
    return (
      <div className="flex flex-col h-screen">
        <h1>امتحان اللغة العربية</h1>
        <h3>أستاذ: {teacher.name}</h3>
        <div className="flex flex-col grow">
          <h4>السؤال {step + 1}</h4>
          <Question
            chooseAnswer={chooseAnswer}
            question={questions[step]}
            nextQuestion={goToNextQuestion}
          />
        </div>
      </div>
    );
  } else if (step >= questions.length) {
    return <Ending examName={exam.examName} sendAnswers={SendAnswers} />;
  }
}

const Ending = ({ examName, sendAnswers }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <p className="text-xl">
        أنهيت الان امتحان:{" "}
        <span className="font-bold text-purple"> {examName} </span>
      </p>
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

const Question = ({ question, nextQuestion, chooseAnswer }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 grow lg:p-4 lg:items-stretch">
      <p className="text-4xl">{question.questionHead}</p>
      <div className="flex flex-col gap-4 ">
        {question.answers.map((answer) => (
          <button
            onClick={(e) => {
              chooseAnswer(e);
              nextQuestion();
            }}
            className="p-2 text-xl text-right border rounded-md border-purple hover:bg-purple hover:text-white"
            key={answer._id}
          >
            {answer.value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultiExamForm;
