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
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [total, setTotal] = useState(0);
  const [favoriteItems, setFavoriteItems] = useState([]);

  // ✅ تحميل العناصر المفضلة للمستخدم
  const loadFavorites = async (user) => {
    if (!user) return;
    const favRef = collection(db, "users", user.email, "favorite-items");
    const snapshot = await getDocs(favRef);
    const items = snapshot.docs.map((doc) => doc.data().product);
    setFavoriteItems(items);
  };

  // ✅ تحميل عناصر السلة الخاصة بالمستخدم
  const loadItems = async (email) => {
    const ref = collection(db, "users", email, "cart-items");
    const q = query(ref, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setItems(data);
  };

  // ✅ حساب المجموع الكلي مباشرة من العناصر
  useEffect(() => {
    const total = items.reduce((acc, item) => {
      const price = item.product?.price || 0;
      const quantity = item.quantity || 1;
      return acc + price * quantity;
    }, 0);
    setTotal(total);
  }, [items]);

  // ✅ تحميل المفضلات عند تغيّر المستخدم
  useEffect(() => {
    if (user) loadFavorites(user);
  }, [user]);

  // ✅ تتبع تسجيل دخول المستخدم
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) loadItems(user.email);
    });
    return () => unsub();
  }, []);

  // ✅ إضافة عنصر جديد إلى السلة
  const addMyItem = async (myItem) => {
    if (!myItem || !user) return;
    const ref = collection(db, "users", user.email, "cart-items");
    await addDoc(ref, {
      product: myItem,
      createdAt: new Date(),
    });
    loadItems(user.email); // أو حدّث setItems يدويًا لتقليل الاستعلامات
  };

  // ✅ حذف عنصر من السلة
  const deleteItem = async (itemId) => {
    if (!user) return;
    const itemRef = doc(db, "users", user.email, "cart-items", itemId);
    await deleteDoc(itemRef);
    loadItems(user.email);
  };

  // ✅ إضافة أو إزالة من المفضلة
  const toggleFavorite = async (user, item) => {
    if (!user || !item) return;
    const favRef = collection(db, "users", user.email, "favorite-items");
    try {
      const q = query(favRef, where("product.id", "==", item.id));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const existingDocId = snapshot.docs[0].id;
        await deleteDoc(
          doc(db, "users", user.email, "favorite-items", existingDocId)
        );
      } else {
        await addDoc(favRef, {
          product: item,
          createdAt: new Date(),
        });
      }
      loadFavorites(user); // إعادة تحميل المفضلة بعد التعديل
    } catch (error) {
      console.error("Error toggling favorite item:", error);
    }
  };

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
