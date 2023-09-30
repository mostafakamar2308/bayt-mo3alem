import Image from "next/image";
import Link from "next/link";
import img from "@/Assets/Exams-bro.png";
import RegisterForm from "./RegisterForm";

function page() {
  return (
    <div className="flex items-center justify-center h-full ">
      <Image src={img} alt="Image 1" className="w-1/2" />
      <div className="w-[40%] p-8 h-fit border text-center bg-white rounded-2xl">
        <h2 className="text-2xl font-bold">السلام عليكم</h2>
        <p className="mb-8 text-lg font-semibold">
          يمكنك تسجيل حساب جديد عن طريق ملء بياناتك هنا
        </p>
        <RegisterForm />
        <p className="mt-2">
          لديك حساب بالفعل؟{" "}
          <Link
            href={"/student-login"}
            className="transition-all duration-300 border-b-2 hover:border-lightBlue "
          >
            سجل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}

export default page;
