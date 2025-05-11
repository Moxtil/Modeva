import Image from "next/image";
import React from "react";

const ShopCardThree = ({ img, desc, rate, category, price }) => {
  return (
    <div className="grow-1 basis-[300px] max-w-[500px] h-full m-2 group p-2 bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#abd373] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0  [&_p]:transition-all hover:scale-[1.05]">
      <Image
        src={img}
        alt="Men's Clothing"
        width={300}
        height={200}
        className="w-full h-full object-cover"
      />
      <p className="p-1 font-semibold text-orange-300 tracking-wider text-xl">
        {category}
      </p>
      <p className="blueberry font-semibold text-gray-400 text-xs ">{desc}</p>
      <div className=" flex flex-row justify-between items-center w-full">
        <p className=" text-orange-300 font-semibold">${price}</p>
        <p className=" lg:inline-flex items-center gap-3  text-white bg-orange-300 shadow-[10px_10px_150px_#ff9f0d] py-2 px-4 text-sm font-semibold rounded-sm ">
          ★ {rate}
        </p>
      </div>
    </div>
  );
};

export default ShopCardThree;
