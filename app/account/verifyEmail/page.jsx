"use client";
import React, { useState, useEffect } from "react";
import {
  getAuth,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/navigation"; // Use useRouter from Next.js
import Swal from "sweetalert2";

const EmailVerificationPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const auth = getAuth();
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserEmail(user.email);
        setIsEmailVerified(user.emailVerified);
      } else {
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);

  // Resend verification email
  const handleResendVerification = async () => {
    try {
      const user = auth.currentUser;
      if (user && !user.emailVerified) {
        await sendEmailVerification(user);

        Swal.fire({
          title: "Good job!",
          text: "Verification email has been resent! Please check your inbox.",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error resending verification email: " + error.message,
      });
    }
  };

  // Redirect user to account page after email verification
  const handleRedirect = () => {
    router.push("/account"); // Redirect back to the account page using Next.js router
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Email Verification
        </h2>

        {isLoggedIn ? (
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={userEmail}
                placeholder="Email"
                readOnly
                className="mt-1 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 "
              />
            </div>

            <div className="text-sm text-center">
              <p>
                Email Verification Status:
                {isEmailVerified ? "Verified" : "Not Verified"}
              </p>
            </div>

            {isEmailVerified ? (
              <div className="space-y-2 text-center">
                <p>
                  Your email is verified. You can now go back to your account.
                </p>
                <button
                  type="button"
                  onClick={handleRedirect}
                  className="w-full py-2 bg-[#8B4513] text-white rounded-md hover:bg-[#673d1f] cursor-pointer focus:outline-none focus:ring-2"
                >
                  Go to Account Page
                </button>
              </div>
            ) : (
              <div className="space-y-2 text-center">
                <p>Your email is not verified. Please verify your email.</p>
                <button
                  type="button"
                  onClick={handleResendVerification}
                  className="cursor-pointer w-full py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Resend Verification Email
                </button>
              </div>
            )}
          </form>
        ) : (
          <p className="text-center text-red-500">
            You need to be logged in to verify your email.
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationPage;
