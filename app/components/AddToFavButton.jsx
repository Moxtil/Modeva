"use client";
import React, { useContext, useEffect, useState } from "react";
import { MyCartItems } from "../context/CartContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseConfig";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function AddToFavButton({ item, size }) {
  const [favoriteIds, setFavoriteIds] = useState([item.id]);

  const { toggleFavorite, user } = useContext(MyCartItems);
  const loadFavorites = async (user) => {
    if (!user) return;

    const favRef = collection(db, "users", user.email, "favorite-items");
    const snapshot = await getDocs(favRef);

    const ids = snapshot.docs.map((doc) => doc.data().product.id);
    console.log(ids);

    setFavoriteIds(ids);
  };
  useEffect(() => {
    loadFavorites(user);
  }, [favoriteIds]);
  const isFavorite = favoriteIds.includes(item.id);
  return (
    <div
      onClick={async () => {
        await toggleFavorite(user, item);
        loadFavorites(user);
      }}
      className="rounded-full hover:bg-[#eee] p-2 w-fit transition-all duration-200"
    >
      {isFavorite ? (
        <FaHeart color="red" cursor={"pointer"} size={size || 30} />
      ) : (
        <FaRegHeart cursor={"pointer"} size={size || 30} />
      )}
    </div>
  );
}
