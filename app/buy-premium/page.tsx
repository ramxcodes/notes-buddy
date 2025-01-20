"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { PlanSelector } from "./components/PlanSelector";
import { Popup } from "./components/Popup";
import { Header } from "./components/Header";
import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";

export default function BuyPremiumPage() {
  const { data: session, status } = useSession();
  const [tier, setTier] = useState("Tier 1");
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPhonePrompt, setShowPhonePrompt] = useState(false);

  const universities = ["Medicaps University"];
  const degrees = ["B Tech"];
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser(session.user);
      setPhoneNumber(session.user.phoneNumber || null); // Load phone number from session
    } else if (status === "unauthenticated") {
      setUser(null);
    }
  }, [session, status]);

  const handleCheckout = async () => {
    if (!user) {
      setPopupMessage("Please log in first!");
      setShowPopup(true);
      return;
    }

    if (!university || !degree || !year || !tier) {
      setPopupMessage("Please select all required fields");
      setShowPopup(true);
      return;
    }

    if (!phoneNumber) {
      setShowPhonePrompt(true); // Prompt for phone number if not set
      return;
    }

    initiatePayment(); // Proceed to payment if phone number exists
  };

  const initiatePayment = async () => {
    const response = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tier, university, degree, year }),
    });

    const order = await response.json();

    if (!order.id) {
      setPopupMessage("Failed to create Razorpay order");
      setShowPopup(true);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Notes buddy premium",
      description: `Subscription for ${tier} (${year})`,
      order_id: order.id,
      handler: async (response: any) => {
        const verification = await fetch("/api/razorpay/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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

        setPopupMessage(
          result.success ? "Payment successful!" : "Payment verification failed"
        );
        setShowPopup(true);
      },
      prefill: {
        name: user.name || "",
        email: user.email || "",
      },
      theme: { color: "#3399cc" },
    };

    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const Razorpay = (window as any).Razorpay;
        const razorpay = new Razorpay(options);
        razorpay.open();
      };
      document.body.appendChild(script);
    }
  };

  const handlePhoneSubmit = async () => {
    if (!phoneNumber || phoneNumber.trim().length < 10) {
      setPopupMessage("Please enter a valid phone number");
      setShowPopup(true);
      return;
    }

    await fetch("/api/save-phone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, phoneNumber }),
    });

    setShowPhonePrompt(false);
    initiatePayment();
  };

  return (
    <div className="relative">
      {/* Main Content */}
      <div
        className={`p-8 h-screen mx-auto rounded-xl space-y-4 flex flex-col items-center justify-center font-wotfard ${
          showPopup ? "blur-md" : ""
        }`}
      >
        <Header isAuthenticated={!!user} userName={session?.user.name || null} />

        <div className="max-w-md w-full space-y-4">
          <PlanSelector
            label="University"
            options={universities}
            selectedOption={university}
            onSelect={setUniversity}
          />
          <PlanSelector
            label="Degree"
            options={degrees}
            selectedOption={degree}
            onSelect={setDegree}
          />
          <PlanSelector
            label="Year"
            options={years}
            selectedOption={year}
            onSelect={setYear}
          />
          <PlanSelector
            label="Plan Tier"
            options={["Tier 1 - ₹99/-", "Tier 2 - ₹169/-", "Tier 3 - ₹249/-"]}
            selectedOption={tier}
            onSelect={setTier}
          />
          <BlurFade delay={0.3} inView>
            <Button
              variant={"default"}
              className="w-full py-2 px-4 font-semibold rounded-md shadow-md font-gilroy"
              onClick={handleCheckout}
            >
              Proceed to Pay ₹
              {tier === "Tier 1" ? 99 : tier === "Tier 2" ? 169 : 249}/-
            </Button>
          </BlurFade>
        </div>
      </div>

      {showPhonePrompt && (
        <Popup
          message={
            <div className="space-y-4">
              <label className="block text-sm font-medium">
                Enter your phone number
              </label>
              <input
                type="text"
                value={phoneNumber || ""}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 border rounded-md shadow-sm"
              />
              <Button
                variant={"default"}
                className="w-full py-2"
                onClick={handlePhoneSubmit}
              >
                Submit
              </Button>
            </div>
          }
          onClose={() => setShowPhonePrompt(false)}
        />
      )}

      {showPopup && (
        <Popup
          message={popupMessage}
          onClose={() => setShowPopup(false)}
          showLoginButton={popupMessage === "Please log in first!"}
        />
      )}
    </div>
  );
}
