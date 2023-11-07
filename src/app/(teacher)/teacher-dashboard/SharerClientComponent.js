"use client";

import { toastSuccess } from "@/Components/Toast";

function SharerClientComponent({ URL, closePopup }) {
  const copy = () => {
    navigator.clipboard.writeText(URL);
  };
  return (
    <div className="flex justify-center gap-2 p-4 text-base text-center lg:gap-4 ">
      <button
        className="p-2 duration-300 border rounded-md border-orange hover:bg-orange hover:text-white"
        onClick={(e) => {
          copy();
          toastSuccess("Link Copied Successfully");
          closePopup();
        }}
      >
        Copy URL
      </button>
      <a
        onClick={(e) => {
          closePopup();
        }}
        className="p-2 duration-300 border rounded-md border-orange hover:bg-orange hover:text-white"
        href={`https://t.me/share/url?url=${URL}&text=Exam Unit 1`}
        target="_blank"
      >
        Share To Telegram
      </a>
      <a
        onClick={(e) => {
          closePopup();
        }}
        className="p-2 duration-300 border rounded-md border-orange hover:bg-orange hover:text-white"
        href={"https://api.whatsapp.com/send?text=" + URL}
        target="_blank"
        data-action="share/whatsapp/share"
      >
        Share To Whatsapp web
      </a>
    </div>
  );
}

export default SharerClientComponent;
