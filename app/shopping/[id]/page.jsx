import AddButton from "@/app/components/AddButton";
import AddToFavButton from "@/app/components/AddToFavButton";
import ItemImages from "@/app/components/ItemImages";
import ShoppingCard from "@/app/components/ShoppingCard";
import Image from "next/image";
import React, { Suspense } from "react";
import { IoStarSharp } from "react-icons/io5";

const getData = async (id) => {
  const req = await fetch(`https://dummyjson.com/products/${id}`);
  const res = await req.json();
  return res;
};

const getSimilarItems = async (cate) => {
  const req = await fetch(`https://dummyjson.com/products/category/${cate}`);
  const res = await req.json();
  return res;
};

export default async function page({ params }) {
  const item = await getData(params.id);
  const fetchSimItems = await getSimilarItems(item.category);
  const similarItems = fetchSimItems.products;
  return (
    <main className="p-4 md:p-10  bg-[#ffffff] m-4">
      <Suspense fallback={<div className="loader"></div>}>
        <section className="w-full flex flex-col md:flex-row justify-around items-start gap-10 ">
          <ItemImages item={item} />
          <div className="w-full md:w-1/2 flex flex-col gap-6 items-start">
            <h3 className="text-sm text-[#727272]">{item?.brand}</h3>
            <h1 className="text-4xl font-bold">{item.title}</h1>
            <h1 className="text-sm font-semibold">{item?.category}</h1>

            <p className="text-sm text-[#727272]">{item.description}</p>
            <h2 className="text-[#727272]  ">Stock : {item?.stock}</h2>
            <h1
              className={`text-sm font-semibold ${
                item.availabilityStatus == "In Stock"
                  ? "text-green-500"
                  : "text-red-500 "
              }`}
            >
              {item?.availabilityStatus}
            </h1>
            <h1
              className={`text-sm font-semibold ${
                item.returnPolicy == "No return policy"
                  ? "text-red-500 "
                  : "text-green-500"
              }`}
            >
              {item?.returnPolicy}
            </h1>
            <h1 className="text-[16px] font-bold">
              {item?.warrantyInformation}
            </h1>
            <p className="text-xl font-bold text-[gold] flex items-center gap-1">
              <IoStarSharp color="gold" size={22} />
              <span> {item.rating}</span>
            </p>
            <h2 className="text-red-600 font-semibold ">${item.price}</h2>
            <AddButton item={item} />
            {/* <div></div> */}
          </div>
        </section>
      </Suspense>
      <h1 className="text-3xl text-center font-semibold my-3 text-[#757575]">
        Look for more
      </h1>
      <Suspense fallback={<div className="loader"></div>}>
        <section className="flex flex-wrap justify-center items-center gap-3 my-4 w-full">
          {similarItems?.map((item) => {
            return (
              <ShoppingCard
                key={item.id}
                title={item?.title}
                price={item?.price}
                img={item?.images[0]}
                id={item.id}
                item={item}
                rate={item.rating}
                brand={item?.brand || "No Brand"}
              />
            );
          })}
        </section>
      </Suspense>
    </main>
  );
}
