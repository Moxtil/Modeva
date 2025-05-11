"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { MyCartItems } from "./CartContext";

export default function RoutingContext({ children }) {
  const router = useRouter();
  const user = useAuth();
  const path = usePathname();

  useEffect(() => {
    if (path.includes("/checkout")) {
      router.push("/");
    }
  }, []);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user && path != "/login") {
        if (path !== "/sign-up") {
          router.push("/login");
        }
      } else if (user) {
        if (path === "/login" || path === "/sign-up") {
          router.push("/");
        }
      }
    });

    return () => unsub(); // Cleanup listener
  }, [path, user]);

  return <>{children}</>;
}
