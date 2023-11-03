import Link from "next/link";

function Sidebar() {
  return (
    <div className="p-2 bg-purple text-white border-r-2 flex flex-col grow-[2] max-w-[120px]">
      <Link href={"/teacher-dashboard"}>الامتحانات</Link>
      <Link href={"/teacher-dashboard/students"}>الطلاب</Link>
    </div>
  );
}

export default Sidebar;
