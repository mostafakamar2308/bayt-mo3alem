"use client";
import { toastError, toastSuccess } from "@/Components/Toast";
import { grades } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

function RegisterForm() {
  const Router = useRouter();
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
    name: "",
    parentPhoneNumber: "",
    grade: "grade 1",
  });
  const [requestState, setRequestState] = useState("Pending");
  const handleChange = (e) => {
    setFormDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const req = await fetch("/api/register-student", {
        method: "POST",
        body: JSON.stringify(formDetails),
      });
      const response = await req.json();
      if (response.success) {
        toastSuccess("تم تسجيلك بنجاح");
        Router.push("/student-dashboard");
        Router.refresh();
      } else {
        console.log(response);
        toastError("حدث خطأ حاول مرة أخري");
      }
    } catch (error) {
      console.log(error);
      toastError("حدث خطأ حاول مرة أخري");
    }
  };
  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-2 text-white">
      <input
        name="name"
        placeholder="مصطفى قمر"
        type="text"
        className="p-2 text-xl border-2 rounded-md grow"
        value={formDetails.name}
        onChange={handleChange}
      />{" "}
      <input
        name="email"
        placeholder="mrMohamed@gmail.com"
        type="email"
        value={formDetails.email}
        onChange={handleChange}
        className="p-2 text-xl border-2 rounded-md"
      />
      <input
        name="parentPhoneNumber"
        placeholder="رقم هاتف والدك"
        type="tel"
        className="p-2 text-xl border-2 rounded-md"
        value={formDetails.phoneNumber}
        onChange={handleChange}
      />
      <select
        className="p-2 text-xl border-2 rounded-md"
        name="grade"
        onChange={handleChange}
        value={formDetails.grade}
      >
        {grades.map((grade) => (
          <option value={grade.value} key={grade.value}>
            {grade.name}
          </option>
        ))}
      </select>
      <input
        name="password"
        placeholder="***********"
        className="p-2 text-xl border-2 rounded-md"
        type="password"
        value={formDetails.password}
        onChange={handleChange}
      />
      <button
        onClick={handleRegister}
        className="py-3 mt-4 font-bold text-gray-700 bg-orange"
      >
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
