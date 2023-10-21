"use client";
import { useState } from "react";
import SearchComponent from "./SearchPart";
import TeacherCard from "./TeacherCard";

function TeachersPart({ teachers }) {
  const [teachersArr, setTeachersArr] = useState(teachers);

  return (
    <div>
      <SearchComponent setter={setTeachersArr} />
      <div>
        {teachersArr.length == 0 ? (
          <div className="flex items-center justify-center h-40 text-2xl text-center">
            <div>لا يوجد مدرسين بهذه المواصفات</div>
          </div>
        ) : (
          <h2 className="my-4 text-2xl">
            عدد المدرسين الموجودين: {teachersArr.length}
          </h2>
        )}
        {teachersArr.map((teacher) => (
          <TeacherCard teacher={teacher} key={teacher.id} />
        ))}
      </div>
    </div>
  );
}

export default TeachersPart;
