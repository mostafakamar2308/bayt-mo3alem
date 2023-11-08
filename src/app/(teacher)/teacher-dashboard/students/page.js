import { grades } from "@/constants";
import { getTeacherDetails } from "@/utils/teacherDetailsFromToken";
import React, { Suspense } from "react";
import StudentCard from "./StudentCard";

async function page() {
  const teacherDetails = await getTeacherDetails();
  return (
    <div className="p-2" dir="rtl">
      <h1 className="text-2xl"> السلام عليكم ورحمة الله</h1>
      <p className="text-xl">
        عدد طلابك الكلي:{" "}
        <span className="text-2xl">
          {teacherDetails.studentIds.reduce(
            (prev, curr) => prev + curr.students.length,
            0
          )}
        </span>{" "}
        طالب
      </p>
      <div>
        {teacherDetails.studentIds.map((group) => {
          const groupGrade = grades.find(
            (grade) => grade.value === group.grade
          ).name;
          return (
            <div key={group.grade} dir="rtl">
              <h4 className="mt-4 text-2xl text-purple">طلاب {groupGrade}:</h4>
              <div>
                <Suspense fallback={<div>Loading Your Students ...</div>}>
                  {group.students.map((student) => (
                    <StudentCard
                      key={student}
                      grade={groupGrade}
                      id={student}
                    />
                  ))}
                </Suspense>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default page;
