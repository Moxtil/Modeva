import React from "react";

const Button = () => {
  return (
    <button className="cursor-pointer group relative rounded-[4px] ml-2 my-3 bg-yellow-500 hover:bg-yellow-700 text-black font-semibold text-sm px-6 py-3  transition-all duration-200 ease-in-out shadow hover:shadow-lg w-40 h-12">
      <div className="relative flex items-center justify-center gap-2">
        <span className="relative inline-block overflow-hidden">
          <span className="block transition-transform duration-300 group-hover:-translate-y-full">
            See More
          </span>
          <span className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
            Shop
          </span>
        </span>
        <svg
          className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45"
          viewBox="0 0 24 24"
        >
          <circle fill="currentColor" r={11} cy={12} cx={12} />
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth={2}
            stroke="white"
            d="M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5"
          />
        </svg>
      </div>
    </button>
  );
};

export default Button;
