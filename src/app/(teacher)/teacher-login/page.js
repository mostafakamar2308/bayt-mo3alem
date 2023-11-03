import Image from "next/image";
import LoginForm from "./LoginForm";
import register1 from "@/Assets/register1.png";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen ">
      <Image src={register1} alt="Image 1" />
      <div className="w-[40%] p-8 h-fit border text-center bg-white rounded-2xl">
        <h2 className="text-2xl font-bold">السلام عليكم</h2>
        <p className="mb-8 text-lg font-semibold">
          يمكنك تسجيل حساب جديد عن طريق ملء بياناتك هنا
        </p>
        <LoginForm />
        <p className="mt-2">
          ليس لديك حساب؟{" "}
          <Link
            href={"/teacher-register"}
            className="transition-all duration-300 border-b-2 hover:border-lightBlue "
          >
            سجل حساب جديد
          </Link>
        </p>
      </div>
    </div>
  );
}
