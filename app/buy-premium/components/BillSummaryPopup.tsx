"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";

interface BillSummaryPopupProps {
  originalPrice: number;
  finalPrice: number;
  discountAmount: number;
  onConfirm: () => void;
  onClose: () => void;
}

export function BillSummaryPopup({
  originalPrice,
  finalPrice,
  discountAmount,
  onConfirm,
  onClose,
}: BillSummaryPopupProps) {
  const taxRate = 0.05;
  const taxAmount = finalPrice * taxRate;
  const totalAmount = finalPrice + taxAmount;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Card className="p-8 w-[90%] max-w-md rounded-lg shadow-lg space-y-4 flex flex-col items-center animate-fade-in">
        <CardHeader>
          <h2 className="font-bold text-2xl uppercase">Bill Summary</h2>
        </CardHeader>
        <div className="w-full space-y-2 text-xs">
          <p>
            <b>Original Price:</b> ₹{originalPrice}
          </p>
          {discountAmount > 0 && (
            <p className="text-green-500">Discount: -₹{discountAmount}</p>
          )}
          <p>Price after Discount: ₹{finalPrice}</p>
          <p>Tax (5%): ₹{taxAmount.toFixed(2)}</p>
          <p className="font-bold text-lg">Total: ₹{totalAmount.toFixed(2)}</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={onConfirm}>
            Confirm Payment
          </Button>
        </div>
      </Card>
    </div>
  );
}
