"use client";
import Image from "next/image";
import React from "react";
import {
  FaTag,
  FaPalette,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";

const ShopCardThree = ({ img, category, price, rating = 4.5 }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
    }

    while (stars.length < 5) {
      stars.push(
        <FaRegStar key={`empty-${stars.length}`} className="text-yellow-500" />
      );
    }

    return stars;
  };

  const colors = [
    { id: "color1", color: "#c7a17a", label: "Beige" },
    { id: "color2", color: "#a67c52", label: "Brown" },
    { id: "color3", color: "#7c584c", label: "Cocoa" },
    { id: "color4", color: "#e2c6ac", label: "Light Sand" },
    { id: "color5", color: "#bfa6a0", label: "Dusty Rose" },
  ];

  return (
    <div className="bg-[#fdf8f3] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 max-w-xs w-full mx-auto sm:max-w-sm">
      {/* Product Image */}
      <div className="relative w-full h-64 sm:h-72">
        <Image
          src={img}
          alt={category}
          fill
          className="object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5">
        {/* Category & Price */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-[#4b3832] flex items-center gap-2">
            <FaTag className="text-[#a67c52]" />
            {category}
          </h3>
          <p className="text-lg sm:text-xl font-bold text-[#a67c52]">
            ${price}
          </p>
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-1 text-sm mb-3">
          {renderStars()}
          <span className="ml-1 text-[#8b6b5c]">({rating})</span>
        </div>

        {/* Colors */}
        <div>
          <p className="text-sm text-[#8b6b5c] mb-2 flex items-center gap-1">
            <FaPalette className="text-[#c7a17a]" />
            Available Colors
          </p>
          <div className="flex flex-wrap gap-2">
            {colors.map(({ id, color, label }) => (
              <label
                key={id}
                htmlFor={id}
                title={label}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full ring-1 ring-gray-300 border border-white cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color, display: "inline-block" }}
              >
                <input type="radio" name="color" id={id} className="sr-only" />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCardThree;
