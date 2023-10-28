import { grades } from "@/constants";
import { getTeacherDetails } from "@/utils/teacherDetailsFromToken";
import React from "react";
import StudentCard from "./StudentCard";

async function page() {
  const teacherDetails = await getTeacherDetails();
  return (
    <div>
      <h1> السلام عليكم ورحمة الله</h1>
      <p>
        عدد طلابك الكلي:{" "}
        {teacherDetails.studentIds.reduce(
          (prev, curr) => prev + curr.students.length,
          0
        )}
        طالب
      </p>
      <div>
        {teacherDetails.studentIds.map((group) => {
          const groupGrade = grades.find(
            (grade) => grade.value === group.grade
          ).name;
          return (
            <div key={group.grade}>
              <h4>طلاب {groupGrade}:</h4>
              <div>
                {group.students.map((student) => (
                  <StudentCard key={student} grade={groupGrade} id={student} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default page;
