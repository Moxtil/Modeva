"use client";
import Link from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";
import { MyCartItems } from "../context/CartContext";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const PayButton = () => {
  const router = useRouter();
  const { user } = useAuth();
  const checkAddress = async () => {
    const docRef = doc(db, "users", user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().address) {
      handleClick();
    } else {
      router.push("/account/address");
    }
  };
  const { total } = useContext(MyCartItems);

  const handleClick = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        items: [
          {
            price_data: {
              currency: "usd",
              product_data: { name: "Cart Total" },
              unit_amount: total * 100,
            },
            quantity: 1,
          },
        ],
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <StyledWrapper className="hover:text-white">
      <button
        onClick={() => checkAddress()}
        className="btn hover:text-white text-[10px] md:text-[15px]"
      >
        PROCEED TO CHECKOUT
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn {
    text-align: center;
    line-height: 1.7;
    letter-spacing: 2px;
    width: 100%;
    display: inline-block;
    padding: 0.6rem 1.8rem;
    font-weight: 700;
    border: 3px solid #8b4513;
    cursor: pointer;
    position: relative;
    background-color: transparent;
    text-decoration: none;
    overflow: hidden;
    z-index: 1;
    font-family: inherit;
  }

  .btn::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #8b4513;
    transform: translateX(-100%);
    transition: all 0.3s;
    z-index: -1;
  }

  .btn:hover::before {
    transform: translateX(0);
  }
`;

export default PayButton;
