"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Link from "next/link";
import { MyCartItems } from "../context/CartContext";
import Swal from "sweetalert2";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import AddToFavButton from "./AddToFavButton";
import RatingStars from "./RatingStars";
import { FiShoppingCart } from "react-icons/fi";

const ShoppingCard = ({
  id,
  title,
  price,
  img,
  item,
  rate,
  brand,
  fadeUp,
  stock,
}) => {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const { addMyItem, user } = useContext(MyCartItems);

  const loadFavorites = async (user) => {
    if (!user) return;

    const favRef = collection(db, "users", user.email, "favorite-items");
    const snapshot = await getDocs(favRef);

    const ids = snapshot.docs.map((doc) => doc.data().product.id);
    setFavoriteIds(ids);
  };

  useEffect(() => {
    if (user) {
      loadFavorites(user);
    }
  }, [user]);

  return (
    <StyledWrapper data-aos={fadeUp}>
      <div
        className={`shop-card shadow-md shadow-[#777] bg-[#ffffff] card relative grow  w-[175px] basis-[200px]  flex flex-col justify-between md:basis-[300px] md:w-[275px] ${
          stock === "Out of Stock"
            ? "opacity-60 border-2 border-red-600"
            : "opacity-100"
        } `}
      >
        <div
          className={`hidden sm:block absolute w-auto p-1 -translate-y-0.5 text-center ${
            stock === "Out of Stock" ? "bg-red-500" : "bg-green-500"
          } font-semibold text-sm text-white top-[16px] rounded-sm right-1`}
        >
          {stock === "Out of Stock" ? "Out Of Stock !" : "Available Now"}
        </div>
        <AddToFavButton item={item} />
        <Image
          src={img}
          alt={title}
          width={300}
          height={200}
          className="card-img object-contain"
        />
        <div className="card-info">
          <p className="text-title text-[13px] truncate overflow whitespace-nowrap">
            {title}
          </p>
          <p className="text-body text-xs text-[#727272]">{brand}</p>
          <div className="text-title flex justify-between items-start flex-col gap-3 overflow-hidden">
            <span>${price}</span>
            <div className="flex items-center gap-1 flex-wrap sm:flex-nowrap">
              <RatingStars rating={rate} />
              <span className="text-yellow-400"> {rate}</span>
            </div>
          </div>
        </div>
        <div className="card-footer">
          {stock === "Out of Stock" ? (
            <button></button>
          ) : (
            <div
              className="card-button"
              onClick={() => {
                addMyItem(item);
                Swal.fire({
                  title: "Nice!",
                  text: "Item add to your cart!",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1200,
                });
              }}
            >
              <FiShoppingCart size={17} className="p-[2px] addBtn" />
            </div>
          )}

          <Link href={`/shopping/${id}`}>
            <button className="group flex text-sm mx-1 h-7 px-4 flex-col items-center justify-center rounded-full bg-[#F1ddcf]  py-[0.5em] shadow-[inset_0px_2px_4px_0px_#f9f1eb,inset_0px_-2px_4px_0px_#e8c8b0,0px_-2px_16px_0px_#e8c8b0,0px_2px_16px_0px_#f9f1eb] duration-200 hover:translate-y-[5%] active:translate-y-[7%] active:shadow-[inset_0px_-2px_4px_0px_#f9f1eb,inset_0px_2px_4px_0px_#e8c8b0,0px_2px_16px_0px_#e8c8b0,0px_2px_16px_0px_#f9f1eb]">
              <p className="font-nunito text-[14px] cursor-pointer font-semibold text-[#d19466] duration-200 group-active:translate-y-[5%]">
                Details
              </p>
            </button>
          </Link>
        </div>
      </div>
    </StyledWrapper>
  );
};

//  min-width: 150px;
//    height: 450px;
const StyledWrapper = styled.div`
  .card {
    width: 100%;
    height: 100%;
    padding: 8px;
    position: relative;
    overflow: visible;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  .card-img {
    height: 55%;
    width: 100%;
    border-radius: 0.5rem;
    transition: 0.3s ease;
  }

  .card-info {
    padding-top: 10%;
  }

  .addBtn {
    width: 20px;
    height: 20px;
  }

  .card-footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    border-top: 1px solid #ddd;
  }

  /*Text*/
  .text-title {
    font-weight: 900;
    line-height: 1.5;
  }

  .text-body {
    font-size: 0.9em;
    padding-bottom: 10px;
  }

  /*Button*/
  .card-button {
    border: 1px solid #252525;
    display: flex;
    padding: 0.3em;
    cursor: pointer;
    border-radius: 50px;
    transition: 0.3s ease-in-out;
  }

  /*Hover*/
  .card-img:hover {
    box-shadow: rgba(226, 196, 63, 0.25) 0px 13px 47px -5px,
      rgba(180, 71, 71, 0.3) 0px 8px 16px -8px;
  }

  .card-button:hover {
    border: 1px solid #ffcaa6;
    background-color: #ffcaa6;
  }
`;

export default ShoppingCard;
