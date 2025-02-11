export interface Coupon {
  code: string;
  type: "flat" | "percent";
  value: number;
  expiryDate?: Date;
  usageLimit?: number;
  usageCount: number;
  usedBy: string[];
  createdAt: Date;
}
