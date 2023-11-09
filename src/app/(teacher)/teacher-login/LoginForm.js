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
    const req = await fetch("/api/signIn-teacher", {
      method: "POST",
      body: JSON.stringify(formDetails),
    });
    const response = await req.json();
    if (response.success) {
      toastSuccess("Logged In successfully");
      Router.push("/teacher-dashboard");
    } else {
      toastError("An error has occured, Try again");
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
        className="p-2 text-xl bg-white border-2 rounded-md text-text"
        name="email"
        placeholder="mostafa@gmail.com"
      />
      <input
        type="password"
        onChange={handleInput}
        className="p-2 text-xl bg-white border-2 rounded-md text-text"
        name="password"
        placeholder="**********"
      />
      <button
        className="py-3 mt-4 font-bold text-white bg-orange"
        onClick={handleSignIn}
      >
        Log In
      </button>
    </form>
  );
}

export default LoginForm;
