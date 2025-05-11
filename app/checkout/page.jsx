import React from "react";
import CheckoutForm from "../components/CheckoutForm";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLocalShipping } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { MdPayment } from "react-icons/md";

export default function page() {
  return (
    <main className="w-full min-h-screen p-6 ">
      <div className="bg-[#A0522D] px-4 py-3 text-white">
        <nav className="text-sm">
          <ol className="list-reset flex md:flex-row flex-col gap-2 items-center space-x-2">
            <li className="flex flex-col gap-1 items-center">
              <span
                href="/"
                className="text-white font-semibold flex items-center gap-1.5"
              >
                <FaRegUserCircle size={18} /> <span>Personal Info</span>
              </span>
              <span className="text-white text-sm"> STEP 1</span>
            </li>
            <li>
              <span className="mx-1">-</span>
            </li>
            <li className="flex flex-col gap-1 items-center">
              <span className="text-[#fefefe] opacity-75 flex items-center gap-1.5">
                <MdOutlineLocalShipping size={18} /> <span>Shipping</span>
              </span>
              <span className="text-[#a3a3a3] text-sm"> STEP 2</span>
            </li>
            <li>
              <span className="mx-1">-</span>
            </li>
            <li className="flex flex-col gap-1 items-center">
              <span className="text-[#fefefe] opacity-75 flex items-center gap-1.5">
                <MdPayment size={18} /> <span>Payment</span>
              </span>
              <span className="text-[#a3a3a3] text-sm"> STEP 3</span>
            </li>
            <li>
              <span className="mx-1">-</span>
            </li>
            <li className="flex flex-col gap-1 items-center">
              <span className="text-[#fefefe] opacity-75 flex items-center gap-1.5">
                <GiConfirmed size={18} /> <span>Confirmation</span>
              </span>
              <span className="text-[#a3a3a3] text-sm"> STEP 4</span>
            </li>
          </ol>
        </nav>
      </div>
      <CheckoutForm />
    </main>
  );
}
