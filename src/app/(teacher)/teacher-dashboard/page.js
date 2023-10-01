import { getTeacherDetails } from "@/utils/teacherDetailsFromToken";
import { redirect } from "next/navigation";

async function page() {
  const details = await getTeacherDetails();
  if (!details) {
    redirect("/teacher-login");
  }
  return (
    <div className="p-2">
      <h2>أهلا بك يا أستاذ: {details.name}</h2>
    </div>
  );
}

export default page;
