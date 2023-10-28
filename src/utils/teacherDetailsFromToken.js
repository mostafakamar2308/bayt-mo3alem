import Teacher from "@/DB/Models/Teacher";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function getTeacherDetails() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (token) {
    try {
      const content = jwt.decode(token.value, process.env.JWT_SECRET);
      const teacherDetails = await Teacher.findOne({
        email: content.email,
        _id: content.id,
      });
      return teacherDetails;
    } catch (e) {
      console.log("Token isn't valid");
      redirect("/teacher-login");
    }
  } else {
    redirect("/teacher-login");
  }
}
