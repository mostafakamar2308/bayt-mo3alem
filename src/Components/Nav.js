import Link from "next/link";
import LogoutBtn from "./LogoutBtn";
import { getTeacherDetails } from "@/utils/teacherDetailsFromToken";

async function Nav() {
  const teacherDetails = await getTeacherDetails();
  return (
    <header className="flex justify-between p-4">
      <Link href={"/"}>
        <h1 className="text-3xl font-bold">بيت المعلم</h1>
      </Link>
      <div className="flex items-center gap-8 text-xl">
        <Link href={"/about"}>من نحن</Link>
        <Link href={"/contact-us"}>تواصل معنا</Link>
      </div>
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
          <Link
            href="/teacher-register"
            className="px-3 py-2 font-bold rounded-md bg-orange"
          >
            سجل مجانا
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Nav;
