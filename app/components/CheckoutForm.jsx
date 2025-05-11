"use client";
import { useState, useEffect, useContext } from "react";
import PhoneInput from "react-phone-input-2";
import { Country, State, City } from "country-state-city";
import "react-phone-input-2/lib/style.css";
import { MyCartItems } from "../context/CartContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function ContactForm() {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [states, setStates] = useState([]);
  const [zips, setZips] = useState([]);
  const { total } = useContext(MyCartItems);
  const countries = Country.getAllCountries();

  const router = useRouter();
  useEffect(() => {
    if (country) {
      const stateList = State.getStatesOfCountry(country);
      setStates(stateList);
      setState("");
      setZip("");
      setZips(stateList.map((s, idx) => `ZIP-${idx + 1000}`)); // Dummy ZIPs
    } else {
      setStates([]);
      setState("");
      setZip("");
    }
  }, [country]);

  return (
    <div className="max-w-3xl mx-auto p-6 text-[#333] font-sans">
      <h2 className="text-2xl font-semibold text-[#222] mb-6">
        Contact Person
      </h2>

      <div className="mb-5">
        <label className="block text-sm font-semibold uppercase mb-1">
          Name
        </label>
        <input
          type="text"
          placeholder="Eg: John Doe"
          className="w-full border border-[#555] p-3 text-sm"
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold uppercase mb-1">
          Phone Number
        </label>
        <PhoneInput
          country={"us"}
          value={phone}
          onChange={setPhone}
          inputStyle={{
            width: "100%",
            height: "48px",
            fontSize: "0.875rem",
            border: "1px solid #555",
          }}
          buttonStyle={{
            border: "1px solid #555",
          }}
          containerStyle={{ width: "100%" }}
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold uppercase mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="Eg: example@example.com"
          className="w-full border border-[#555] p-3 text-sm"
        />
      </div>

      <h2 className="text-2xl font-semibold text-[#222] mb-6">
        Address Detail
      </h2>

      <div className="mb-5">
        <label className="block text-sm font-semibold uppercase mb-1">
          Address
        </label>
        <input
          type="text"
          placeholder="Eg: ABC Street 12A"
          className="w-full border border-[#555] p-3 text-sm"
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold uppercase mb-1">
          Country
        </label>
        <select
          className="w-full border border-[#555] p-3 text-sm"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Choose Country</option>
          {countries.map((c) => (
            <option key={c.isoCode} value={c.isoCode}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold uppercase mb-1">
            State / Province
          </label>
          <select
            className="w-full border border-[#555] p-3 text-sm"
            value={state}
            onChange={(e) => setState(e.target.value)}
            disabled={!states.length}
          >
            <option value="">Choose Province</option>
            {states.map((s) => (
              <option key={s.isoCode} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold uppercase mb-1">
            ZIP Code
          </label>
          <select
            className="w-full border border-[#555] p-3 text-sm"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            disabled={!zips.length}
          >
            <option value="">Choose ZIP Code</option>
            {zips.map((z, i) => (
              <option key={i} value={z}>
                {z}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center mt-10">
        <button
          onClick={() => {
            if (
              phone != "" &&
              phone.length > 10 &&
              country != "" &&
              state != "" &&
              zip != ""
            ) {
              router.push("/checkout/shipping");
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Make Sure All Inputs Filled Correctly!",
                showConfirmButton: false,
                timer: 1200,
              });
            }
          }}
          className="bg-[#A0522D] cursor-pointer text-white px-6 py-3 text-sm uppercase font-semibold hover:bg-[#8B4513] transition"
        >
          Continue to Shipping
        </button>
        <h2 className="text-xl translate-y-2 font-semibold text-[#222] mb-6">
          Total : ${total}
        </h2>
      </div>
    </div>
  );
}
