import Link from "next/link";
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
      <aside className="p-2 px-4 text-white border-r border-black min-w-fit bg-purple">
        <h1 className="text-3xl">بيت المعلم</h1>
        <nav className="flex flex-col gap-4 mt-4 text-2xl">
          <Link href={"/student-dashboard/pending-exams"}>Next Exams </Link>
          <Link href={"/student-dashboard/previous-exams"}>
            Previous Exams{" "}
          </Link>
        </nav>
      </aside>
      <section className="grow-[11]">{children}</section>
    </section>
  );
}

export default layout;
