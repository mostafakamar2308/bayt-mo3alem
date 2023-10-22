"use client";
import { toastError, toastSuccess } from "@/Components/Toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginForm() {
  const Router = useRouter();
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });
  const handleSignIn = async function (e) {
    e.preventDefault();
    try {
      const req = await fetch("/api/signIn-student", {
        method: "POST",
        body: JSON.stringify(formDetails),
      });
      const response = await req.json();
      console.log(response);
      if (response.success) {
        Router.push("/student-dashboard/pending-exams");
        Router.refresh();
        toastSuccess("تم تسجيل الدخول بنجاح");
      } else {
        toastError("حدث خطأ ما، تأكد من الايميل والباسورد");
      }
    } catch (error) {
      toastError("حدث خطأ ما، تأكد من الايميل والباسورد");
    }
  };
  const handleInput = function (e) {
    setFormDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <form onSubmit={handleSignIn} className="flex flex-col gap-2">
      <input
        onChange={handleInput}
        type="email"
        className="p-2 text-xl border-2 rounded-md"
        name="email"
        placeholder="mostafa@gmail.com"
      />
      <input
        type="password"
        onChange={handleInput}
        className="p-2 text-xl border-2 rounded-md"
        name="password"
        placeholder="**********"
      />
      <button className="py-3 mt-4 font-bold bg-orange" onClick={handleSignIn}>
        Submit
      </button>
    </form>
  );
}

export default LoginForm;
