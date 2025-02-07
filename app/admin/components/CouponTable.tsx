"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CouponUsageModal } from "./CouponUsageModal";

export interface Coupon {
  _id: string;
  code: string;
  type: "flat" | "percent";
  value: number;
  expiryDate?: string | null;
  usageLimit?: number | null;
  usageCount: number;
  createdAt: string;
}

interface CouponTableProps {
  coupons: Coupon[];
  refreshCoupons: () => void;
}

export function CouponTable({ coupons, refreshCoupons }: CouponTableProps) {
  const [selectedCouponCode, setSelectedCouponCode] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (couponCode: string) => {
    setSelectedCouponCode(couponCode);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCouponCode(null);
  };

  return (
    <>
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Usage Limit</TableHead>
            <TableHead>Usage Count</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons.map((coupon, index) => (
            <TableRow key={coupon._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{coupon.code}</TableCell>
              <TableCell>{coupon.type}</TableCell>
              <TableCell>{coupon.value}</TableCell>
              <TableCell>
                {coupon.expiryDate
                  ? format(new Date(coupon.expiryDate), "yyyy-MM-dd")
                  : "N/A"}
              </TableCell>
              <TableCell>{coupon.usageLimit ?? "N/A"}</TableCell>
              <TableCell>{coupon.usageCount}</TableCell>
              <TableCell>{format(new Date(coupon.createdAt), "yyyy-MM-dd HH:mm")}</TableCell>
              <TableCell>
                <Button onClick={() => openModal(coupon.code)}>View Usage</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedCouponCode && (
        <CouponUsageModal
          couponCode={selectedCouponCode}
          open={modalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
}
