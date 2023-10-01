import Link from "next/link";
import tick from "@/Assets/tick.png";
import Image from "next/image";
function Hero() {
  return (
    <section className="flex flex-col items-center gap-8 p-10 pb-20 mt-10 lg:mt-20">
      <h2 className="text-4xl font-bold text-center lg:text-5xl">
        بيتك الدافئ لإعداد الإمتحانات وتحليل بيانات طلابك
      </h2>
      <div className="flex flex-col items-center gap-4">
        <ul className="flex flex-wrap justify-center gap-8 lg:text-lg">
          <li className="flex items-center gap-1 w-fit">
            <Image src={tick} alt="checkmark" width={28} height={28} />
            مجاني
          </li>
          <li className="flex items-center gap-1 w-fit">
            <Image src={tick} alt="checkmark" width={28} height={28} />
            اصنع امتحانك في دقائق
          </li>
          <li className="flex items-center gap-1 w-fit">
            <Image src={tick} alt="checkmark" width={28} height={28} />
            اختبر طلابك في الحال
          </li>
        </ul>
        <Link
          href="/#register"
          className="w-2/3 p-4 mt-2 text-3xl font-semibold text-center text-white rounded-md shadow-md bg-accent"
        >
          سجل الان
        </Link>
      </div>
    </section>
  );
}

export default Hero;
