"use client";
import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { auth, db } from "../firebase/firebaseConfig";
import { MyCartItems } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { FaRegTrashAlt } from "react-icons/fa";
import PayButton from "../components/PayButton";
import Swal from "sweetalert2";
import EmptyCartAnimation from "../components/EmptyCartAnimation";
import addToCartImg from "../assets/undraw_empty-cart_574u.svg";
import LoadWrapper from "../context/HomeWrapper";
import RatingStars from "../components/RatingStars";
import { doc, getDoc } from "firebase/firestore";

export default function page() {
  const { items, loadItems, setUser, deleteItem, total, user } =
    useContext(MyCartItems);

  const [address, setAddress] = useState("");

  const checkAddress = async () => {
    const docRef = doc(db, "users", user?.email);
    const docSnap = await getDoc(docRef);

    {
      docSnap.data().address && setAddress(docSnap.data().address);
    }
  };
  useEffect(() => {
    if (user?.email) {
      checkAddress();
    }
  }, [user]);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) loadItems(user.email);
    });

    return () => unsub();
  }, []);

  return (
    <LoadWrapper>
      <main className="p-4">
        <h1 className="text-2xl text-[#222] px-6 flex items-center gap-2 -translate-y-4">
          <span>Cart</span> <FiShoppingBag size={20} />
        </h1>
        {items.length === 0 ? (
          <section className="overflow-x-hidden w-full flex justify-center">
            <EmptyCartAnimation />
            <div>
              <Image
                src={addToCartImg}
                alt="Empty-Cart"
                width={450}
                height={350}
                className="w-full max-w-[450px]"
              />
              <h3 className="text-xl font-semibold text-center my-4">
                Your Cart Is <span className="text-yellow-900">Empty!</span>
              </h3>
              <p>Must add items to the cart before you proceed to checkout.</p>
              <Link
                href={"/shopping"}
                className="flex items-center justify-center gap-2 bg-amber-900 px-5 py-2 text-white my-2 shadow-sm shadow-amber-800 text-lg"
              >
                Back to shopping <FiShoppingBag />
              </Link>
            </div>
          </section>
        ) : (
          <section className="flex justify-between flex-col md:flex-row">
            <div className="w-full md:w-2/3 -translate-y-2.5">
              {items.map((item, id) => {
                return (
                  <section key={id}>
                    <div className="shadow-md rounded-md hover:scale-[1.01] transition-all shadow-[#333] flex justify-between items-center gap-4 m-3  bg-[#ffffff] p-4">
                      <div className="flex gap-5">
                        <Link
                          href={`/shopping/${item.product.id}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.product?.images[0]}
                            alt={item.product.title}
                            width={116}
                            height={155}
                          />
                        </Link>
                        <div className="flex flex-col gap-4 p-2 items-start ">
                          <h3 className="text-[16px] text-[#777]">
                            {item.product?.brand}
                          </h3>
                          <h2 className="text-xl font-semibold">
                            {item.product.title}
                          </h2>
                          <h2 className="text-yellow-800 font-bold ">
                            ${item.product.price.toFixed(2)}
                          </h2>
                          {/* <h2 className="font-bold flex items-center gap-2">
                            <IoIosStar size={20} color="gold" />
                            <span>{item.product.rating}</span>
                          </h2> */}
                          <div className="flex items-center gap-1 text-[15px] text-yellow-400 font-semibold">
                            <RatingStars rating={item.product.rating} />
                            <h3>{`(${item.product.rating.toFixed(1)})`}</h3>
                          </div>
                        </div>
                      </div>
                      <FaRegTrashAlt
                        size={25}
                        cursor={"pointer"}
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              deleteItem(item.id);
                              // decreaseTotal(item.product.price);
                              Swal.fire({
                                title: "Deleted!",
                                text: "Item has been deleted.",
                                icon: "success",
                                timer: 800,
                                showConfirmButton: false,
                              });
                            }
                          });
                        }}
                      />
                    </div>
                  </section>
                );
              })}
            </div>
            <div className="flex flex-col gap-5 w-full md:w-1/3 border-2 border-yellow-800 shadow-xl rounded-lg p-4">
              <h1 className="text-2xl">SHOPPING INFO</h1>
              <p className="bg-[#EDE5E1] p-3">
                Hooray! You have promo code!{" "}
                <span className="underline text-[#8B4513] cursor-pointer">
                  Use promo code
                </span>
              </p>
              <div className="flex justify-between items-center p-2 font-[400] text-[#757575]">
                <h2>Shipping Fee : </h2>
                <p>$0.00</p>
              </div>
              <div className="flex justify-between items-center p-2">
                <h2 className="text-[17px] font-semibold text-[#8b4513]">
                  Shipping Address :
                </h2>
                <div className="text-[17px]">
                  {address === "" ? (
                    <div className="flex items-center gap-1">
                      <h2 className="text-red-500">Address Missing!</h2>
                      <Link className="underline" href={"/account/address"}>
                        Update Now
                      </Link>
                    </div>
                  ) : (
                    <p className="text-[14px]">{address.fullAddress}</p>
                  )}
                </div>
              </div>
              {address !== "" && (
                <div>
                  <Link
                    href={"/account/address"}
                    className="font-semibold text-[16px] ml-2 underline text-[#727272]"
                  >
                    Change My Address
                  </Link>
                </div>
              )}
              <div className="flex justify-between items-center p-2 font-semibold">
                <h2 className="text-lg font-bold text-[#8b4513]">Total : </h2>
                <p className="text-lg font-bold text-[#8b4513]">
                  ${total.toFixed(2)}
                </p>
              </div>

              <PayButton />
            </div>
          </section>
        )}
      </main>
    </LoadWrapper>
  );
}
