import Image from "next/image";
import Content from "./Content";
import Hero from "./Hero";
import onlineTest from "@/Assets/Online test-rafiki.png";
import onlineTeacher from "@/Assets/exams.png";

import FAQSection from "./FAQSection";
import LeadRegisterationForm from "./LeadRegisterationForm";
import Footer from "@/Components/Footer";

export default async function Home() {
  return (
    <>
      <Hero />
      <hr className="text-gray-600 bg-gray-600 border-gray-600 "></hr>
      <section className="p-4 text-center">
        <h3 className="mb-2 text-3xl">كيف يفيدك بيت المعلم؟</h3>

        <div className="flex flex-wrap gap-4 lg:flex-nowrap">
          <Content />
          <Image src={onlineTest} className="lg:w-2/5" alt="اون لاين تيست" />
        </div>
      </section>
      <hr className="text-gray-600 bg-gray-600 border-gray-600 "></hr>
      <FAQSection />
      <hr className="text-gray-600 bg-gray-600 border-gray-600 "></hr>
      <section className="items-center gap-4 p-4 lg:flex">
        <Image src={onlineTeacher} alt="مدرس" className="lg:w-1/2" />
        <div className="p-4 mt-2 text-white rounded-md lg:mt-0 lg:w-2/5 bg-purple h-3/4">
          <h3 className="mb-2 text-2xl text-center">
            تريد أن تحسن من مستوي طلابك؟
          </h3>
          <p className="text-center">
            سجل اسمك ورقم هاتفك وسنتواصل معك حين اكتمال البرنامج بإذن الله.
          </p>
          <LeadRegisterationForm />
        </div>
      </section>
      <hr className="text-gray-600 bg-gray-600 border-gray-600 "></hr>
      <Footer />
    </>
  );
}
