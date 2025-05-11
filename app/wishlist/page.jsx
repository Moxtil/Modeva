"use client";
import React, { useContext, useEffect, useState } from "react";
import { MyCartItems } from "../context/CartContext";
import { IoHeartSharp } from "react-icons/io5";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";
import AddToFavButton from "../components/AddToFavButton";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import wishlistImg from "../assets/undraw_wishlist_0k5w.svg";
import PayButton from "../components/PayButton";
export default function page() {
  const { toggleFavorite, user } = useContext(MyCartItems);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const loadFavorites = async (user) => {
    if (!user) return;

    const favRef = collection(db, "users", user.email, "favorite-items");
    const snapshot = await getDocs(favRef);

    const items = snapshot.docs.map((doc) => doc.data().product);
    setFavoriteItems(items);
  };

  useEffect(() => {
    if (user) {
      loadFavorites(user);
    }
  }, [user]);
  if (!user) {
    return <div className="loader"></div>;
  } else
    return (
      <main onClick={() => console.log(favoriteItems)} className="px-2 py-2">
        <header>
          <h2 className="flex items-center gap-1 text-2xl">
            <IoHeartSharp color="red" />
            Wishlist
          </h2>
        </header>

        <section className="flex justify-center items-center p-2 my-5">
          {favoriteItems.length === 0 && (
            <div>
              <Image
                src={wishlistImg}
                alt="No Favorite Items"
                width={400}
                height={275}
              />
              <div className="flex flex-col gap-3 p-2">
                <h2 className="text-lg text-yellow-800">
                  Looks like you haven't added anything yet!
                </h2>
                <PayButton title={"Go Shopping"} link={`/shopping`} />
              </div>
            </div>
          )}
        </section>
        <section className="grid md:grid-cols-4 lg:grid-cols-5 grid-cols-2 gap-4 w-full my-4">
          {favoriteItems.map((item) => {
            return (
              <div
                className="fav-item overflow-hidden hover:scale-[1.05] transition-all duration-200
                 w-full relative bg-gray-50  p-3 flex flex-col gap-1 rounded-xl shadow-md shadow-[#333]"
                key={item.id}
              >
                <div
                  className="absolute  top-2 right-2 hover:bg-[#eee]  transition-all duration-300 rounded-full p-1"
                  onClick={async () => {
                    await toggleFavorite(user, item);
                    Swal.fire({
                      title: "Done!",
                      text: "Item Is Not On Your Favorite List!",
                      icon: "success",
                      timer: 750,
                      showConfirmButton: false,
                    });
                    loadFavorites(user);
                  }}
                >
                  <AddToFavButton item={item} size={25} />
                </div>
                <Link
                  href={`/shopping/${item.id}`}
                  className="flex justify-center items-center"
                >
                  <Image
                    src={item?.images[0]}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="h-48 object-contain"
                  />
                </Link>
                <div className="flex flex-col gap-3 p-1 justify-between ">
                  <div className="flex justify-between items-center gap-2 overflow-hidden">
                    <h2 className="text-sm font-semibold  truncate">
                      {item.title}
                    </h2>
                    <h2 className="text-yellow-400 flex items-center gap-1 font-semibold">
                      <FaStar size={17} color="gold" />
                      <span>{item.rating}</span>
                    </h2>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p className="text-[#757575] text-[12px]">
                      {item.category}
                    </p>
                    <h2 className="font-bold text-[16px]">${item.price}</h2>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </main>
    );
}
