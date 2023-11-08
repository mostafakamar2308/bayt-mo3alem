"use client";

import { toastSuccess } from "@/Components/Toast";

function ExamSharerButton({ examID }) {
  const copy = async () => {
    await navigator.clipboard.writeText(
      "https://word-thread.vercel.app/exam/" + examID
    );
    toastSuccess("Link Copied successfully");
  };
  return (
    <button
      onClick={copy}
      className="p-2 mt-2 duration-300 border rounded-md border-orange hover:bg-orange hover:text-white"
    >
      Copy Exam Link
    </button>
  );
}

export default ExamSharerButton;
