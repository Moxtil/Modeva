import Image from "next/image";
import React from "react";

const ShopCard = ({ img, category, title }) => {
  return (
    <div className="relative group grow basis-[300px] max-w-[500px] cursor-pointer overflow-hidden duration-500 w-64 max-h-80 bg-[#f6f3e5] text-gray-50 p-2">
      <div className="max-h-96">
        <Image
          src={img}
          alt="Shop-Now"
          width={300}
          height={200}
          className="object-cover object-top w-full h-[300px]"
        />
        <div className="group-hover:scale-110 w-full h-60  duration-500" />
        <div className="absolute w-full left-0 p-5 -bottom-16 duration-500  group-hover:-translate-y-12">
          <div className="absolute -z-10 left-0 w-full h-28 opacity-0 duration-500 bg-[#f6f3e5] group-hover:opacity-100 group-hover:bg-[#f6f3e5]" />
          <span className="text-lg font-bold text-[#222]">{category}</span>
          <p className="group-hover:opacity-100 w-56 duration-500 opacity-0 text-[#222]">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
