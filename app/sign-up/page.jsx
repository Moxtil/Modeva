import React from "react";
import Image from "next/image";
import signupImg from "../assets/signup.png";
import SignupForm from "../components/SignupForm";
export default function page() {
  return (
    <main className="flex flex-col-reverse md:flex-row justify-between items-start gap-6 p-5 overflow-hidden ">
      <section className="w-full md:w-1/2 relative">
        <Image
          src={signupImg}
          alt="Login"
          width={500}
          height={400}
          className="w-full h-[730px] object-cover border-2 border-white shadow-sm shadow-[#888]"
        />
        <h2 className="text-3xl tracking-wider font-semibold absolute top-3 left-3 text-white "></h2>
      </section>
      <section className="w-full md:w-1/2  ">
        <SignupForm />
      </section>
    </main>
  );
}
