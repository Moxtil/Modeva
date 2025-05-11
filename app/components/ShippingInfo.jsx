"use client";
import { useState } from "react";
import logo1 from "../assets/image 3.png";
import logo2 from "../assets/image 4.png";
import logo3 from "../assets/image 5.png";
import Image from "next/image";
import Link from "next/link";
export default function ShippingInfo() {
  const [selected, setSelected] = useState("jne");

  const services = [
    { id: "jne", name: "JNE", price: "IDR 39.000", logo: logo1 },
    { id: "tiki", name: "TIKI", price: "IDR 58.000", logo: logo2 },
    { id: "dhl", name: "DHL", price: "IDR 168.000", logo: logo3 },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans text-[#333]">
      <h2 className="text-2xl font-semibold text-[#222] mb-6">
        Shipping Delivery
      </h2>

      <div className="space-y-4">
        {services.map((service) => (
          <label
            key={service.id}
            className={`flex items-center justify-between p-4 border ${
              selected === service.id ? "border-[#A0522D]" : "border-gray-700"
            } cursor-pointer`}
          >
            <div className="flex items-center gap-4">
              <input
                type="radio"
                name="shipping"
                value={service.id}
                checked={selected === service.id}
                onChange={() => setSelected(service.id)}
                className="accent-[#A0522D]"
              />
              <Image
                src={service.logo}
                alt={service.name}
                className="w-14 h-auto"
              />
              <div>
                <div className="font-semibold">{service.name}</div>
                <div className="text-sm text-[#222]">{service.price}</div>
              </div>
            </div>
          </label>
        ))}
      </div>

      <div className="flex justify-end mt-10">
        <Link
          href={"/checkout/shipping/payment"}
          className="bg-[#A0522D] text-white px-6 py-3 text-sm uppercase font-semibold hover:bg-[#8B4513] transition"
        >
          Continue to Payment
        </Link>
      </div>
    </div>
  );
}
