import Image from "next/image";
import Content from "./Content";
import Hero from "./Hero";
import onlineTest from "@/Assets/Online test-rafiki.png";
import Nav from "@/Components/Nav";
import FAQSection from "./FAQSection";
import Footer from "@/Components/Footer";

export default async function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <hr className="text-gray-600 bg-gray-600 border-gray-600 "></hr>
      <section className="p-4 text-center">
        <h3 className="mb-2 text-3xl">How it works?</h3>

        <div className="flex flex-wrap gap-4 lg:flex-nowrap">
          <Content />
          <Image src={onlineTest} className="lg:w-2/5" alt="اون لاين تيست" />
        </div>
      </section>
      <hr className="text-gray-600 bg-gray-600 border-gray-600 "></hr>
      <FAQSection />
      <hr className="text-gray-600 bg-gray-600 border-gray-600 "></hr>

      <Footer />
    </>
  );
}
