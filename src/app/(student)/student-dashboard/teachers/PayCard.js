"use client";
import { toastSuccess } from "@/Components/Toast";
import { useMemo } from "react";

function PayCard({ teacherDetails, closeThePopUp }) {
  const message = useMemo(() => {
    return encodeURI(
      "https://wa.me/1018303125/?text= أريد الاشتراك مع أستاذ: " +
        teacherDetails.name
    );
  }, []);
  return (
    <div className="fixed flex items-center justify-center w-screen h-screen bg-black/50">
      <div className="flex flex-col gap-2 p-4 text-xl bg-white rounded-md lg:w-1/2 min-h-fit">
        <h3 className="text-center">
          اشترك مع {teacherDetails.gender === "male" ? "أستاذ" : "أستاذة"}:{" "}
          {teacherDetails.name}
        </h3>
        <p>
          للاشتراك في كل امتحانات السنة مع{" "}
          {teacherDetails.gender === "male" ? "أستاذ" : "أستاذة"}:{" "}
          {teacherDetails.name}، اتبع الخطوات الاتية:
        </p>
        <ol className="list-decimal list-inside">
          <li>
            حول 300 جنيه علي رقم <span>01018303125</span>
          </li>
          <li>أرسل صورة الايصال في رسالة علي واتساب مع ايميلك الذي سجلت به</li>
          <li>سنقوم بتفعيل اشتراكك في البرنامج في خلال خمس دقائق</li>
        </ol>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => {
              navigator.clipboard.writeText("01018303125");
              toastSuccess("تم نسخ الرقم بنجاح");
              closeThePopUp();
            }}
            className="p-2 border-2 rounded-md border-orange"
          >
            انسخ الرقم
          </button>
          <a href={message} className="p-2 rounded-md bg-orange">
            أرسل الرسالة علي واتساب
          </a>
        </div>
      </div>
    </div>
  );
}

export default PayCard;
