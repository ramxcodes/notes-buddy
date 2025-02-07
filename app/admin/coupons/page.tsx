"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { CouponCreationForm } from "../components/CouponCreationForm";
import { Coupon, CouponTable } from "../components/CouponTable";

export default function CouponDashboard() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const response = await fetch("/admin/api/coupons", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to fetch coupons");
      }
      const data = await response.json();
      setCoupons(data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Coupon Management</h1>
      <CouponCreationForm onCouponCreated={fetchCoupons} />
      <Separator className="my-6" />
      {loading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <CouponTable coupons={coupons} refreshCoupons={fetchCoupons} />
      )}
    </div>
  );
}
