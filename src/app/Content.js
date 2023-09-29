import Link from "next/link";
import tick from "@/Assets/tick.png";
import Image from "next/image";

function Content() {
  return (
    <div className="flex flex-col py-8 text-right">
      <p className="text-2xl">
        منصة بيت المعلم تمنحك السيطرة الكاملة علي عملية صناعة الامتحانات وتقييم
        الطلاب، حيث تقدم لك:
      </p>
      <ul className="p-2 px-4 text-xl">
        <li className="flex items-center gap-1">
          <Image src={tick} alt="checkmark" width={24} height={24} />
          خدمة اعداد الامتحانات، بواجهة سهلة لانشاء أسئلة متنوعة
        </li>
        <li className="flex items-center gap-1">
          <Image src={tick} alt="checkmark" width={24} height={24} />
          خدمة التصحيح الالي للامتحانات لتوفير وقت المعلم
        </li>
        <li className="flex items-center gap-1">
          <Image src={tick} alt="checkmark" width={24} height={24} />
          تقييم فوري للطالب بمجرد انتهائه من الامتحان، وتحليل لنتيجته وتحديد
          نقاط قوته ونقاط ضعفه
        </li>
        <li className="flex items-center gap-1">
          <Image src={tick} alt="checkmark" width={24} height={24} />
          إمكانية جدولة الامتحان وتحديد مواعيدها وعدد المحاولات لكل طالب
        </li>
      </ul>
      <Link
        href={"/#register"}
        className="self-center px-8 py-3 my-4 text-3xl text-center rounded-md w-fit bg-orange"
      >
        سجل الان
      </Link>
    </div>
  );
}

export default Content;
