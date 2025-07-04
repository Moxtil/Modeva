"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "./AuthContext";

export default function LoadWrapper({ children, loading }) {
  const { user } = useAuth();

  if (!user || loading) {
    return (
      <div className="text-black font-semibold text-4xl text-center my-[50px]">
        <span className="text-[#8B4513]">M</span>ODEVA
        {/* <br /> */}
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 1.0,
        ease: [0.33, 1, 0.68, 1], // smooth, custom bezier
      }}
    >
      {children}
    </motion.div>
  );
}
