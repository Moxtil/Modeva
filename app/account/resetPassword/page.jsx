"use client";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useAuth } from "@/app/context/AuthContext";
import Swal from "sweetalert2";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
export default function ResetPasswordPage() {
  const { user } = useAuth();

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, user?.email);
      Swal.fire({
        title: "Done!",
        text: "Reset email sent! Check your inbox.",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (err) {
      Swal.fire({
        title: "Failed!",
        text: err?.message,
        icon: "error",
        showConfirmButton: true,
      });
    }
  };

  if (!user) {
    return <div className="loader"></div>;
  } else
    return (
      <main className="p-3 flex flex-col justify-center items-center">
        <form
          onSubmit={handleReset}
          className="max-w-[500px] bg-white dark:bg-zinc-900  rounded-2xl overflow-hidden border-4  dark:border-yellow-800 shadow-md shadow-yellow-700"
        >
          <div className="px-8 py-10 md:px-10">
            <h2 className="text-3xl font-extrabold text-center text-zinc-800 dark:text-white">
              Reset Password{" "}
            </h2>
            <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
              Secure your account with a new password.{" "}
            </p>
            <div className="mt-10">
              <div className="relative">
                <label
                  className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  placeholder={user?.email}
                  className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-yellow-700 0 focus:ring-opacity-50 focus:outline-none focus:ring "
                  name="email"
                  id="email"
                  type="email"
                  readOnly
                />
              </div>

              <div className="mt-10">
                <button
                  className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-lg hover:bg-yellow-500 cursor-pointer focus:outline-none focus:ring-4 focus:ring-yellow-500 dark:focus:ring-yellow-500"
                  type="submit"
                >
                  Send
                </button>
              </div>
              <div className="w-full flex items-center">
                <Link
                  href={"/account"}
                  className="text-white text-center my-3 w-full underline flex items-center gap-1"
                >
                  <IoMdArrowRoundBack size={20} />
                  <span> Get Back To Account's Info</span>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </main>
    );
}
