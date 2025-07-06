"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, deleteUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import {
  MdDriveFolderUpload,
  MdErrorOutline,
  MdOutlineEmail,
  MdOutlineVerifiedUser,
  MdLogin,
  MdOutlineLockReset,
} from "react-icons/md";

import {
  FaTrash,
  FaUserCircle,
  FaAddressCard,
  FaUserFriends,
} from "react-icons/fa";

import LogoutButton from "../components/LogoutButton";
import LoadWrapper from "../context/HomeWrapper";
import { IoMdLogOut } from "react-icons/io";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [confirmEmail, setConfirmEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "users", currentUser.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setAddress(docSnap.data().address || null);
      } else {
        setUser(null);
        setAddress(null);
      }
    });
    return unsubscribe;
  }, []);

  async function showEmailConfirmPopup() {
    const { value: inputEmail } = await Swal.fire({
      title: "Confirm Your Email",
      input: "email",
      inputLabel: "Please type your email to confirm deletion",
      inputPlaceholder: "Enter your email",
      inputValue: user?.email || "",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#b45309", // yellow-700 dark
    });

    if (inputEmail === user?.email) {
      setConfirmEmail(inputEmail);
      return true;
    } else {
      Swal.fire({
        icon: "error",
        title: "Email mismatch",
        text: "The email you entered does not match your account email.",
      });
      return false;
    }
  }

  async function handleDeleteAccount() {
    try {
      if (!user) return;
      await deleteUser(user);

      Swal.fire({
        icon: "success",
        title: "Account deleted",
        text: "Your account has been successfully deleted.",
      });

      router.push("/");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/requires-recent-login") {
        Swal.fire({
          icon: "warning",
          title: "Re-authentication Required",
          text: "Please sign out and sign in again before deleting your account.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Failed to delete account.",
        });
      }
    }
  }

  if (!user)
    return (
      <LoadWrapper>
        <p className="text-center p-6">Loading user data...</p>
      </LoadWrapper>
    );

  return (
    <LoadWrapper>
      <main className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
        {/* HEADER */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b border-yellow-800 pb-6">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-yellow-800 shadow-md cursor-pointer hover:opacity-90 transition-opacity duration-300">
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt="User profile picture"
                fill
                className="object-cover"
              />
            ) : (
              <FaUserCircle className="text-yellow-700 w-full h-full" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-yellow-900">
              {user.displayName || "User"}
            </h1>
            <p className="text-yellow-800 mt-1">{user.email}</p>
            <p className="mt-2 text-sm text-yellow-700">
              Member since:{" "}
              <time
                dateTime={new Date(user.metadata.creationTime).toISOString()}
              >
                {new Date(user.metadata.creationTime).toLocaleDateString()}
              </time>
            </p>
            <p className="text-sm text-yellow-700">
              Last sign in:{" "}
              <time
                dateTime={new Date(user.metadata.lastSignInTime).toISOString()}
              >
                {new Date(user.metadata.lastSignInTime).toLocaleString()}
              </time>
            </p>
          </div>
        </section>

        {/* INFO CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Email Verification */}
          <div className="flex items-center gap-4 p-5 border border-yellow-700 rounded-lg shadow-sm bg-yellow-100">
            {user.emailVerified ? (
              <MdOutlineVerifiedUser className="text-green-600 w-10 h-10" />
            ) : (
              <MdErrorOutline className="text-yellow-700 w-10 h-10" />
            )}
            <div>
              <h2 className="font-semibold text-yellow-900">
                Email Verification
              </h2>
              <p className="text-yellow-800">
                Your email is{" "}
                {user.emailVerified ? "verified " : "not verified "}
              </p>
              {!user.emailVerified && (
                <button
                  className="mt-2 text-yellow-800 underline hover:text-yellow-900 cursor-pointer"
                  onClick={() => router.push("/account/verifyEmail")}
                >
                  Verify Email Now
                </button>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-4 p-5 border border-yellow-700 rounded-lg shadow-sm bg-yellow-100">
            <FaAddressCard className="text-yellow-700 w-10 h-10" />
            <div className="flex-1">
              <h2 className="font-semibold text-yellow-900">Address</h2>
              {address ? (
                <p className="text-yellow-800">
                  {address.street}, {address.city}, {address.country}{" "}
                  {address.zip}
                </p>
              ) : (
                <p className="text-yellow-600 italic">No address available</p>
              )}
              <button
                onClick={() => router.push("/account/address")}
                className="mt-2 text-yellow-800 underline hover:text-yellow-900 cursor-pointer"
              >
                Edit Address
              </button>
            </div>
          </div>

          {/* Password */}
          <div className="flex items-center gap-4 p-5 border border-yellow-700 rounded-lg shadow-sm bg-yellow-100">
            <MdOutlineLockReset className="text-yellow-700 w-10 h-10" />
            <div>
              <h2 className="font-semibold text-yellow-900">Password</h2>
              <p className="text-yellow-800">********</p>
              <button
                onClick={() => router.push("/account/resetPassword")}
                className="mt-2 text-yellow-800 underline hover:text-yellow-900 cursor-pointer"
              >
                Reset Password
              </button>
            </div>
          </div>

          {/* Account Actions */}
          <div className="flex flex-col justify-center gap-4 p-5 border border-yellow-700 rounded-lg shadow-sm bg-red-50">
            <button
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3085d6",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleDeleteAccount();
                  }
                });
              }}
              className="w-full cursor-pointer bg-yellow-800 hover:bg-yellow-900 text-white font-semibold py-2 rounded-md transition"
            >
              <FaTrash className="inline mr-2" /> Delete Account
            </button>

            <button
              onClick={async () => {
                const result = await Swal.fire({
                  title: "Log out?",
                  text: "You will need to log in again to access your account.",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonText: "Log Out",
                  cancelButtonText: "Cancel",
                });
                if (result.isConfirmed) {
                  await auth.signOut();
                  router.push("/login");
                }
              }}
              className="w-full cursor-pointer bg-yellow-800 hover:bg-yellow-900 text-white font-semibold py-2 rounded-md transition flex items-center gap-1 justify-center"
            >
              <IoMdLogOut size={20} />
              Log Out
            </button>
          </div>
        </section>
      </main>
    </LoadWrapper>
  );
}
