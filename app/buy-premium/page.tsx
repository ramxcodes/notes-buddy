"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BlurFade from "@/components/ui/blur-fade";
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
  const { data: session, status } = useSession();
  const [tier, setTier] = useState("Tier 1");
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");
  const [user, setUser] = useState<any>(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const universities = ["Medicaps University"];
  const degrees = ["B Tech"];
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser(session.user);
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

    // Validation for required fields
    if (!university || !degree || !year || !tier) {
      setPopupMessage("Please select all required fields");
      setShowPopup(true);
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
      setPopupMessage("Failed to create Razorpay order");
      setShowPopup(true);
      return;
    }

    const options: IRazorpayConfig = {
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
      amount: order.amount,
      currency: "INR",
      name: "Notes buddy premium subscription",
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
          setPopupMessage("Payment successful!");
        } else {
          setPopupMessage("Payment verification failed");
        }
        setShowPopup(true);
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
          setPopupMessage("Failed to load Razorpay SDK");
          setShowPopup(true);
        }
      };
      document.body.appendChild(script);
    }
  };
  return (
    <div className="p-8 h-screen mx-auto rounded-xl space-y-4 flex flex-col items-center justify-center font-wotfard">
      <BlurFade delay={0.2} inView>
        <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">
          Buy Premium
        </h1>
      </BlurFade>
      <BlurFade delay={0.5} inView>
        <div className="max-w-md w-full space-y-4">
          {status === "loading" ? (
            <p className="text-center">Loading session...</p>
          ) : user ? (
            <p className="text-center text-2xl">
              Hello, {session?.user.name}! Good to see you here ✨
            </p>
          ) : (
            <p className="text-center text-red-500 text-lg">
              Please log in to continue.
            </p>
          )}
          <div className="space-y-2">
            <label className="block text-sm font-medium">University</label>
            <DropdownMenu>
              <DropdownMenuTrigger className="block w-full px-3 py-2 border rounded-md shadow-sm text-left">
                {university || "Select University"}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setUniversity("")}>
                  Select University
                </DropdownMenuItem>
                {universities.map((uni) => (
                  <DropdownMenuItem
                    key={uni}
                    onSelect={() => setUniversity(uni)}
                  >
                    {uni}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Degree</label>
            <DropdownMenu>
              <DropdownMenuTrigger className="block w-full px-3 py-2 border rounded-md shadow-sm text-left">
                {degree || "Select Degree"}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setDegree("")}>
                  Select Degree
                </DropdownMenuItem>
                {degrees.map((deg) => (
                  <DropdownMenuItem key={deg} onSelect={() => setDegree(deg)}>
                    {deg}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Year</label>
            <DropdownMenu>
              <DropdownMenuTrigger className="block w-full px-3 py-2 border rounded-md shadow-sm text-left">
                {year || "Select Year"}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setYear("")}>
                  Select Year
                </DropdownMenuItem>
                {years.map((yr) => (
                  <DropdownMenuItem key={yr} onSelect={() => setYear(yr)}>
                    {yr}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Plan Tier</label>
            <DropdownMenu>
              <DropdownMenuTrigger className="block w-full px-3 py-2 border rounded-md shadow-sm text-left">
                {tier || "Select Tier"}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setTier("Tier 1")}>
                  Tier 1 - ₹99/-
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setTier("Tier 2")}>
                  Tier 2 - ₹169/-
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setTier("Tier 3")}>
                  Tier 3 - ₹249/-
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <button
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md font-gilroy"
            onClick={handleCheckout}
          >
            Proceed to Pay ₹
            {tier === "Tier 1" ? 99 : tier === "Tier 2" ? 169 : 249}/-
          </button>
        </div>
      </BlurFade>

      {showPopup && (
        <BlurFade delay={0.2} inView>
          <div className="flex items-center justify-center font-wotfard backdrop-blur-md z-30">
            <Card className="px-12 py-12 rounded-md shadow-md space-y-4 flex flex-col items-center justify-center">
              <p className="font-wotfard text-lg">{popupMessage}</p>
              <div className="flex flex-row items-center justify-center space-x-4">
                {popupMessage === "Please log in first!" ? (
                  <Button
                    variant={"secondary"}
                    onClick={() => setShowPopup(false)}
                    className="px-4 py-2 rounded-md"
                  >
                    <a href="/sign-in">Log In</a>
                  </Button>
                ) : (
                  <Button
                    variant={"outline"}
                    onClick={() => setShowPopup(false)}
                    className="px-4 py-2 rounded-md"
                  >
                    Close
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </BlurFade>
      )}
    </div>
  );
}
