import React from "react";
import success from "../../../../../assets/check-circle.svg";
import Image from "next/image";
import Link from "next/link";
export default function page() {
  return (
    <main className="p-7">
      <header>
        <h1 className="text-4xl font-semibold text-center">
          <span className="text-[#8B4513]">M</span>ODEVA
        </h1>
      </header>
      <section className="my-16 w-full flex flex-col items-center justify-center gap-5 ">
        <Image src={success} alt="success" width={88} height={88} />
        <h1 className="text-4xl font-semibold">Payment Success!</h1>
        <p className="text-[#757575] text-sm max-w-full md:max-w-1/2">
          Lean back and relax, knowing our team is hard at work preparing and
          shipping your package swiftly. Feel free to browse our diverse product
          selection during this time – you might discover another item you'd
          like to add to your collection!
        </p>
        <Link
          href={"/"}
          className="bg-[#A0522D] text-white px-8 py-3 text-sm uppercase font-semibold hover:bg-[#8B4513] transition"
        >
          Go Back Home
        </Link>
      </section>
    </main>
  );
}
