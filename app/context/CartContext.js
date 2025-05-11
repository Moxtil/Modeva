"use client";
import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";

export const MyCartItems = createContext();
export default function CartContext({ children }) {
  const [item, setItem] = useState({});
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [total, setTotal] = useState(0);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const loadFavorites = async (user) => {
    if (!user) return;

    const favRef = collection(db, "users", user.email, "favorite-items");
    const snapshot = await getDocs(favRef);

    const items = snapshot.docs.map((doc) => doc.data().product);
    setFavoriteItems(items);
  };
  useEffect(() => {
    if (user) {
      loadFavorites(user);
    }
  }, [user]);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) loadItems(user.email);
    });
    return () => unsub();
  }, []);

  const toggleFavorite = async (user, item) => {
    if (!user || !item) return;

    const favRef = collection(db, "users", user.email, "favorite-items");

    try {
      // Check if the item already exists
      const q = query(favRef, where("product.id", "==", item.id));
      const snapshot = await getDocs(q);

      console.log("Checking for existing favorite:", item.id);
      console.log(
        "Found items:",
        snapshot.docs.map((doc) => doc.data())
      );

      if (!snapshot.empty) {
        // Remove the existing one
        const existingDocId = snapshot.docs[0].id;
        await deleteDoc(
          doc(db, "users", user.email, "favorite-items", existingDocId)
        );
        console.log("Removed from favorites:", item.title);
      } else {
        // Add to favorites
        await addDoc(favRef, {
          product: item,
          createdAt: new Date(),
        });
        console.log("Added to favorites:", item.title);
      }
    } catch (error) {
      console.error("Error toggling favorite item:", error);
    }
  };

  //
  const addMyItem = async (myItem) => {
    if (!item || !user) return;

    const ref = collection(db, "users", user.email, "cart-items");
    await addDoc(ref, {
      product: myItem,
      createdAt: new Date(),
    });

    setItem({});
    loadItems(user.email);
  };
  const deleteItem = async (itemId) => {
    if (!user) return;

    const itemRef = doc(db, "users", user.email, "cart-items", itemId);
    await deleteDoc(itemRef);
    loadItems(user.email); // reload items after delete
  };
  ///////

  ///////
  const loadItems = async (email) => {
    const ref = collection(db, "users", email, "cart-items");
    const q = query(ref, orderBy("createdAt", "desc")); // or "asc"

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setItems(data);
  };

  const getCartTotal = async (userEmail) => {
    try {
      const cartRef = collection(db, "users", userEmail, "cart-items");
      const snapshot = await getDocs(cartRef);

      let total = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        const price = data.product?.price || 0;
        const quantity = data.quantity || 1;

        total += price * quantity;
      });

      return total;
    } catch (err) {
      console.error("Failed to calculate cart total:", err.message);
      return 0;
    }
  };

  useEffect(() => {
    if (user?.email) {
      getCartTotal(user.email).then((total) => {
        setTotal(total); // state to display
      });
    }
  }, [items]);
  return (
    <MyCartItems.Provider
      value={{
        items,
        toggleFavorite,
        addMyItem,
        loadItems,
        user,
        setUser,
        deleteItem,
        total,
      }}
    >
      {children}
    </MyCartItems.Provider>
  );
}
