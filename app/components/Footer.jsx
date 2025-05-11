// components/Footer.tsx

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#8B4513] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Brand */}
        <div>
          <h2 className="text-3xl font-bold tracking-wide text-white">
            Modeva
          </h2>
          <p className="mt-3 text-sm text-[#fcebd5]">
            Timeless elegance in every detail. Inspired by nature’s warm tones.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#fbd6a0]">Shop</h3>
          <ul className="space-y-2 text-sm text-[#fcebd5]">
            <li>
              <Link href="/shopping">All Products</Link>
            </li>
            <li>
              <Link href="/">Collections</Link>
            </li>
            <li>
              <Link href="/">Sale</Link>
            </li>
            <li>
              <Link href="/">New Arrivals</Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#fbd6a0]">Company</h3>
          <ul className="space-y-2 text-sm text-[#fcebd5]">
            <li>
              <Link href="/">About Us</Link>
            </li>
            <li>
              <Link href="/">Contact</Link>
            </li>
            <li>
              <Link href="/">Blog</Link>
            </li>
            <li>
              <Link href="/">Careers</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#fbd6a0]">Connect</h3>
          <div className="flex space-x-4 text-2xl text-[#fcebd5]">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-white"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-white"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="mt-10 border-t border-[#a0522d] pt-6 text-center text-sm text-[#fcebd5]">
        &copy; {new Date().getFullYear()} Modeva. All rights reserved.
      </div>
    </footer>
  );
}
