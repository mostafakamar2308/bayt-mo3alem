import Link from "next/link";
import RegisterationForm from "./RegisterationForm";
import Image from "next/image";
import register1 from "@/Assets/register1.png";

export default function RegisterTeacher() {
  return (
    <div className="flex flex-wrap items-center justify-center min-h-screen p-2 lg:flex-row ">
      <div className="lg:w-[40%] max-w-full p-8 border text-center bg-white rounded-2xl">
        <h2 className="text-2xl font-bold">السلام عليكم</h2>
        <p className="mb-2 text-lg font-semibold lg:mb-8">
          You can register by filling your account details
        </p>
        <RegisterationForm />
        <p className="mt-2">
          Have an account already?{" "}
          <Link
            href={"/teacher-login"}
            className="transition-all duration-300 border-b-2 hover:border-lightBlue "
          >
            Login Here{" "}
          </Link>
        </p>
      </div>
      <Image src={register1} alt="Image 1" />
    </div>
  );
}
