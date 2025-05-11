"use client";
import accImg from "../assets/image.png";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { LuMessageSquareShare } from "react-icons/lu";

import {
  MdDriveFolderUpload,
  MdErrorOutline,
  MdLogin,
  MdOutlineEmail,
  MdOutlineLockReset,
  MdOutlineVerifiedUser,
} from "react-icons/md";
import {
  FaAddressCard,
  FaHashtag,
  FaLock,
  FaRegEdit,
  FaTrash,
  FaUserFriends,
} from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteUser, getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import LogoutButton from "../components/LogoutButton";
import { doc, getDoc } from "firebase/firestore";

export default function page() {
  const [address, setAddress] = useState("");
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        setUserEmail(user.email);

        // Get the user address from the collection using their email
        const docRef = doc(db, "users", user.email); // Reference to the document with the user's email in the "available" collection
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().address) {
          setAddress(docSnap.data().address); // Set the address state if it exists
        }
      }
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);
  const { user, logout } = useAuth();
  const [confirmEmail, setConfirmEmail] = useState("");
  const router = useRouter();

  const showInputPopup = async (user) => {
    const { value: inputValue } = await Swal.fire({
      title: "Enter Your Email To Confirm",
      text: "You Need To Write It , Do Not Copy It ",
      input: "text",
      inputPlaceholder: user,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      confirmButtonColor: "red",
      inputAttributes: {
        maxlength: 75,
        autocapitalize: "off",
        autocorrect: "off",
      },
    });

    if (inputValue == user) {
      setConfirmEmail(inputValue);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email Is Not Matching",
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No user is signed in.");
      }
      if (user.email === confirmEmail) {
        await deleteUser(user);
      }

      console.log("User account deleted.");
      // redirect to home or login
    } catch (error) {
      console.error("Error deleting user:", error);

      if (error.code === "auth/requires-recent-login") {
        alert("Please reauthenticate and try again.");
        // Optionally: show re-auth popup here
      }
    }
  };

  if (!user) {
    setTimeout(() => {
      return <div className="loader"></div>;
    }, 100);
  } else
    return (
      <main className="w-full p-4">
        <header className="w-full p-3 border-2 border-yellow-800 shadow-md shadow-[#333] flex items-center gap-5  flex-col md:flex-row">
          <div className="flex items-center gap-5 md:gap-0 mx-2 flex-col md:flex-row ">
            <Image
              onClick={() => console.log(user)}
              src={accImg}
              alt="user account"
              width={75}
              height={75}
            />
            <h2 className="text-lg font-semibold">{user?.displayName}</h2>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <button className="cursor-pointer px-12 py-1 rounded-sm bg-transparent border-2 border-[rgb(0,90,215)] shadow-md shadow-[rgb(0,90,215)] flex items-center gap-3 text-center text-[rgb(0,90,215)]">
              <MdDriveFolderUpload size={24} /> <span>Upload</span>
            </button>
            <button
              className={`cursor-pointer px-12 py-1 rounded-sm bg-transparent border-2 border-[#888] shadow-md  flex items-center gap-3 text-center  ${
                user?.photoURL
                  ? "opacity-100 shadow-[rgb(255,0,0)] border-[rgb(255,0,0)]"
                  : "opacity-75 pointer-events-none"
              } `}
            >
              <FaTrash size={19} color="#222" /> <span>Remove</span>
            </button>
          </div>
        </header>
        <section className="flex justify-between flex-col md:flex-row items-start gap-5 flex-wrap md:flex-nowrap  my-7">
          <div className="flex flex-col gap-8 items-start w-full">
            <h3 className="grow w-full flex items-center gap-1 bg-yellow-800 text-white shadow-md shadow-yellow-800 rounded-[3px] p-4 h-20">
              <FaHashtag /> <span>Username : {user?.displayName}</span>
            </h3>
            <h3 className="grow w-full flex items-center gap-1 bg-yellow-800 text-white shadow-md shadow-yellow-800 rounded-[3px] p-4 h-20">
              <MdOutlineEmail /> Email : {user?.email}
            </h3>
            <h3 className="grow w-full flex items-center justify-between gap-1 bg-yellow-800 text-white shadow-md shadow-yellow-800 rounded-[3px] p-4 h-20">
              <p className="flex items-center gap-1">
                {user?.emailVerified ? (
                  <MdOutlineVerifiedUser size={20} color="#00d900" />
                ) : (
                  <MdErrorOutline color="yellow" size={20} />
                )}
                Email Is {user?.emailVerified ? "Verified" : "Not Verified"}
              </p>
              {!user?.emailVerified && (
                <Link
                  className="underline cursor-pointer flex items-center gap-2"
                  href={"/account/verifyEmail"}
                >
                  <span>
                    <LuMessageSquareShare />
                  </span>
                  <span> Verify Email</span>
                </Link>
              )}
            </h3>
            <section className="flex items-start gap-5 flex-col">
              <button
                className="cursor-pointer w-[175px]  inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                onClick={() => {
                  Swal.fire({
                    title: "Do You Want To Delete This Account?",
                    text: "You won't be able to revert this!",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then(async () => {
                    await showInputPopup(user.email);
                    setTimeout(() => {
                      handleDeleteAccount();
                    }, 500);
                  });
                }}
              >
                <svg
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
                Delete Account
              </button>
              <div
                onClick={() => {
                  Swal.fire({
                    title: "Do You Want To Log Out?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Log out!",
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      await logout();
                      router.push("/login");
                    }
                  });
                }}
              >
                <LogoutButton />
              </div>
            </section>
          </div>
          <div className="flex flex-col gap-8 items-start w-full">
            <div className="grow w-full flex items-center justify-between gap-1 bg-yellow-800 text-white shadow-md shadow-yellow-800 rounded-[3px] p-4 h-20">
              <h4 className="flex items-center gap-1">
                <FaLock />
                <span> Password : ******** ,</span>
              </h4>
              <Link
                href={"/account/resetPassword"}
                className="underline cursor-pointer flex items-center gap-2"
              >
                <MdOutlineLockReset />
                <span> Reset Password ?</span>
              </Link>
            </div>
            <div className="grow w-full flex items-center justify-between gap-1 bg-yellow-800 text-white shadow-md shadow-yellow-800 rounded-[3px] p-4 h-20">
              <h4 className="flex items-center gap-1">
                <FaAddressCard />
                <span>
                  Address :
                  {address !== "" ? (
                    <>
                      {address.country} , {address.city} ,{address.zip} ,
                      {address.street}
                    </>
                  ) : (
                    "No Available Address"
                  )}
                </span>
              </h4>
              <Link
                href={"/account/address"}
                className="underline cursor-pointer flex items-center gap-2"
              >
                <FaRegEdit />
                <span> Edit Address ?</span>
              </Link>
            </div>
            <h3 className="grow w-full flex items-center gap-1 bg-yellow-800 text-white shadow-md shadow-yellow-800 rounded-[3px] p-4 h-20">
              {" "}
              <FaUserFriends />
              Member Since {user?.metadata.creationTime}
            </h3>
            <h3 className="grow w-full flex items-center gap-1 bg-yellow-800 text-white shadow-md shadow-yellow-800 rounded-[3px] p-4 h-20">
              <MdLogin />
              Last Sing In {user?.metadata.lastSignInTime}
            </h3>
          </div>
        </section>
        {/*  */}
      </main>
    );
}
