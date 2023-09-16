import { getTeacherDetails } from "@/utils/teacherDetailsFromToken";

import Link from "next/link";
async function page() {
  const details = await getTeacherDetails();
  return (
    <div className="p-2">
      <div>Exams</div>
      <div>Students</div>
    </div>
  );
}

export default page;
