"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export default function RoutingContext({ children }) {
  const router = useRouter();
  const user = useAuth();
  const path = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user && path !== "/login") {
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
