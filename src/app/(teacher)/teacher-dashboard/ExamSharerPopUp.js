"use client";
import { useState } from "react";
import SharerClientComponent from "./SharerClientComponent";

function ExamSharerPopUp({ examID }) {
  const [examURL, setExamURL] = useState(
    "https://bayt-mo3alem.vercel.app/exam/" + examID
  );
  const closePopup = () => {
    setExamURL("");
  };
  if (examURL) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,.5)]">
        <div className="p-4 bg-white rounded-md lg:w-1/2 ">
          <h1 className="text-xl font-bold lg:text-2xl">
            Share your Exam With your students
          </h1>
          <SharerClientComponent closePopup={closePopup} URL={examURL} />
        </div>
      </div>
    );
  }
}

export default ExamSharerPopUp;
