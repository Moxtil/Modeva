"use client";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { useState, useContext, createContext, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContext = createContext();

const logout = () => {
  return signOut(auth);
};

export const getCurrentUser = (callback) => {
  if (!auth) {
    console.error("Firebase Auth Not Initialized");
  }

  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (us) => {
      setUser(us);
    });
    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={{ logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}
