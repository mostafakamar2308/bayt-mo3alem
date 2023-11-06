import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
export default function getStudentIdFromToken() {
  try {
    const { value } = cookies().get("student-token");
    const details = jwt.verify(value, process.env.JWT_SECRET);
    return details;
  } catch (e) {
    redirect("/student-login");
  }
}
