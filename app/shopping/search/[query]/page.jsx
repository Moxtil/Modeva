import ShoppingCard from "@/app/components/ShoppingCard";
import searchImg from "../../../assets/undraw_mobile-search_macy.svg";
import Image from "next/image";
import { Suspense } from "react";
const getData = async (query) => {
  const req = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  const res = await req.json();
  return res;
};
export default async function page({ params }) {
  const q = params.query;
  const res = await getData(q);
  const data = res.products;

  return (
    <main className="p-1 w-full">
      {data.length < 1 ? (
        <div className="w-full justify-center flex-col items-center gap-3 ">
          <Image
            src={searchImg}
            alt="No Items Available !"
            width={350}
            height={250}
            className="mx-auto max-w-[400px] -translate-x-5"
          />
          <div className="flex flex-col gap-3 p-2">
            <h2 className="text-lg text-center text-yellow-800">
              We couldn’t find anything matching your search.
            </h2>
          </div>
        </div>
      ) : (
        <Suspense fallback={<div className="loader"></div>}>
          <section className="grid md:grid-cols-4 lg:grid-cols-5 grid-cols-2 gap-4 w-full my-4">
            {data?.map((item) => {
              return (
                <ShoppingCard
                  key={item.id}
                  title={item?.title}
                  price={item?.price.toFixed(2)}
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
      )}
    </main>
  );
}
