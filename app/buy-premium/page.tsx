"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { PlanSelector } from "./components/PlanSelector";
import { Header } from "./components/Header";
import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Popup } from "./components/Popup";

export default function BuyPremiumPage() {
  const { data: session, status } = useSession();
  const [tier, setTier] = useState<keyof typeof tierPricing>("Tier 1");
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPhonePrompt, setShowPhonePrompt] = useState(false);
  const [loading, setLoading] = useState(false);

  const universities = ["Medicaps University"];
  const degrees = ["B Tech"];
  const years = ["1st Year", "2nd Year", "3rd Year"];
  const tierPricing = { "Tier 1": 59, "Tier 2": 129, "Tier 3": 169 };

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser(session.user);
      setPhoneNumber(session.user.phoneNumber || null);
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
      setShowPhonePrompt(true);
      return;
    }

    initiatePayment();
  };

  const initiatePayment = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier,
          university,
          degree,
          year,
          amount: tierPricing[tier],
        }),
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
        name: "Notes Buddy Premium",
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
              amount: tierPricing[tier],
            }),
          });

          const result = await verification.json();

          setPopupMessage(
            result.success
              ? "Payment successful!"
              : "Payment verification failed"
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
        const Razorpay = await loadRazorpayScript();
        if (Razorpay) {
          const razorpay = new (Razorpay as any)(options);
          razorpay.open();
        } else {
          setPopupMessage("Failed to load Razorpay script");
          setShowPopup(true);
        }
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      setPopupMessage("An error occurred during checkout");
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve((window as any).Razorpay);
      script.onerror = () => resolve(null);
      document.body.appendChild(script);
    });
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
      <div
        className={`p-8 h-screen mx-auto rounded-xl space-y-4 flex flex-col items-center justify-center font-wotfard ${
          showPopup ? "blur-md" : ""
        }`}
      >
        <Header
          isAuthenticated={!!user}
          userName={session?.user.name || null}
        />
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
            options={["Tier 1", "Tier 2", "Tier 3"]}
            selectedOption={tier}
            onSelect={(value) => setTier(value as keyof typeof tierPricing)}
          />
          <BlurFade delay={0.3} inView>
            <Button
              variant={"default"}
              className="w-full py-2 px-4 font-bold rounded-md shadow-md font-wotfard tracking-widest"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : `Proceed to Pay ₹${tierPricing[tier]} + GST*`}
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
