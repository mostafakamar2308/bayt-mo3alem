"use client";
import Link from "next/link";
import teacherImage from "@/Assets/teacher.png";
import Image from "next/image";

function TeacherCard({ teacher }) {
  const handleSubsribe = async () => {
    const request = await fetch("/api/subscribe-to-teacher", {
      method: "PUT",
      body: JSON.stringify({ teacherPhoneNumber: teacher.phoneNumber }),
    });
    const response = await request.json();
    console.log(response);
  };
  return (
    <div className="flex items-center justify-center mt-4">
      <div className="flex w-4/5 gap-4 p-4 border rounded-md border-accent">
        <Image
          src={teacherImage}
          alt="teacher placeholder"
          className=""
          width={100}
        />
        <div className="flex flex-col justify-center gap-2 grow">
          <Link
            href={"/student-dashboard/teacher/" + teacher.id}
            className="pb-2 text-2xl border-b-2 border-transparent text-text hover:border-text w-fit"
          >
            <h3>
              {teacher.gender === "male" ? "أستاذ" : "أستاذة"}/ {teacher.name}
            </h3>
          </Link>
          <h4 className="text-xl">رقم الهاتف: 0{teacher.phoneNumber}</h4>
          <h4 className="text-lg">عدد امتحاناته: {teacher.examIds.length}</h4>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <h4
            className="p-2 text-lg text-center border rounded-md border-primary"
            href={"/student-dashboard/teacher/" + teacher.id}
          >
            سعر الامتحانات في الشهر: 20
          </h4>
          <button
            onClick={handleSubsribe}
            className="p-4 text-xl rounded-md shadow-md bg-orange"
          >
            اشترك مع المدرس
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherCard;
