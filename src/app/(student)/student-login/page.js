import Image from "next/image";
import Link from "next/link";
import img from "@/Assets/signin-student.png";
import LoginForm from "./LoginForm";
export default function Page() {
  return (
    <div className="flex flex-col-reverse items-center justify-center h-screen p-4 lg:flex-row lg:flex-nowrap ">
      <Image src={img} alt="Image 1" className="lg:w-2/5" />
      <div className="lg:w-[40%] w-full p-8 h-fit border text-center bg-white rounded-2xl">
        <h2 className="text-2xl font-bold">السلام عليكم</h2>
        <p className="mb-8 text-lg font-semibold">
          يمكنك تسجيل حساب جديد عن طريق ملء بياناتك هنا
        </p>
        <LoginForm />
        <p className="mt-2">
          ليس لديك حساب؟{" "}
          <Link
            href={"/student-register"}
            className="transition-all duration-300 border-b-2 hover:border-lightBlue "
          >
            سجل حساب جديد
          </Link>
        </p>
      </div>
    </div>
  );
}
