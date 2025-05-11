import React from "react";
import LoginForm from "../components/LoginForm";
import Image from "next/image";
import loginImg from "../assets/login.png";
export default function page() {
  return (
    <main className="flex flex-col md:flex-row justify-between items-start gap-6 p-5 overflow-hidden ">
      <section className="w-full md:w-1/2  ">
        <LoginForm />
      </section>
      <section className="w-full md:w-1/2 relative">
        <Image
          src={loginImg}
          alt="Login"
          width={500}
          height={400}
          className="w-full h-[600px] object-cover border-2 border-white shadow-sm shadow-[#888]"
        />
      </section>
    </main>
  );
}
