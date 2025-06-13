import Image from "next/image";
import React from "react";

const ShopCardThree = ({ img, category, price }) => {
  return (
    <div className="group block">
      <Image
        src={img}
        alt={category}
        width={300}
        height={200}
        className="h-[350px] w-full max-w-[350px] object-cover sm:h-[450px]"
      />

      <div className="mt-1.5">
        <p className="text-xs text-gray-500">Colors</p>

        <div className="mt-1.5 flex gap-1">
          <form>
            <fieldset>
              <legend className="sr-only">Color</legend>
            </fieldset>

            <div className="flex flex-wrap justify-center gap-1 [&:hover_label]:opacity-75">
              <div>
                <input type="checkbox" id="ColorSg" className="sr-only" />

                <label
                  htmlFor="ColorSg"
                  className="block size-4 cursor-pointer rounded-full bg-[#595759] transition hover:!opacity-100"
                >
                  <span className="sr-only"> Space Gray </span>
                </label>
              </div>

              <div>
                <input type="checkbox" id="ColorS" className="sr-only" />

                <label
                  htmlFor="ColorS"
                  className="block size-4 cursor-pointer rounded-full bg-[#d2d3d4] transition hover:!opacity-100"
                >
                  <span className="sr-only"> Silver </span>
                </label>
              </div>

              <div>
                <input type="checkbox" id="ColorP" className="sr-only" />

                <label
                  htmlFor="ColorP"
                  className="block size-4 cursor-pointer rounded-full bg-[#d89f97] transition hover:!opacity-100"
                >
                  <span className="sr-only"> Pink </span>
                </label>
              </div>

              <div>
                <input type="checkbox" id="ColorG" className="sr-only" />

                <label
                  htmlFor="ColorG"
                  className="block size-4 cursor-pointer rounded-full bg-[#afbfab] transition hover:!opacity-100"
                >
                  <span className="sr-only"> Pink </span>
                </label>
              </div>

              <div>
                <input type="checkbox" id="ColorSb" className="sr-only" />

                <label
                  htmlFor="ColorSb"
                  className="block size-4 cursor-pointer rounded-full bg-[#91a5bb] transition hover:!opacity-100"
                >
                  <span className="sr-only"> Pink </span>
                </label>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-3 flex justify-between text-sm">
          <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4">
            {category}
          </h3>

          <p className="text-gray-900 font-semibold">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default ShopCardThree;
