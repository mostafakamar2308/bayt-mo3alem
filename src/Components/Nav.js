import Link from "next/link";
import LogoutBtn from "./LogoutBtn";
import { getTeacherDetails } from "@/utils/teacherDetailsFromToken";

async function Nav() {
  const teacherDetails = await getTeacherDetails();
  return (
    <header className="flex justify-between p-4">
      <h1 className="text-3xl font-bold">
        <Link href={"/"}>مدرستى</Link>
      </h1>
      {teacherDetails ? (
        <div className="flex items-center gap-8 text-md">
          <Link
            href={"/new-exam"}
            className="px-8 py-2 font-extrabold rounded-lg bg-orange"
          >
            امتحان جديد
          </Link>
          <LogoutBtn />
        </div>
      ) : (
        <nav className="flex items-center gap-8 text-lg">
          <Link href={"/teacher-login"} className="font-bold">
            تسجيل الدخول
          </Link>
          <Link
            href="/teacher-register"
            className="px-3 py-2 font-bold rounded-md bg-orange"
          >
            سجل حساب جديد
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Nav;
