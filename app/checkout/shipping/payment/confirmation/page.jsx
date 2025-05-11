import Link from "next/link";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLocalShipping, MdPayment } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
export default function page() {
  function generateOrderCode(length = 12) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let orderCode = "";
    for (let i = 0; i < length; i++) {
      orderCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return orderCode;
  }

  const orderNumber = generateOrderCode();
  return (
    <main>
      <div className="bg-[#A0522D] px-4 py-3 text-white">
        <nav className="text-sm">
          <ol className="list-reset flex md:flex-row flex-col gap-2 items-center space-x-2">
            <Link href="/checkout" className="flex flex-col gap-1 items-center">
              <span className="text-white font-semibold flex items-center gap-1.5">
                <FaRegUserCircle size={18} /> <span>Personal Info</span>
              </span>
              <span className="text-white text-sm"> STEP 1</span>
            </Link>
            <li>
              <span className="mx-1">-</span>
            </li>
            <Link
              href={"/checkout/shipping"}
              className="flex flex-col gap-1 items-center"
            >
              <span className="text-white font-semibold flex items-center gap-1.5">
                <MdOutlineLocalShipping size={18} /> <span>Shipping</span>
              </span>
              <span className="text-white text-sm"> STEP 2</span>
            </Link>
            <li>
              <span className="mx-1">-</span>
            </li>
            <Link
              href={"/checkout/shipping/payment"}
              className="flex flex-col gap-1 items-center"
            >
              <span className="text-white font-semibold flex items-center gap-1.5">
                <MdPayment size={18} /> <span>Payment</span>
              </span>
              <span className="text-white text-sm"> STEP 3</span>
            </Link>
            <li>
              <span className="mx-1">-</span>
            </li>
            <li className="flex flex-col gap-1 items-center">
              <span className="text-white font-semibold flex items-center gap-1.5">
                <GiConfirmed size={18} /> <span>Confirmation</span>
              </span>
              <span className="text-white text-sm"> STEP 3</span>
            </li>
          </ol>
        </nav>
      </div>
      <section className="min-h-[500px] p-6">
        <div className="flex justify-between items-center gap-5">
          <div className="flex flex-col items-start gap-1">
            <p className="text-[#5d5c5c]">Order Number</p>
            <p>#{orderNumber}</p>
          </div>
          <p className="rounded-xl bg-green-400 text-sm px-6 py-2 text-white opacity-90 flex items-center gap-1">
            <GiConfirmed size={20} />
            <span> Payment Done</span>
          </p>
        </div>
        <div className="my-8 flex flex-col items-start gap-4 md:max-w-1/2">
          <h2 className="text-[#757575] text-lg font-semibold">
            Payment Information
          </h2>
          <p>
            Upon completing a purchase, you will receive a payment confirmation
            email. This email will contain essential information about the items
            you have purchased and the total amount that needs to be paid.
          </p>
        </div>
        <div className="flex justify-start mt-10">
          <Link
            href={"/checkout/shipping/payment/confirmation/success"}
            className="bg-[#A0522D] text-white px-8 py-3 text-sm uppercase font-semibold hover:bg-[#8B4513] transition"
          >
            I Already Paid
          </Link>
        </div>
      </section>
    </main>
  );
}
