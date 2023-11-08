import Link from "next/link";
import exam from "@/Assets/score.png";
import student from "@/Assets/student.png";
import Image from "next/image";

import LogoutBtn from "./LogoutBtn";
function Sidebar() {
  return (
    <div className="flex p-2 bg-purple w-screen   lg:flex-col justify-between lg:h-screen lg:sticky top-0 text-white border-r-2  lg:grow-[4] lg:max-w-[200px] lg:items-center">
      <div className="flex gap-5 lg:flex-col lg:py-7">
        <Link
          href={"/teacher-dashboard"}
          className="flex items-center gap-2 border-b lg:border-none"
        >
          <Image
            src={exam}
            alt="exams icon"
            className="hidden lg:inline"
            width={40}
          />
          Exams
        </Link>
        <Link
          href={"/teacher-dashboard/students"}
          className="flex items-center gap-2 border-b lg:border-none"
        >
          <Image
            src={student}
            alt="students icon"
            className="hidden lg:inline"
            width={40}
          />
          Students
        </Link>
      </div>
      <div>
        <LogoutBtn tokenName={"token"} link={"teacher"} />
      </div>
    </div>
  );
}

export default Sidebar;
