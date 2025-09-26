import { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-hot-toast";

import arr from "../assets/img/arrow.png"

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_i961qhu",
        "template_6f6mjoc",
        form,
        "PLtLjdGCG2kVPncCg"
      )
      .then(
        () => {
          toast.success("წარმატებით გაიგზავნა!");
          setForm({ name: "", email: "", subject: "", message: "", phone: "" });
        },
        (error) => {
          toast.error("შეცდომა მოხდა, სცადეთ თავიდან.");
          console.error(error);
        }
      );
  };

  return (
    <section className="bg-[#111] py-16 px-4 lg:px-0">
      <div className="max-w-[1000px] mx-auto text-[#DFD0B8]">
        <h1 className="text-center text-4xl lg:text-5xl font-pantonmtav3 mb-4">მოგვწერეთ</h1>
        <p className="text-center text-[#fff8ed] mb-12">
          თუ რამე კითხვა გაქვთ ან გაინტრესებთ კონკრეტულ თემას, მოგვწერეთ.
        </p>

        <div className="max-w-[90%] m-auto py-8 lg:max-w-[1000px] flex flex-col lg:flex-row gap-12 lg:gap-6">
          {/* Left Text Section */}
          <div className="flex-1 space-y-12 pb-12 border-b-[1px] lg:pr-6 lg:border-r-[1px] lg:pb-0 lg:border-b-0 border-[#8080808a]">
            <h3 className="text-xl lg:text-2xl underline font-pantonmtav3 decoration-[#a43737] underline-offset-4">
              ჩვენ მუდმივად ვდგავართ გამოწვევბის წინაშე და ვცდილობთ განვითარდეთ
            </h3>

            <div className="space-y-2">
              <h4 className="text-[#a43737] text-2xl font-pantonmtav3">საკონტაქტო</h4>
              <div className="flex flex-col gap-1 text-[#bdbdbd] text-lg">
                <a href="tel:+995555124578">+995 555 12 45 78</a>
                <a href="mailto:example@gmail.com">example@gmail.com</a>
              </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-[#a43737] text-2xl font-pantonmtav3">სოციალური ქსელები</h4>
                <div className="grid grid-cols-2 gap-6">
                    {["Github", "LinkedIn", "Facebook", "Instagram"].map((social) => (
                    <a
                        href="#"
                        key={social}
                        className="relative group flex justify-between items-center text-[#bdbdbd] border-b border-[#333] pb-1"
                    >
                        {social} 
                        <i className="fa-solid fa-arrow-up-long rotate-45 text-[#a43737]"></i>
                        {/* underline */}
                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#a43737] transition-all duration-1000 group-hover:w-full"></span>
                    </a>
                    ))}
                </div>
            </div>

          </div>

          {/* Right Form Section */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 font-pantonmtav3">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="სახელი *"
                required
                className="bg-transparent border-b border-[#333] p-2 text-[#bdbdbd] focus:outline-none"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="ელ-ფოსტა *"
                required
                className="bg-transparent border-b border-[#333] p-2 text-[#bdbdbd] focus:outline-none"
              />
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="ტელეფონი"
                className="bg-transparent border-b border-[#333] p-2 text-[#bdbdbd] focus:outline-none"
              />
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="თემა *"
                required
                className="bg-transparent border-b border-[#333] p-2 text-[#bdbdbd] focus:outline-none"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="ტექსტი *"
                required
                rows="4"
                className="bg-transparent border-b border-[#333] p-2 text-[#bdbdbd] focus:outline-none"
              />
              <button
                type="submit"
                className="w-32 h-32 rounded-full bg-white text-[#333] flex items-center justify-center gap-2 font-medium hover:bg-[#a43737] hover:text-white transition"
              >
                გაგზავნა
                <img src={arr} alt="arr" className="w-4 rotate-180" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-[#333] pt-6 flex flex-col lg:flex-row items-center justify-between text-[#bdbdbd]">
        <div className="flex items-center gap-3 mb-4 lg:mb-0">
            <span className="text-lg font-semibold">ANRA Studio</span>
        </div>
        <p className="text-center lg:text-right text-sm">
            © {new Date().getFullYear()} ANRA Studio. ყველა უფლება დაცულია.
        </p>
        </div>

      </div>
    </section>
  );
}
