"use client";
import Image from "next/image";
import plus from "@/Assets/plus.png";
import { useState } from "react";
import { createPortal } from "react-dom";
import NewQuestionForm from "./NewQuestionForm";

function ExamForm() {
  const [examDetails, setExamDetails] = useState({
    examName: "",
  });
  const toggleNewQuestionPop = () =>
    document.getElementById("my_modal_1").showModal();
  return (
    <div className="p-4">
      <div className="flex justify-between ">
        <input
          autoFocus
          className="p-4 text-lg bg-transparent border-b-2 border-gray-400 focus:outline-none"
          placeholder="أدخل اسم الامتحان"
        />
        <div className="flex gap-4">
          <button>عرض</button>
          <button>حفظ ونشر</button>
        </div>
      </div>
      <button
        onClick={toggleNewQuestionPop}
        className="absolute w-24 h-24 rounded-full bottom-10 left-10"
      >
        <Image src={plus} alt="add new question" />
      </button>
      <NewQuestionForm />
    </div>
  );
}

export default ExamForm;
