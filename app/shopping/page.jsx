"use client";
import React, { Suspense, useEffect, useState } from "react";
import ShoppingCard from "../components/ShoppingCard";
import LoadWrapper from "../context/HomeWrapper";

export default function page() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [fetchUrl, setFetchUrl] = useState(
    `https://dummyjson.com/products?limit=0`
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ brand: "", category: "" });
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"

  const loadItems = () => {
    setFetchUrl(`https://dummyjson.com/products?limit=0`);
  };

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const req = await fetch(fetchUrl);
      const result = await req.json();
      setData(result.products);
      setLoader(false);
    };
    getData();
  }, []);

  // Apply search & filters
  const filteredData = data
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => (filters.brand ? item.brand === filters.brand : true))
    .filter((item) =>
      filters.category ? item.category === filters.category : true
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  const uniqueBrands = [...new Set(data.map((item) => item.brand))];
  const uniqueCategories = [...new Set(data.map((item) => item.category))];

  return (
    <LoadWrapper loading={loader}>
      <main className="p-4">
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="border-2 border-[#8B4513] p-2 rounded-md outline-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="border-2 border-[#8B4513] p-2 rounded-md outline-0"
            value={filters.brand}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, brand: e.target.value }))
            }
          >
            <option value="">All Brands</option>
            {uniqueBrands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          <select
            className="border-2 border-[#8B4513] p-2 rounded-md outline-0"
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            className="border-2 border-[#8B4513] p-2 rounded-md outline-0"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by price</option>
            <option value="asc">Price: Low → High</option>
            <option value="desc">Price: High → Low</option>
          </select>
        </section>

        {/* Products */}
        <section
          className="grid md:grid-cols-4 lg:grid-cols-5 grid-cols-2 gap-4 w-full my-4"
          data-aos="fade-up"
        >
          <Suspense fallback={<div className="loader"></div>}>
            {filteredData?.map((item) => (
              <ShoppingCard
                key={item.id}
                title={item?.title}
                price={item?.price.toFixed(2)}
                img={item?.images[0]}
                id={item.id}
                item={item}
                rate={item.rating}
                brand={item?.brand || "No Brand"}
                fadeUp={"fade-up"}
                stock={item.availabilityStatus}
                desc={item.description}
              />
            ))}
          </Suspense>
        </section>

        {/* <div className="w-full flex items-center justify-center my-4">
          {data.length > 0 && (
            <button
              className={`text-center bg-[#8B4513] text-white px-4 py-2 shadow-sm shadow-[#333] hover:scale-[1.05] transition-all duration-200  ${
                itemsCount >= 204 ? "hidden" : "cursor-pointer"
              }`}
              onClick={() => setItemsCount((prev) => prev + 10)}
            >
              Load More Products
            </button>
          )}
        </div> */}
      </main>
    </LoadWrapper>
  );
}
