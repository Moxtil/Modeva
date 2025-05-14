"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CiMenuBurger, CiMenuFries } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { FaHeart, FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import SearchField from "./Searchfield";
import { useAuth } from "../context/AuthContext";
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shopping", href: "/shopping" },
];
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const path = usePathname();

  return (
    <header className={`bg-transparent relative w-full max-w-full z-50`}>
      <div className=" mx-auto px-6 py-4 flex justify-between items-center w-full">
        <Link href={"/"} className={`text-2xl font-bold cursor-pointer`}>
          <span className="text-[#8B4513]">M</span>ODEVA
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-yellow-900 font-semibold text-lg transition tracking-widest ${
                path == link.href
                  ? "text-yellow-900 border-b-2 border-yellow-900"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className=" items-center gap-4 hidden md:flex">
          <Link href={"/cart"}>
            <FaShoppingCart size={20} />
          </Link>
          <Link href={"/wishlist"}>
            <FaHeart size={20} />
          </Link>
          <Link href={"/account"}>
            <FaUser size={20} />
          </Link>
          <button
            className="cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <FaSearch size={20} />
          </button>
          <SearchField
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
        {/* Mobile menu button */}
        <div className="flex items-center gap-6 md:hidden">
          <button
            className="cursor-pointer md:hidden"
            onClick={() => setIsModalOpen(true)}
          >
            <FaSearch size={20} />
          </button>
          <button
            className=" text-gray-700"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <CiMenuBurger color="#222" size={28} />
            ) : (
              <CiMenuFries color="#222" size={28} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-screen w-64 bg-[#222] border-r-2 text-white border-white shadow-lg z-40 flex flex-col items-start p-6 md:hidden"
          >
            <h2 className="text-2xl font-bold mb-6">Menu</h2>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`mb-4 text-lg hover:text-gray-400 transition tracking-widest ${
                  path == link.href
                    ? "text-gray-400 border-b-2 border-white"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-4">
              <Link href={"/cart"}>
                <FaShoppingCart size={20} />
              </Link>
              <Link href={"/wishlist"}>
                <FaHeart size={20} />
              </Link>
              <Link href={"/account"}>
                <FaUser size={20} />
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}
