"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { PlanSelector } from "./components/PlanSelector";
import { Header } from "./components/Header";
import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Popup } from "./components/Popup";
import { Input } from "@/components/ui/input";

export default function BuyPremiumPage() {
  const { data: session, status } = useSession();
  const [tier, setTier] = useState<keyof typeof tierPricing>("Tier 1");
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPhonePrompt, setShowPhonePrompt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState(""); // coupon code state
  const [discountPreview, setDiscountPreview] = useState<{
    originalPrice: number;
    finalPrice: number;
    discountAmount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState<string>("");

  const universities = ["Medicaps University"];
  const degrees = ["B Tech", "B Tech CSBS"];
  const tierPricing = { "Tier 1": 59, "Tier 2": 129, "Tier 3": 169 };

  const yearOptions =
    degree === "B Tech"
      ? ["1st Year", "2nd Year", "3rd Year"]
      : degree === "B Tech CSBS"
      ? ["1st Year", "2nd Year", "3rd Year", "4th Year"]
      : [];

  const semesterOptionsMapping: { [key: string]: string[] } = {
    "1st Year": ["1st Semester", "2nd Semester"],
    "2nd Year": ["3rd Semester", "4th Semester"],
    "3rd Year": ["5th Semester", "6th Semester"],
    "4th Year": ["7th Semester", "8th Semester"],
  };

  // Get semester options if a year is selected
  const semesterOptions = year ? semesterOptionsMapping[year] : [];

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser(session.user);
      setPhoneNumber(session.user.phoneNumber || null);
    } else if (status === "unauthenticated") {
      setUser(null);
    }
  }, [session, status]);

  // Reset year and semester if degree changes
  useEffect(() => {
    setYear("");
    setSemester("");
  }, [degree]);

  // Reset semester if year changes
  useEffect(() => {
    setSemester("");
  }, [year]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      setDiscountPreview(null);
      return;
    }
    try {
      const response = await fetch("/api/coupons/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier,
          basePrice: tierPricing[tier],
          couponCode: couponCode.trim(),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setCouponError(data.error || "Invalid coupon");
        setDiscountPreview(null);
      } else {
        setCouponError("");
        setDiscountPreview(data);
      }
    } catch (error) {
      setCouponError("Failed to apply coupon");
      setDiscountPreview(null);
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      setPopupMessage("Please log in first!");
      setShowPopup(true);
      return;
    }

    if (!university || !degree || !year || !semester || !tier) {
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
          semester,
          amount: tierPricing[tier],
          couponCode: couponCode.trim() ? couponCode.trim() : undefined,
        }),
      });

      const order = await response.json();

      if (!order.id) {
        setPopupMessage("Failed to create Razorpay order: " + (order.error || ""));
        setShowPopup(true);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Notes Buddy Premium",
        description: `Subscription for ${tier} (${year} - ${semester})`,
        order_id: order.id,
        handler: async (razorpayResponse: any) => {
          const verification = await fetch("/api/razorpay/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...razorpayResponse,
              userId: user.id,
              tier,
              university,
              degree,
              year,
              semester,
              amount: order.amount,
              couponCode: couponCode.trim() ? couponCode.trim() : undefined,
            }),
          });

          const result = await verification.json();

          setPopupMessage(
            result.success
              ? "Payment successful!"
              : "Payment verification failed: " + (result.error || "")
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
          {degree && (
            <PlanSelector
              label="Year"
              options={yearOptions}
              selectedOption={year}
              onSelect={setYear}
            />
          )}
          {year && (
            <PlanSelector
              label="Semester"
              options={semesterOptions}
              selectedOption={semester}
              onSelect={setSemester}
            />
          )}
          <PlanSelector
            label="Plan Tier"
            options={["Tier 1", "Tier 2", "Tier 3"]}
            selectedOption={tier}
            onSelect={(value) =>
              setTier(value as keyof typeof tierPricing)
            }
          />

          <BlurFade delay={0.4} inView>
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Coupon Code (Optional)
              </label>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code"
                  className="transition-all duration-300 uppercase"
                />
                <Button variant="secondary" onClick={handleApplyCoupon}>
                  Apply
                </Button>
              </div>
              {couponError && <p className="text-red-500 text-sm">{couponError}</p>}
              {discountPreview && (
                <p className="text-green-600 text-sm">
                  Coupon Applied: You save ₹{discountPreview.discountAmount.toFixed(2)}
                </p>
              )}
            </div>
          </BlurFade>
          <BlurFade delay={0.5} inView>
            <Button
              variant={"default"}
              className="w-full py-2 px-4 font-bold rounded-md shadow-md font-wotfard tracking-widest"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? (
                "Processing..."
              ) : discountPreview ? (
                <div className="flex flex-col items-center">
                  <span className="text-sm">
                    Proceed to pay{" "}
                    <span className="line-through text-red-500 mr-1">
                      ₹{tierPricing[tier]}
                    </span>{" "}
                    ₹{discountPreview.finalPrice} + GST
                  </span>
                </div>
              ) : (
                `Proceed to Pay ₹${tierPricing[tier]} + GST*`
              )}
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
