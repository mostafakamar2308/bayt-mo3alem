"use client";
import { subjects } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

function RegisterationForm() {
  const Router = useRouter();
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
    gender: "male",
    subject: "english",
  });
  const [requestState, setRequestState] = useState("Pending");
  const handleChange = (e) => {
    setFormDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const req = await fetch("/api/register-teacher", {
      method: "POST",
      body: JSON.stringify(formDetails),
    });
    const response = await req.json();
    if (response.success) {
      setRequestState("Success");
      Router.push("/new-exam");
      Router.refresh();
    } else {
      setRequestState("Failed");
    }
  };
  return (
    <form
      onSubmit={handleRegister}
      className="flex flex-col max-w-full gap-2 bg-white text-text"
    >
      <input
        name="email"
        placeholder="mrMohamed@gmail.com"
        type="email"
        value={formDetails.email}
        onChange={handleChange}
        className="w-full p-2 text-xl bg-white border-2 rounded-md text-text"
      />
      <input
        name="phoneNumber"
        placeholder="01234567891"
        type="tel"
        className="w-full p-2 text-xl bg-white border-2 rounded-md text-text"
        value={formDetails.phoneNumber}
        onChange={handleChange}
      />
      <div className="flex gap-2">
        <select className="p-2 border-2" onChange={handleChange} name="gender">
          <option value="male">Mr</option>
          <option value={"female"}>Miss</option>
        </select>
        <input
          name="name"
          placeholder="مصطفى قمر"
          type="text"
          className="w-full p-2 text-xl bg-white border-2 rounded-md text-text"
          value={formDetails.name}
          onChange={handleChange}
        />
      </div>

      <input
        name="password"
        placeholder="***********"
        className="w-full p-2 text-xl bg-white border-2 rounded-md text-text"
        type="password"
        value={formDetails.password}
        onChange={handleChange}
      />
      <button
        onClick={handleRegister}
        className="py-3 mt-4 font-bold bg-white text-text bg-orange"
      >
        Register
      </button>
      {requestState === "Success" && (
        <div className="text-xl text-green-600">تم تسجيلك بنجاح</div>
      )}
      {requestState === "Failed" && (
        <div className="text-xl text-red-600">حدث خطأ حاول مرة أخري</div>
      )}
    </form>
  );
}

export default RegisterationForm;
