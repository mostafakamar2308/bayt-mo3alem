import Image from "next/image";
import LoginForm from "./LoginForm";
import register1 from "@/Assets/register1.png";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-wrap items-center justify-center min-h-screen ">
      <div className="lg:w-[40%] max-w-full p-8 h-fit border text-center bg-white rounded-2xl">
        <h2 className="text-2xl font-bold">السلام عليكم</h2>
        <p className="mb-2 text-lg font-semibold lg:mb-8">
          Log In using your email and password
        </p>
        <LoginForm />
        <p className="mt-2">
          Don&apos;t have an account?{" "}
          <Link
            href={"/teacher-register"}
            className="transition-all duration-300 border-b-2 hover:border-lightBlue "
          >
            Register Now{" "}
          </Link>
        </p>
      </div>
      <Image src={register1} alt="Image 1" />
    </div>
  );
}
