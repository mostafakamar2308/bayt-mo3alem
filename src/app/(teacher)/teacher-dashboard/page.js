import { getTeacherDetails } from "@/utils/teacherDetailsFromToken";
import { redirect } from "next/navigation";
import ExamCard from "./ExamCard";
import Link from "next/link";

async function page() {
  const details = await getTeacherDetails();
  if (!details) {
    redirect("/teacher-login");
  }

  return (
    <div className="p-4 py-8">
      <h2 className="pb-4 text-3xl border-b-2 w-fit border-accent">
        أهلا بك يا أستاذ: {details.name}
      </h2>
      <p className="mt-4 text-xl">هذه هي الامتحانات التي صممتها إلي الان:</p>
      <div className="flex flex-col gap-4 p-2">
        {details.examIds.map((id) => {
          return <ExamCard examId={id} />;
        })}
      </div>
      <Link
        href={"/new-exam"}
        className="fixed flex items-center gap-2 p-4 text-white rounded-md bottom-10 left-5 bg-accent"
      >
        صمم امتحان جديد
      </Link>
    </div>
  );
}

export default page;
