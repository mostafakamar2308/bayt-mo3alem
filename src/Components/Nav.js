import Link from "next/link";

async function Nav() {
  // const teacherDetails = await getTeacherDetails();
  return (
    <header className="flex justify-between p-4">
      <Link href={"/"}>
        <h1 className="text-3xl font-bold">بيت المعلم</h1>
      </Link>
      <div className="flex items-center gap-8 text-xl"></div>
      {/* {teacherDetails ? (
        <div className="flex items-center gap-8 text-md">
          <Link
            href={"/new-exam"}
            className="px-8 py-2 font-extrabold rounded-lg bg-orange"
          >
            امتحان جديد
          </Link>
          <LogoutBtn />
        </div>
      ) : ( */}
      <nav className="flex items-center gap-4 text-lg">
        <Link
          href="https://t.me/Madareg_barmja"
          className="p-2 border border-gray-700 rounded-md"
        >
          تواصل معنا
        </Link>

        <Link
          href="/#register"
          className="px-3 py-2 font-bold text-white rounded-md bg-accent"
        >
          سجل مجانا
        </Link>
      </nav>
      {/* )} */}
    </header>
  );
}

export default Nav;
