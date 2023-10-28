import Student from "@/DB/Models/Student";
import Link from "next/link";
async function StudentCard({ id, grade }) {
  const student = await Student.findOne({ _id: id });
  console.log(student);
  return (
    <div className="flex justify-between w-5/6 p-4 mx-auto my-4 border rounded-md border-purple">
      <div>
        <h3>{student.name}</h3>
        <h4>{grade}</h4>
        <h4>تليفون ولي الامر: 0{student.parentPhoneNumber}</h4>
      </div>
      <Link
        className="self-center p-4 duration-300 border rounded-md border-secondary hover:bg-secondary"
        href={"/teacher-dashboard/students/" + id.toString()}
      >
        صفحة الطالب
      </Link>
    </div>
  );
}

export default StudentCard;
