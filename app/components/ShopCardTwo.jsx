import Image from "next/image";
import React from "react";

const ShopCardTwo = ({ img, title, rate, desc }) => {
  return (
    <div className="shadow-xl  shadow-[#999] grow basis-[200px] product-card max-w-96 w-[400px] rounded-md overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group">
      <div className="para uppercase text-center leading-none z-40">
        <p
          style={{
            WebkitTextStroke: "1px rgb(207, 205, 205)",
            WebkitTextFillColor: "transparent",
          }}
          className="z-10 font-bold text-lg -mb-5 tracking-wider text-gray-500"
        >
          Limited{" "}
        </p>
        <p className="font-bold text-xl tracking-wider text-[#495c48] z-30">
          {title}
        </p>
      </div>
      <div className="w-[180px] aspect-square relative z-20 after:absolute after:h-1 after:w-full after:opacity-0 after:bg-[#7b956a] after:top-8 after:left-0 after:group-hover:opacity-100 after:translate-x-1/2 after:translate-y-1/2 after:-z-20 after:group-hover:w-full after:transition-all after:duration-300 after:group-hover:origin-right after:group-hover:-translate-x-1/2 group-hover:translate-x-1/2 transition-all duration-300">
        <Image
          src={img}
          alt="Women's Clothing"
          width={300}
          height={200}
          className="w-full object-cover"
        />
        <div className="tooltips absolute top-0 left-0 -translate-x-[150%] p-2 flex flex-col items-start gap-10 transition-all duration-300 group-hover:-translate-x-full">
          <p className="text-[#7b956a] font-semibold text-xl uppercase group-hover:delay-1000 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500">
            {desc}
          </p>
          <ul className="flex flex-col items-start gap-2">
            <li className="inline-flex gap-2 items-center justify-center group-hover:delay-200 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500">
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth={3}
                className="stroke-[#495c48]"
                stroke="#000000"
                fill="none"
                viewBox="0 0 24 24"
                height={10}
                width={10}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <p className="text-xs font-semibold text-[#495c48]">★{rate}</p>
            </li>
            <li className="inline-flex gap-2 items-center justify-center group-hover:delay-300 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500">
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth={3}
                className="stroke-[#495c48]"
                stroke="#000000"
                fill="none"
                viewBox="0 0 24 24"
                height={10}
                width={10}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <p className="text-xs font-semibold text-[#495c48]">
                ID : #0123456
              </p>
            </li>

            <li className="inline-flex gap-2 items-center justify-center group-hover:delay-500 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500">
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth={3}
                className="stroke-[#495c48]"
                stroke="#000000"
                fill="none"
                viewBox="0 0 24 24"
                height={10}
                width={10}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <p className="text-xs font-semibold text-[#495c48]">
                50% Discount
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShopCardTwo;
