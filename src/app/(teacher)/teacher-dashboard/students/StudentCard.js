import Student from "@/DB/Models/Student";
import Link from "next/link";
async function StudentCard({ id, grade }) {
  const student = await Student.findOne({ _id: id });
  return (
    <div className="flex justify-between p-4 mx-auto my-4 border rounded-md lg:w-5/6 border-purple">
      <div className="">
        <h3 className="text-2xl">{student.name}</h3>
        <h4>{grade}</h4>
        <h4>هاتف ولي الامر: 0{student.parentPhoneNumber}</h4>
      </div>
      {/* <Link
        className="self-center p-2 text-center duration-300 border rounded-md grow lg:grow-0 lg:p-4 border-secondary hover:bg-secondary"
        href={"/teacher-dashboard/students/" + id.toString()}
      >
        صفحة الطالب
      </Link> */}
    </div>
  );
}

export default StudentCard;
