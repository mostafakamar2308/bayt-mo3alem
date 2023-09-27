import Image from "next/image";
import Content from "./Content";
import Hero from "./Hero";
import onlineTest from "@/Assets/Online test-rafiki.png";
import onlineTeacher from "@/Assets/exams.png";
import FAQ from "./FAQ";

export default async function Home() {
  return (
    <>
      <Hero />
      <hr className="text-gray-600 bg-gray-600 border-gray-600 "></hr>
      <section className="p-4 text-center">
        <h3 className="mb-2 text-3xl">كيف يفيدك بيت المعلم؟</h3>

        <div className="flex gap-4">
          <Content />
          <Image src={onlineTest} className="w-2/5" alt="اون لاين تيست" />
        </div>
      </section>
      <hr className="text-gray-600 bg-gray-600 border-gray-600 "></hr>
      <section className="p-4 text-center">
        <h3 className="mb-2 text-3xl">قسم الأسئلة الشائعة</h3>
        <div className="flex flex-col gap-6 ">
          <FAQ title={"كيف سيعمل الموقع؟"}>
            <h1>اهلا</h1>
          </FAQ>
          <FAQ title={"هل أستطيع اعطاء نصائح للطلبة مباشرة بعد الامتحان؟"}>
            <h1>اهلا</h1>
          </FAQ>
          <FAQ title={"هل لكم برنامج علي الموبايل؟"}>
            <h1>هل الموقع متوافق مع أجهزة الموبايل؟</h1>
          </FAQ>
          <FAQ title={"ما أسعار الاشتراك؟"}>
            <h1>اهلا</h1>
          </FAQ>
          <FAQ title={"هل تستطيع الخدمة تحمل عدد طلاب كبير؟"}>
            <h1>اهلا</h1>
          </FAQ>
        </div>
      </section>
      <hr className="text-gray-600 bg-gray-600 border-gray-600 "></hr>
      <section className="flex gap-4 p-4">
        <Image src={onlineTeacher} alt="مدرس" className="w-1/2" />
        <div className="w-2/5 p-2 mt-10 text-white rounded-md bg-purple h-3/4">
          <h3 className="text-2xl text-center">سجل وسنتواصل معك بإذن الله</h3>
          <form className="flex flex-col ">
            <p className="text-center">
              هل تريد الاشتراك في بيت المعلم؟ خيار عظيم
              <br></br>
              سجل اسمك ورقم هاتفك وسنتواصل معك حين اكتمال البرنامج بإذن الله
            </p>
            <div className="flex flex-col w-full gap-2 p-2 py-6 text-lg">
              <input
                placeholder="الاسم"
                className="p-2 bg-transparent border-b border-gray-500 outline-none"
              />
              <input
                placeholder="رقم الهاتف"
                className="p-2 bg-transparent border-b border-gray-500 outline-none"
              />
              <div className="flex items-center gap-4 bg-transparent">
                <label>المادة</label>
                <select className="bg-transparent border border-gray-500 rounded-md">
                  <option className="text-black">اللغة العربية</option>
                  <option className="text-black">اللغة الانجليزية</option>
                  <option className="text-black">اللغة الفرنسية</option>
                  <option className="text-black">اللغة الألمانية</option>
                  <option className="text-black">الجغرافيا</option>
                  <option className="text-black">التاريخ</option>
                  <option className="text-black">الرياضيات</option>
                  <option className="text-black">الكيمياء</option>
                  <option className="text-black">الأحياء</option>
                  <option className="text-black">الفيزياء</option>
                  <option className="text-black">الفلسفة</option>
                </select>
              </div>
            </div>
            <button className="px-3 py-2 text-2xl font-bold bg-white border rounded-md text-darkGray">
              سجل الان
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
