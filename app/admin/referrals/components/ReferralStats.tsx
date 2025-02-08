"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReferralStatsProps {
  totalReferrals: number;
  totalRedemptions: number;
  averageRedemptions: number;
  totalEarnings: number;
}

export function ReferralStats({
  totalReferrals,
  totalRedemptions,
  averageRedemptions,
  totalEarnings,
}: ReferralStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Total Referral Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-bold">{totalReferrals}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Total Redemptions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-bold">{totalRedemptions}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Average Redemptions per Code</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-bold">{averageRedemptions.toFixed(2)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-bold">₹{totalEarnings}</p>
        </CardContent>
      </Card>
    </div>
  );
}
