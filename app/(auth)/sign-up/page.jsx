import React from "react";
import Image from "next/image";
import SignupForm from "../../components/SignupForm";
export default function page() {
  return (
    <main className="min-h-screen flex md:flex-row justify-center items-center gap-6 p-5 overflow-hidden sign-up">
      <section className="w-full">
        <SignupForm />
      </section>
    </main>
  );
}
