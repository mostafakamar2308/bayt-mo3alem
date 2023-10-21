import { cookies } from "next/headers";
import Link from "next/link";
import jwt from "jsonwebtoken";
import Student from "@/DB/Models/Student";
import dbConnect from "@/DB/connect";
import { redirect } from "next/navigation";
import getStudentIdFromToken from "@/utils/getStudentFromToken";
async function layout({ children }) {
  const { id } = getStudentIdFromToken();
  await dbConnect();
  const student = await Student.findById(id);
  if (!student) {
    redirect("/student-login");
  }
  return (
    <section className="flex min-h-screen">
      <aside className="p-2 px-4 border-l border-black min-w-fit">
        <h1 className="text-3xl">بيت المعلم</h1>
        <nav className="flex flex-col gap-4 mt-4 text-2xl">
          <Link href={"/student-dashboard/pending-exams"}>
            امتحاناتي القادمة
          </Link>
          <Link href={"/student-dashboard/previous-exams"}>
            امتحاناتي السابقة
          </Link>
          <Link href={"/student-dashboard/teachers"}>المدرسين</Link>
        </nav>
      </aside>
      <section className="grow-[11]">{children}</section>
    </section>
  );
}

export default layout;
