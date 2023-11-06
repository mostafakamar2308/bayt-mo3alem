"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginForm() {
  const Router = useRouter();
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });
  const [requestState, setRequestState] = useState("Pending");
  const handleSignIn = async function (e) {
    e.preventDefault();
    const req = await fetch("/api/signIn-teacher", {
      method: "POST",
      body: JSON.stringify(formDetails),
    });
    const response = await req.json();
    if (response.success) {
      setRequestState("Success");
      setRequestState("Success");
      Router.push("/teacher-dashboard");
      Router.refresh();
    } else {
      setRequestState("Failed");
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
        className="p-2 text-xl text-white border-2 rounded-md"
        name="email"
        placeholder="mostafa@gmail.com"
      />
      <input
        type="password"
        onChange={handleInput}
        className="p-2 text-xl text-white border-2 rounded-md"
        name="password"
        placeholder="**********"
      />
      <button
        className="py-3 mt-4 font-bold text-white bg-orange"
        onClick={handleSignIn}
      >
        Log In
      </button>

      {requestState === "Failed" && (
        <div className="text-xl text-red-600">حدث خطأ حاول مرة أخري</div>
      )}
    </form>
  );
}

export default LoginForm;
