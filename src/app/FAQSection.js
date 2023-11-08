import FAQ from "./FAQ";

function FAQSection() {
  return (
    <section className="p-4 pb-8 text-center">
      <h3 className="mb-2 text-3xl">قسم الأسئلة الشائعة</h3>
      <div className="flex flex-col gap-6 ">
        <FAQ title={"How will the website work?"}>
          <p className="text-lg text-right lg:w-1/2">
            {" "}
            As a teacher, you will be able to create a new exam, and once you
            are done, notifications will be sent to all the subscribed students
            so that they can take the exam. After the student completes the
            exam, a comprehensive report on their performance in the exam will
            be sent to both you and the student.
          </p>
        </FAQ>
        {/* <FAQ title={"هل أستطيع اعطاء نصائح للطلبة مباشرة بعد الامتحان؟"}>
          <p className="text-lg text-right lg:w-1/2">
            {" "}
            Certainly, our website offers you two ways to help your students.
            While designing the exam, you can provide an explanation for each
            question's answer. The student will see it after finishing the exam.
            After the student completes the exam, you can review their
            performance in the exam and send them feedback on the exam and what
            they should focus on.
          </p>
        </FAQ> */}
        <FAQ title={"Do you have a mobile app?"}>
          <p className="text-lg text-right lg:w-1/2">
            Although we don&apos;t have a mobile app, our website is
            specifically designed to be compatible with all mobile phones to
            ensure a smooth and problem-free experience.
          </p>{" "}
        </FAQ>
        <FAQ title={"Can the website handle a large number of students?"}>
          <p className="text-lg text-right lg:w-1/2">
            {" "}
            Absolutely, we designed this website to be able to handle a large
            number of students at the same time.
          </p>
        </FAQ>
      </div>
    </section>
  );
}

export default FAQSection;
