import Link from "next/link";
import tick from "@/Assets/tick.png";
import Image from "next/image";
function Hero() {
  return (
    <section className="flex flex-col h-[80vh] items-center justify-center gap-8 p-10 pb-20 mt-10 lg:mt-20">
      <h2 className="text-4xl font-bold text-center lg:text-5xl">
        Empower Your Inner English Teacher Superhero
      </h2>
      <p className="text-2xl font-bold">
        Create Exams for your students with no effort!
      </p>
      <div className="flex flex-col items-center gap-4">
        <ul className="flex flex-wrap justify-center gap-8 lg:text-lg">
          <li className="flex items-center gap-1 w-fit">
            <Image src={tick} alt="checkmark" width={28} height={28} />
            Free
          </li>
          <li className="flex items-center gap-1 w-fit">
            <Image src={tick} alt="checkmark" width={28} height={28} />
            Easy
          </li>
          <li className="flex items-center gap-1 w-fit">
            <Image src={tick} alt="checkmark" width={28} height={28} />
            Immediate
          </li>
        </ul>
        <Link
          href="/#register"
          className="p-4 mt-2 text-3xl font-semibold text-center text-white rounded-md shadow-md bg-purple"
        >
          Test your students now{" "}
        </Link>
      </div>
    </section>
  );
}

export default Hero;
