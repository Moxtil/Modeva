"use client";
import Link from "next/link";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match",
        showConfirmButton: true,
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Set display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Signed Up Successfully",
        showConfirmButton: false,
        timer: 1000,
      });
      router.push("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Signing Up Failed: " + error.message,
        showConfirmButton: true,
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      className=" md:max-w-1/2 lg:max-w-[45%]  shadow-2xl  overflow-hidden border-4 bg-black border-[#eeeeeea1] rounded-md"
    >
      <div className="px-8 py-8 md:px-10">
        <h2 className="text-4xl font-extrabold text-center text-white">
          Welcome!
        </h2>
        <p className="text-center text-zinc-600 mt-3">
          Join us—your journey starts here.{" "}
        </p>
        <div className="mt-10">
          <div className="relative my-4">
            <label
              className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
              htmlFor="email"
            >
              Username
            </label>
            <input
              placeholder="Username"
              className="block w-full px-4 py-3 mt-2 border-2 rounded-lg border-[#333] bg-zinc-800 focus:border-gray-300 focus:ring-opacity-50 focus:outline-none focus:ring text-white"
              name="name"
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <label
              className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
              htmlFor="email"
            >
              Email
            </label>
            <input
              placeholder="you@example.com"
              className="block w-full px-4 py-3 mt-2 border-2 rounded-lg border-[#333] bg-zinc-800 focus:border-gray-300 focus:ring-opacity-50 focus:outline-none focus:ring text-white"
              name="email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-6">
            <label
              className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
              htmlFor="password"
            >
              Password
            </label>
            <input
              minLength={8}
              maxLength={16}
              placeholder="••••••••"
              className="block w-full px-4 py-3 mt-2 border-2 rounded-lg border-[#333] bg-zinc-800 focus:border-gray-300 focus:ring-opacity-50 focus:outline-none focus:ring text-white"
              name="password"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-6">
            <label
              className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              minLength={8}
              maxLength={16}
              placeholder="••••••••"
              className="block w-full px-4 py-3 mt-2 border-2 rounded-lg border-[#333] bg-zinc-800 focus:border-gray-300 focus:ring-opacity-50 focus:outline-none focus:ring text-white"
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="relative cursor-pointer w-full py-4 px-8 text-center font-barlow inline-flex justify-center text-base uppercase text-white rounded-lg border-solid transition-transform duration-300 ease-in-out group outline-offset-4  focus:outline-2 focus:outline-white focus:outline-offset-4 overflow-hidden"
            >
              <span className="relative z-20">Sign Up</span>
              <span className="absolute left-[-75%] top-0 h-full w-[50%] bg-white/20 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out" />
              <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0" />
              <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0" />
              <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0" />
              <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0" />
            </button>
          </div>
        </div>
      </div>
      <div className="px-8 py-4 bg-gray-100 dark:bg-zinc-800">
        <div className="text-sm text-blue-900 dark:text-blue-300 text-center">
          Already have an account?
          <Link className="font-medium underline mx-2" href="/login">
            Sign in
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
