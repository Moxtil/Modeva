import React from "react";
import LoginForm from "../../components/LoginForm";
export default function page() {
  return (
    <main className="h-screen flex md:flex-row justify-center items-center gap-6 p-5 overflow-hidden login">
      <section className="w-full">
        <LoginForm />
      </section>
    </main>
  );
}
