"use client";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
export default function AddressPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    zip: "",
    country: "",
    fullAddress: "",
  });
  const [loading, setLoading] = useState(true);
  const [isExisting, setIsExisting] = useState(false);

  // Listen to Firebase Auth state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        setUserEmail(user.email);
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().address) {
          setAddress(docSnap.data().address);
          setIsExisting(true);
        }

        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail) return;

    const userRef = doc(db, "users", userEmail);
    try {
      if (isExisting) {
        await updateDoc(userRef, { address });
        Swal.fire({
          title: "Good job!",
          text: "Address Updated Successfully!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        router.push("/account");
      } else {
        await setDoc(userRef, { address });
        setIsExisting(true);
        Swal.fire({
          title: "Good job!",
          text: "Address Updated Successfully!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        router.push("/account");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to save address.");
    }
  };

  if (loading) return <div className="loader"></div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isExisting ? "Edit Your Address" : "Add Your Address"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="street"
            value={address.street}
            onChange={handleChange}
            placeholder="Street Address"
            required
            className="w-full p-3 border rounded"
          />
          <input
            name="city"
            value={address.city}
            onChange={handleChange}
            placeholder="City"
            required
            className="w-full p-3 border rounded"
          />
          <input
            name="zip"
            value={address.zip}
            onChange={handleChange}
            placeholder="District"
            required
            className="w-full p-3 border rounded"
          />
          <input
            name="country"
            value={address.country}
            onChange={handleChange}
            placeholder="Country"
            required
            className="w-full p-3 border rounded"
          />
          <input
            name="fullAddress"
            value={address.fullAddress || ""}
            onChange={handleChange}
            placeholder="Full Address"
            required
            className="w-full p-3 border rounded"
          />
          <button
            type="submit"
            className="cursor-pointer w-full bg-[#8B4513] hover:bg-[#5d4130] transition-all text-white font-semibold p-3 rounded"
          >
            {isExisting ? "Update Address" : "Save Address"}
          </button>
        </form>
      </div>
    </div>
  );
}
