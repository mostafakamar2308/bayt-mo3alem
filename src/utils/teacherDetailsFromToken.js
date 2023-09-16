import Teacher from "@/DB/Models/Teacher";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function getTeacherDetails() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (token) {
    const content = jwt.verify(token.value, process.env.JWT_SECRET);
    const teacherDetails = await Teacher.findOne({
      email: content.email,
      _id: content.id,
    });
    return teacherDetails;
  } else {
    return null;
  }
}
