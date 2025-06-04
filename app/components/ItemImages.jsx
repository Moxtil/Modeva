"use client";
import React, { useState } from "react";
import AddToFavButton from "./AddToFavButton";
import Image from "next/image";

export default function ItemImages({ item }) {
  const [mainImg, setMainImg] = useState(item?.images[0]);
  return (
    <div className=" relative flex flex-col gap-10 justify-center items-center p-4 w-full md:w-1/2">
      <div className="absolute right-2  top-4  cursor-pointer bg-white">
        <AddToFavButton item={item} />
      </div>
      <div
        className={`hidden sm:block absolute w-auto p-1 -translate-y-0.5 text-center ${
          item.availabilityStatus === "Out of Stock"
            ? "bg-red-500"
            : "bg-green-500"
        } font-semibold text-sm text-white top-[16px] rounded-sm left-2`}
      >
        {item.availabilityStatus === "Out of Stock"
          ? "Out Of Stock !"
          : "Available Now"}
      </div>
      <Image
        src={mainImg}
        alt={item.title}
        width={500}
        height={575}
        className="w-full max-h-[500px]  object-contain max-w-[500px] "
        onClick={() => console.log(item.images)}
      />
      <div className="flex justify-start items-center flex-wrap gap-4">
        {item?.images?.map((im) => {
          return (
            <Image
              key={im}
              src={im}
              alt={item.title}
              width={125}
              height={50}
              className={`object-cover max-w-[125px] border-2 border-[#727272] opacity-80 p-2 ${
                im === mainImg
                  ? "opacity-100 border-2 border-[#222] rounded-sm shadow-sm shadow-[#333]"
                  : "opacity-60 cursor-pointer"
              }`}
              onClick={() => setMainImg(im)}
            />
          );
        })}
      </div>
    </div>
  );
}
