"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ReferralStats } from "./components/ReferralStats";
import { ReferralTable } from "./components/ReferralTable";

export interface Redemption {
  userId: string;
  name: string;
  email: string;
  redeemedAt: string;
}

export interface Referral {
  _id: string;
  userId: string;
  referrerName: string;
  referrerEmail: string;
  couponCode: string;
  selfCouponCode?: string;
  minRedemption: number;
  maxRedemption: number;
  redeemedBy: Redemption[];
  createdAt: string;
  expiryDate: string;
  invalidated?: boolean;
}

export default function AdminReferralDashboard() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function fetchReferrals() {
    setLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch("/admin/api/referrals", { cache: "no-store" });
      if (!res.ok) {
        const errorData = await res.json();
        setErrorMessage(errorData.error || "Failed to fetch referrals");
        setReferrals([]);
      } else {
        const data = await res.json();
        if (data.referrals && data.referrals.length > 0) {
          setReferrals(data.referrals);
        } else {
          setReferrals([]);
        }
      }
    } catch (error) {
      console.error("Error fetching referrals:", error);
      setErrorMessage("An unexpected error occurred while fetching referrals.");
      setReferrals([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReferrals();
  }, []);

  const totalReferrals = referrals.length;
  const totalRedemptions = referrals.reduce(
    (acc, curr) => acc + curr.redeemedBy.length,
    0
  );
  const averageRedemptions =
    totalReferrals > 0 ? totalRedemptions / totalReferrals : 0;
  const totalEarnings = totalRedemptions * 10; // Each redemption gives ₹10

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">
        Referral Analytics & Dashboard
      </h1>
      <Separator className="mb-6" />

      {loading ? (
        <Skeleton className="h-24 w-full mb-6" />
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <ReferralStats
          totalReferrals={totalReferrals}
          totalRedemptions={totalRedemptions}
          averageRedemptions={averageRedemptions}
          totalEarnings={totalEarnings}
        />
      )}

      <h2 className="text-xl font-bold mb-4">All Referrals</h2>
      <Separator className="mb-6" />

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-6 w-full" />
          ))}
        </div>
      ) : referrals.length === 0 ? (
        <p>No referral data available.</p>
      ) : (
        <ReferralTable referrals={referrals} />
      )}
      <div className="mt-4">
        <Button onClick={fetchReferrals}>Refresh</Button>
      </div>
    </div>
  );
}
