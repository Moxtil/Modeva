"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import { MyCartItems } from "../context/CartContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";
import AddToFavButton from "../components/AddToFavButton";
import Image from "next/image";
import Link from "next/link";
import RatingStars from "../components/RatingStars";
import { FiShoppingBag } from "react-icons/fi";
import wishlistImg from "../assets/undraw_wishlist_0k5w.svg";
import LoadWrapper from "../context/HomeWrapper";

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
    if (user) loadFavorites(user);
  }, [favoriteItems, user]);

  const [swipeOffsets, setSwipeOffsets] = useState({});

  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);
  const touchItemId = useRef(null);

  const handleTouchStart = (e, id) => {
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = touchStartX.current;
    touchItemId.current = id;
  };

  const handleTouchMove = (e, id) => {
    if (touchItemId.current !== id) return;
    touchCurrentX.current = e.touches[0].clientX;
    let diff = touchCurrentX.current - touchStartX.current;
    if (diff < -100) diff = -100; // تحديد حد أقصى للسحب يسار
    if (diff > 100) diff = 100; // تحديد حد أقصى للسحب يمين

    setSwipeOffsets((prev) => ({
      ...prev,
      [id]: diff,
    }));
  };

  const handleTouchEnd = (id) => {
    if (!swipeOffsets[id]) return;

    // إذا سحب أكثر من 80px يمين أو يسار، نعتبرها حذف
    if (swipeOffsets[id] <= -80 || swipeOffsets[id] >= 80) {
      Swal.fire({
        title: "Are you sure to remove this item?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ca8a04",
        cancelButtonColor: "#999",
        confirmButtonText: "Yes, remove",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await toggleFavorite(
            user,
            favoriteItems.find((i) => i.id === id)
          );
          Swal.fire({
            title: "Removed!",
            icon: "success",
            timer: 700,
            showConfirmButton: false,
          });
          loadFavorites(user);
          setSwipeOffsets((prev) => {
            const copy = { ...prev };
            delete copy[id];
            return copy;
          });
        } else {
          setSwipeOffsets((prev) => ({
            ...prev,
            [id]: 0,
          }));
        }
      });
    } else {
      setSwipeOffsets((prev) => ({
        ...prev,
        [id]: 0,
      }));
    }
    touchItemId.current = null;
  };

  return (
    <LoadWrapper>
      <main className="px-4 py-6 max-w-7xl mx-auto">
        <header className="flex items-center gap-3 mb-6">
          <FiShoppingBag color="#ca8a04" size={30} />
          <h1 className="text-3xl font-extrabold text-yellow-900 select-none">
            Wishlist
          </h1>
        </header>

        {favoriteItems.length === 0 ? (
          <section className="flex flex-col items-center justify-center gap-6 py-20">
            <Image
              src={wishlistImg}
              alt="No Favorite Items"
              width={350}
              height={240}
              priority
            />
            <h2 className="text-xl text-yellow-800 font-semibold text-center">
              Looks like you haven't added anything to your wishlist yet!
            </h2>
            <Link
              href="/shopping"
              className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 transition text-white font-bold px-6 py-3 rounded-lg shadow-md shadow-yellow-400"
            >
              Go Shopping <FiShoppingBag size={22} />
            </Link>
          </section>
        ) : (
          <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {favoriteItems.map((item) => (
              <div
                key={item.id}
                className="relative bg-white rounded-xl shadow-md p-4 flex flex-col overflow-hidden cursor-pointer select-none transition-transform duration-200"
                style={{
                  transform: `translateX(${swipeOffsets[item.id] || 0}px)`,
                  boxShadow:
                    swipeOffsets[item.id] &&
                    Math.abs(swipeOffsets[item.id]) > 20
                      ? "0 8px 15px rgba(202, 138, 4, 0.4)"
                      : "",
                  touchAction: "pan-y",
                }}
                onTouchStart={(e) => handleTouchStart(e, item.id)}
                onTouchMove={(e) => handleTouchMove(e, item.id)}
                onTouchEnd={() => handleTouchEnd(item.id)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(user, item);
                    Swal.fire({
                      title: "Removed!",
                      text: "Item removed from your wishlist.",
                      icon: "success",
                      timer: 700,
                      showConfirmButton: false,
                    });
                    loadFavorites(user);
                  }}
                  className="absolute top-3 right-3 p-1 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors z-10"
                  aria-label="Remove from wishlist"
                  title="Remove from wishlist"
                >
                  <AddToFavButton item={item} size={28} />
                </button>

                <Link href={`/shopping/${item.id}`} className="block">
                  <Image
                    src={item?.images[0]}
                    alt={item.title}
                    width={280}
                    height={180}
                    className="w-full h-44 object-contain rounded-md mb-3"
                  />
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500 truncate max-w-[60%]">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1 text-yellow-500 font-semibold text-sm select-none">
                      <RatingStars rating={item.rating} />
                      <span className="hidden">{item.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 truncate mb-1">
                    {item.title}
                  </h3>
                  <p className="font-bold text-yellow-700 text-lg">
                    ${item.price.toFixed(2)}
                  </p>
                </Link>
              </div>
            ))}
          </section>
        )}
      </main>
    </LoadWrapper>
  );
}
