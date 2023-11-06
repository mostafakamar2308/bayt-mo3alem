import Link from "next/link";
import exam from "@/Assets/score.png";
import student from "@/Assets/student.png";
import Image from "next/image";

import LogoutBtn from "./LogoutBtn";
function Sidebar() {
  return (
    <div className="hidden lg:flex p-2 bg-purple  flex-col justify-between h-screen sticky top-0 text-white border-r-2  grow-[4] max-w-[200px] items-center">
      <div className="flex flex-col gap-5 py-7">
        <Link href={"/teacher-dashboard"} className="flex items-center gap-2">
          <Image src={exam} alt="exams icon" width={40} />
          Exams
        </Link>
        <Link
          href={"/teacher-dashboard/students"}
          className="flex items-center gap-2"
        >
          <Image src={student} alt="students icon" width={40} />
          Students
        </Link>
      </div>
      <div>
        <LogoutBtn />
      </div>
    </div>
  );
}

export default Sidebar;
