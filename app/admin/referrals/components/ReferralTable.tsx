"use client";

import { Referral } from "../page";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface ReferralTableProps {
  referrals: Referral[];
}

export function ReferralTable({ referrals }: ReferralTableProps) {
  return (
    <Table className="min-w-full border">
      <TableHeader>
        <TableRow className="border-b">
          <TableHead className="p-2">Referrer Name</TableHead>
          <TableHead className="p-2">Referrer Email</TableHead>
          <TableHead className="p-2">Referral Code</TableHead>
          <TableHead className="p-2">Self-Coupon</TableHead>
          <TableHead className="p-2">Created At</TableHead>
          <TableHead className="p-2">Expiry</TableHead>
          <TableHead className="p-2">Redemptions</TableHead>
          <TableHead className="p-2">Redeemed Users</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {referrals.map((ref) => (
          <TableRow key={ref._id} className="border-b">
            <TableCell className="p-2">{ref.referrerName}</TableCell>
            <TableCell className="p-2">{ref.referrerEmail}</TableCell>
            <TableCell className="p-2">{ref.couponCode}</TableCell>
            <TableCell className="p-2">{ref.selfCouponCode || "-"}</TableCell>
            <TableCell className="p-2">
              {new Date(ref.createdAt).toLocaleString()}
            </TableCell>
            <TableCell className="p-2">
              {new Date(ref.expiryDate).toLocaleString()}{" "}
              {new Date() < new Date(ref.expiryDate) ? "Active" : "Expired"}
            </TableCell>
            <TableCell className="p-2">
              {ref.redeemedBy.length} / {ref.maxRedemption}
            </TableCell>
            <TableCell className="p-2">
              {ref.redeemedBy.length > 0 ? (
                <ul>
                  {ref.redeemedBy.map((r) => (
                    <li key={r.userId}>
                      {r.name} ({new Date(r.redeemedAt).toLocaleString()})
                    </li>
                  ))}
                </ul>
              ) : (
                "-"
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
