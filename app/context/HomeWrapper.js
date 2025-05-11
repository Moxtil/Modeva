"use client";
import React from "react";
import { motion } from "framer-motion";

export default function HomeWrapper({ children }) {
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
