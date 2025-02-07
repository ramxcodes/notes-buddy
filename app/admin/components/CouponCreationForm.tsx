"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

interface CouponFormData {
  code: string;
  type: "flat" | "percent";
  value: number;
  expiryDate?: string;
  usageLimit?: number;
}

interface CouponCreationFormProps {
  onCouponCreated: () => void;
}

export function CouponCreationForm({
  onCouponCreated,
}: CouponCreationFormProps) {
  const [formData, setFormData] = useState<CouponFormData>({
    code: "",
    type: "flat",
    value: 0,
    expiryDate: "",
    usageLimit: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof CouponFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/admin/api/coupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create coupon");
      } else {
        // Reset form on success
        setFormData({
          code: "",
          type: "flat",
          value: 0,
          expiryDate: "",
          usageLimit: undefined,
        });
        onCouponCreated();
      }
    } catch (err) {
      setError("An error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-8 p-4">
      <CardHeader>
        <CardTitle className="text-lg">Create New Coupon</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="space-y-1">
            <Label htmlFor="code">Coupon Code</Label>
            <Input
              id="code"
              type="text"
              value={formData.code}
              onChange={(e) =>
                handleChange("code", e.target.value.toUpperCase())
              }
              placeholder="e.g. SAVE10"
              required
              className="uppercase"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="type">Coupon Type</Label>
            <Select
              value={formData.type}
              onValueChange={(val) => handleChange("type", val)}
            >
              <SelectTrigger>
                <span className="capitalize">{formData.type}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flat">Flat (₹ off)</SelectItem>
                <SelectItem value="percent">Percent (% off)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="value">Discount Value</Label>
            <Input
              id="value"
              type="number"
              value={formData.value}
              onChange={(e) => handleChange("value", Number(e.target.value))}
              placeholder="e.g. 10"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="expiryDate">Expiry Date (optional)</Label>
            <Input
              id="expiryDate"
              type="date"
              value={formData.expiryDate || ""}
              onChange={(e) => handleChange("expiryDate", e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="usageLimit">Usage Limit (optional)</Label>
            <Input
              id="usageLimit"
              type="number"
              value={formData.usageLimit || ""}
              onChange={(e) =>
                handleChange(
                  "usageLimit",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              placeholder="e.g. 100"
            />
          </div>
          {error && <p className="text-red-500 col-span-2">{error}</p>}
          <div className="col-span-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Coupon"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
