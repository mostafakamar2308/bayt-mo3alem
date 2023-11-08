import Link from "next/link";
import tick from "@/Assets/tick.png";
import Image from "next/image";

function Content() {
  return (
    <div className="flex flex-col py-8 text-left ">
      <p className="text-2xl">
        WordThread gives you complete control over creating exams and evaluating
        them by:
        {/* منصة بيت المعلم تمنحك السيطرة الكاملة علي عملية صناعة الامتحانات وتقييم
        الطلاب، حيث تقدم لك: */}
      </p>
      <ul className="p-2 px-4 text-xl">
        <li className="flex items-center gap-1">
          <Image src={tick} alt="checkmark" width={24} height={24} />
          An easy way to create Questions with a simple interface.
          {/* خدمة اعداد الامتحانات، بواجهة سهلة لانشاء أسئلة متنوعة */}
        </li>
        <li className="flex items-center gap-1">
          <Image src={tick} alt="checkmark" width={24} height={24} />
          The Auto grading of each exam to help busy teachers.
          {/* خدمة التصحيح الالي للامتحانات لتوفير وقت المعلم */}
        </li>
        <li className="flex items-center gap-1">
          <Image src={tick} alt="checkmark" width={24} height={24} />
          Immediate Analysis of each exam for each students, to know his weak
          points and the weak points of the entire group.
          {/* تقييم فوري للطالب بمجرد انتهائه من الامتحان، وتحليل لنتيجته وتحديد
          نقاط قوته ونقاط ضعفه */}
        </li>
        {/* <li className="flex items-center gap-1">
          <Image src={tick} alt="checkmark" width={24} height={24} />
          
          إمكانية جدولة الامتحان وتحديد مواعيدها وعدد المحاولات لكل طالب
        </li> */}
      </ul>
      <Link
        href={"/teacher-register"}
        className="self-center px-8 py-3 my-4 text-3xl text-center text-white rounded-md shadow-md shadow-primary w-fit bg-accent"
      >
        Sign Up now
      </Link>
    </div>
  );
}

export default Content;
