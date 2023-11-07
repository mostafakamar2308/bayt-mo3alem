import { getTeacherDetails } from "@/utils/teacherDetailsFromToken";
import { redirect } from "next/navigation";
import ExamCard from "./ExamCard";
import Link from "next/link";
import { grades } from "@/constants";
import ExamSharerPopUp from "./ExamSharerPopUp";

export const dynamic = "force-dynamic";

async function page({ searchParams }) {
  const details = await getTeacherDetails();
  if (!details) {
    redirect("/teacher-login");
  }
  const examURLCallback = searchParams.exam;
  return (
    <div className="p-4 py-8">
      <h2 className="pb-4 text-3xl border-b-2 w-fit border-accent">
        Welcome <span className="text-orange"> {details.name}</span>
      </h2>
      <p className="mt-4 text-xl">Your Exams:</p>
      <div className="flex flex-col gap-4 p-2">
        {details.examsCreated.map((group) => {
          return (
            <div key={group.grade}>
              <p>
                Exams of:{" "}
                <span className="text-xl font-bold">
                  {grades.find((grade) => group.grade === grade.value).name}
                </span>
              </p>
              <div>
                {group.exams.map((exam) => {
                  return <ExamCard key={exam.date} examId={exam.id} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
      {examURLCallback && <ExamSharerPopUp examID={examURLCallback} />}
      <Link
        href={"/new-exam"}
        className="fixed flex items-center gap-2 p-4 text-white duration-300 rounded-md bottom-10 right-5 bg-accent hover:bg-lightGray"
      >
        Create New Exam{" "}
      </Link>
    </div>
  );
}

export default page;
