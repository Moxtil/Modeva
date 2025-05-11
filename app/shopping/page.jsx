"use client";
import React, { useContext, useEffect, useState } from "react";
import ShoppingCard from "../components/ShoppingCard";
import { MyCartItems } from "../context/CartContext";
export default function page() {
  const { user } = useContext(MyCartItems);
  const [data, setData] = useState([]);
  const [itemsCount, setItemsCount] = useState(30);
  const [fetchUrl, setFetchUrl] = useState(
    `https://dummyjson.com/products?limit=${itemsCount}`
  );

  useEffect(() => {
    const getData = async () => {
      const req = await fetch(fetchUrl);
      const result = await req.json();
      setData(result.products);
      console.log(result);
    };
    getData();
  }, [itemsCount]);

  if (!user) {
    return <div className="loader"></div>;
  } else
    return (
      <main className="p-1">
        <section className="flex flex-wrap justify-center items-center gap-3 my-4">
          {data?.map((item) => {
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
        <div className="w-full flex items-center justify-center my-4">
          <button
            className={`text-center bg-[#8B4513] text-white px-4 py-2 shadow-sm shadow-[#333] hover:scale-[1.05] transition-all duration-200 ${
              itemsCount == 100 ? "hidden" : "cursor-pointer"
            }`}
            onClick={() => {
              if (itemsCount <= 90) {
                setItemsCount(itemsCount + 10);
              }
              setFetchUrl(`https://dummyjson.com/products?limit=${itemsCount}`);
            }}
          >
            Load More Products
          </button>
        </div>
      </main>
    );
}
