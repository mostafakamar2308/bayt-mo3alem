import Link from "next/link";
import Student from "@/DB/Models/Student";
import dbConnect from "@/DB/connect";
import { redirect } from "next/navigation";
import getStudentIdFromToken from "@/utils/getStudentFromToken";
import LogoutBtn from "@/Components/LogoutBtn";
async function layout({ children }) {
  const { id } = getStudentIdFromToken();
  await dbConnect();
  const student = await Student.findById(id);
  if (!student) {
    redirect("/student-login");
  }
  return (
    <section className="min-h-screen lg:flex">
      <aside className="flex items-center justify-between p-2 px-4 text-white border-r border-black lg:block min-w-fit bg-purple">
        {/* <h1 className="text-3xl">بيت المعلم</h1> */}
        <nav className="flex items-center gap-4 mt-4 text-lg lg:flex-col lg:text-2xl">
          <Link
            href={"/student-dashboard/pending-exams"}
            className="border-b border-white lg:border-none"
          >
            Next Exams{" "}
          </Link>
          <Link
            href={"/student-dashboard/previous-exams"}
            className="border-b border-white lg:border-none"
          >
            Previous Exams{" "}
          </Link>
        </nav>
        <LogoutBtn tokenName="student-token" link="student" />
      </aside>
      <section className="grow-[11]">{children}</section>
    </section>
  );
}

export default layout;
