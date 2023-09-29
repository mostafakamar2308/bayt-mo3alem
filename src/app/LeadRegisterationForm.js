"use client";

import { useState } from "react";

function LeadRegisterationForm() {
  const [leadFormDetails, setLeadFormDetails] = useState({
    name: "",
    phone: "",
    subject: "arabic",
  });
  const [formState, setFormState] = useState({ state: "" });
  const handleChange = (e) => {
    setLeadFormDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ state: "pending" });
    const req = await fetch("/api/register-lead", {
      method: "POST",
      body: JSON.stringify(leadFormDetails),
    });
    const response = await req.json();
    console.log(response);
    if (response.success) {
      setFormState({ state: "success" });
    } else {
      setFormState({ state: "failure" });
    }
  };
  return (
    <form className="flex flex-col " id="register">
      <div className="flex flex-col w-full gap-2 p-2 py-6 text-lg">
        <input
          required
          placeholder="الاسم"
          onChange={handleChange}
          value={leadFormDetails.name}
          name="name"
          className="p-2 bg-transparent border-b border-gray-500 outline-none"
        />
        <input
          placeholder="رقم الهاتف"
          required
          onChange={handleChange}
          value={leadFormDetails.phone}
          name="phone"
          className="p-2 bg-transparent border-b border-gray-500 outline-none"
        />
        <div className="flex items-center gap-4 bg-transparent">
          <label>المادة</label>
          <select
            required
            name="subject"
            onChange={handleChange}
            value={leadFormDetails.subject}
            className="bg-transparent border border-gray-500 rounded-md"
          >
            <option value={"arabic"} className="text-black">
              اللغة العربية
            </option>
            <option value={"english"} className="text-black">
              اللغة الانجليزية
            </option>
            <option value={"french"} className="text-black">
              اللغة الفرنسية
            </option>
            <option value={"german"} className="text-black">
              اللغة الألمانية
            </option>
            <option value={"geography"} className="text-black">
              الجغرافيا
            </option>
            <option value={"history"} className="text-black">
              التاريخ
            </option>
            <option value={"math"} className="text-black">
              الرياضيات
            </option>
            <option value={"chemistry"} className="text-black">
              الكيمياء
            </option>
            <option value={"biology"} className="text-black">
              الأحياء
            </option>
            <option value={"physics"} className="text-black">
              الفيزياء
            </option>
            <option value={"philosophy"} className="text-black">
              الفلسفة
            </option>
          </select>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        // disabled={formState.state === "pending"}
        className="px-3 py-2 text-2xl font-bold bg-white border rounded-md disabled:bg-offWhite text-darkGray"
      >
        {formState.state !== "pending" ? "سجل الان" : "..."}
      </button>
      {formState.state === "success" && (
        <div className="mt-2 text-sm text-center text-green-500">
          تم التسجيل بنجاح، سيتم التواصل معك قريبا إن شاء الله
        </div>
      )}
      {formState.state === "failure" && (
        <div className="mt-2 text-sm text-center text-red-400">
          حدث خطأ، تأكد من البيانات
        </div>
      )}
    </form>
  );
}

export default LeadRegisterationForm;
