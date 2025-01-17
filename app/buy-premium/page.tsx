"use client";

import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

interface IRazorpayConfig {
  key_id: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
  };
  theme: {
    color: string;
  };
}

export default function BuyPremiumPage() {
  const [tier, setTier] = useState("Tier 1");
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");
  const [user, setUser] = useState<any>(null);

  const universities = ["Medicaps University", "Delhi University"];
  const degrees = ["B.Tech", "M.Tech"];
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      if (session?.user) {
        setUser(session.user);
      }
    }
    fetchSession();
  }, []);

  const handleCheckout = async () => {
    if (!user) {
      alert("Please log in first!");
      window.location.href = "/sign-in";
      return;
    }


    const response = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tier, university, degree, year }),
    });

    const order = await response.json();


    if (!order.id) {
      alert("Failed to create Razorpay order");
      return;
    }

    const options: IRazorpayConfig = {
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
      amount: order.amount,
      currency: "INR",
      name: "Subscription",
      description: `Subscription for ${tier} (${year})`,
      order_id: order.id,
      handler: async (response: any) => {

        const verification = await fetch("/api/razorpay/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...response,
            userId: user.id,
            tier,
            university,
            degree,
            year,
          }),
        });

        const result = await verification.json();

        if (result.success) {
          alert("Payment successful!");
        } else {
          alert("Payment verification failed");
        }
      },
      prefill: {
        name: user?.name || "",
        email: user?.email || "",
      },
      theme: {
        color: "#3399cc",
      },
    };

    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        if ((window as any).Razorpay) {
          const Razorpay = (window as any).Razorpay;
          const razorpay = new Razorpay(options);
          razorpay.open();
        } else {
          alert("Failed to load Razorpay SDK");
        }
      };
      document.body.appendChild(script);
    }
  };
  
  return (
    <div className="p-8 max-w-md mx-auto rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center">Buy Premium</h1>
      {user ? (
        <p className="text-center ">Hello, {user.name}</p>
      ) : (
        <p className="text-center text-red-500">Please log in to continue.</p>
      )}
      <div className="space-y-2">
        <label className="block text-sm font-medium ">University</label>
        <select
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
        >
          <option value="">Select University</option>
          {universities.map((uni) => (
            <option key={uni} value={uni}>
              {uni}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Degree</label>
        <select
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        >
          <option value="">Select Degree</option>
          {degrees.map((deg) => (
            <option key={deg} value={deg}>
              {deg}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Year</label>
        <select
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">Select Year</option>
          {years.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Plan Tier</label>
        <select
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={tier}
          onChange={(e) => setTier(e.target.value)}
        >
          <option value="Tier 1">Tier 1</option>
          <option value="Tier 2">Tier 2</option>
          <option value="Tier 3">Tier 3</option>
        </select>
      </div>
      <button
        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onClick={handleCheckout}
      >
        Proceed to Pay
      </button>
    </div>
  );
}
