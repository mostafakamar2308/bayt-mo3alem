import { toastError } from "@/Components/Toast";
import { subjects } from "@/constants";
import React, { useState } from "react";

function SearchComponent({ setter }) {
  const [query, setQuery] = useState({
    subject: "arabic",
    name: "",
  });
  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = await fetch(
      "/api/get-teachers-by-search?subject=" +
        query.subject +
        "&name=" +
        query.name
    );
    const response = await request.json();
    if (response.success) {
      setter(response.teachers);
    } else {
      toastError("حدث خطأ ما، تأكد من اسم المدرس");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center">
        <div className="flex justify-center w-4/5 border rounded-md border-purple">
          <select
            className="h-12 text-xl bg-transparent border-l border-purple"
            name="subject"
            onChange={handleChange}
            value={query.subject}
          >
            {subjects.map((subject) => (
              <option value={subject.value} key={subject.value}>
                {subject.name}
              </option>
            ))}
          </select>
          <input
            name="name"
            value={query.name}
            className="h-12 text-xl bg-transparent border-l indent-3 border-purple grow"
            onChange={handleChange}
            placeholder="اسم المدرس"
          />
          <button className="w-20 text-xl text-white bg-accent">ابحث</button>
        </div>
      </div>
    </form>
  );
}

export default React.memo(SearchComponent);
