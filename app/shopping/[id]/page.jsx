import AddButton from "@/app/components/AddButton";
import ItemImages from "@/app/components/ItemImages";
import RatingStars from "@/app/components/RatingStars";
import ReminderBtn from "@/app/components/ReminderBtn";
import ShoppingCard from "@/app/components/ShoppingCard";
import React, { Suspense } from "react";
import { Edu_QLD_Beginner } from "next/font/google";
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

const titleFont = Edu_QLD_Beginner({
  weight: ["600"],
  subsets: ["latin"],
});

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
            <h1 className="text-4xl font-bold text-yellow-800">{item.title}</h1>
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
            <h1 className="text-[16px] font-bold text-yellow-800">
              {item?.warrantyInformation}
            </h1>
            <div className="flex items-center gap-1 text-[15px] text-yellow-400 font-semibold">
              <RatingStars rating={item.rating} />
              <h3 className="translate-y-[1px] font-bold">{`(${item.rating.toFixed(
                1
              )})`}</h3>
            </div>
            <h2 className="text-red-600 font-semibold ">
              ${item.price.toFixed(2)}
            </h2>
            {item.availabilityStatus === "In Stock" ? (
              <AddButton item={item} />
            ) : (
              <ReminderBtn />
            )}
            {/* <div></div> */}
          </div>
        </section>
      </Suspense>
      <h1
        className={`${titleFont.className} text-3xl text-center font-semibold my-3 text-yellow-700`}
      >
        Keep exploring
      </h1>
      <Suspense fallback={<div className="loader"></div>}>
        <section className="grid md:grid-cols-4 lg:grid-cols-5 grid-cols-2 gap-4 w-full my-4">
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
                stock={item.availabilityStatus}
              />
            );
          })}
        </section>
      </Suspense>
    </main>
  );
}
