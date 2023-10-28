import { redirect } from "next/navigation";

function page() {
  redirect("/student-dashboard/pending-exams");
}

export default page;
