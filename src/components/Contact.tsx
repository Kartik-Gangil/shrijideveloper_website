import { Language, translations } from "@/utils/translation";
import TestimonialCarousel from "./TestimonialCarousel";
import { useState } from "react";
import Notification from "./Notification";

interface ContactProps {
  language: Language;
  prefilledProject?: string;
  onClearPrefill?: () => void;
}
interface User {
  name: string;
  phone: string;
}

export default function Contact({ language }: ContactProps) {
  const t = translations[language].contact;

  const [data, setData] = useState<User>({
    name: "",
    phone: "",
  });
  const [status, setStatus] = useState({
    open: false,
    type: "success" as "success" | "error",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Form submitted with data:", data);
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      console.log("Response from server:", res);
      if (res.ok) {
        setStatus({
          open: true,
          type: "success",
          message:
            t.successDetailsStatus,
        });
        setData({ name: "", phone: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({
        open: true,
        type: "error",
        message:
          "We couldn't process your request. Please try again later.",
      });
    }
  };

  return (
    <section className="bg-[#f8f5f1] py-20 lg:py-32" id="contact">

      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT SECTION */}

          <div className="order-2 lg:order-1">

            <p className="text-[#474747] text-xl sm:text-2xl font-medium mb-12">
              {t.heading}
            </p>


            <TestimonialCarousel
              testimonials={t.testimonials}
            />

          </div>


          {/* FORM SECTION */}

          <div className="order-1 lg:order-2 flex justify-center">

            <div className="bg-white rounded-[32px] sm:rounded-[42px] shadow-xl p-8 sm:p-12 w-full max-w-[560px]">

              <h3 className="text-[#2E8B38] font-semibold text-3xl sm:text-4xl mb-10">

                {t.formTitle}

              </h3>


              <form className="space-y-7">

                <div>

                  <label className="font-medium text-[#4d4d4d]">

                    {t.labelName}

                  </label>

                  <input
                    placeholder={t.placeholderName}
                    className="w-full mt-3 p-5 rounded-2xl bg-[#F7F3EF] outline-none text-lg"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                  />

                </div>


                <div>

                  <label className="font-medium text-[#4d4d4d]">

                    {t.labelPhone}

                  </label>

                  <input
                    type="number"
                    placeholder={t.placeholderPhone}
                    className="w-full mt-3 p-5 rounded-2xl bg-[#F7F3EF] outline-none text-lg"
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                  />

                </div>


                {/* <div>

                  <label className="font-medium text-[#4d4d4d]">

                    {t.labelProject}

                  </label>

                  <select className="w-full mt-3 p-5 rounded-2xl bg-[#F7F3EF] outline-none text-lg">

                    <option>Select a Project</option>

                    <option>Project A</option>

                    <option>Project B</option>

                  </select>

                </div> */}


                <button className="w-full bg-[#008B2F] hover:bg-[#007326] py-5 rounded-2xl text-white text-lg font-semibold transition" onClick={handleSubmit}>

                  {t.submitBtn}

                </button>
                <Notification
                  isOpen={status.open}
                  type={status.type}
                  message={status.message}
                  onClose={() =>
                    setStatus((prev) => ({
                      ...prev,
                      open: false,
                    }))
                  }
                />
              </form>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}