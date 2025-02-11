"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import BlurFade from "@/components/ui/blur-fade";
import { Copy } from "lucide-react";
import { UserProfile } from "@/components/UserProfile";

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

export default function ReferPage() {
  const { data: session, status } = useSession();
  const [referral, setReferral] = useState<Referral | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [copiedSelf, setCopiedSelf] = useState(false);

  async function fetchReferral() {
    setLoading(true);
    try {
      const res = await fetch("/api/refer", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setReferral(data.referral);
      } else {
        setReferral(null);
      }
    } catch (error) {
      console.error("Error fetching referral data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateReferral() {
    try {
      setLoading(true);
      const res = await fetch("/api/refer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        setReferral(data.referral);
        setMessage("Referral code created successfully.");
      } else {
        const err = await res.json();
        setMessage(err.error || "Failed to create referral code");
      }
    } catch (error) {
      console.error("Error creating referral:", error);
      setMessage("Error creating referral code");
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateSelfCoupon() {
    try {
      const res = await fetch("/api/refer/self-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        setReferral(data.referral);
        setMessage(`Self-coupon generated: ${data.referral.selfCouponCode}`);
      } else {
        setMessage(data.error || "Failed to generate self-coupon");
      }
    } catch (error) {
      console.error("Error generating self-coupon:", error);
      setMessage("Error generating self-coupon");
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetchReferral();
    }
  }, [status]);

  useEffect(() => {
    if (copiedReferral && referral) {
      navigator.clipboard.writeText(referral.couponCode);
      setMessage(`${referral.couponCode} is copied`);
      setCopiedReferral(false);
    }
  }, [copiedReferral, referral]);

  useEffect(() => {
    if (copiedSelf && referral && referral.selfCouponCode) {
      navigator.clipboard.writeText(referral.selfCouponCode);
      setMessage(`${referral.selfCouponCode} is copied`);
      setCopiedSelf(false);
    }
  }, [copiedSelf, referral]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/4" />
          </CardContent>
        </Card>
      </div>
    );
  }
  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
        <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">Please Sign In to <br /> access referral dashboard.</h1>
        <UserProfile />

      </div>
    );
  }
  return (
    <div className="flex flex-col items-center min-h-screen p-4 space-y-6 justify-center">
      <div className="w-full max-w-2xl space-y-6">
        <BlurFade delay={0.2} inView>
          <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">
            Referral Dashboard
          </h1>
        </BlurFade>
        <BlurFade delay={0.25} inView>
          <p className="text-center text-lg text-muted-foreground">
            Share your referral code with your friends and get rewards when they
            purchase from your referral code.
          </p>
        </BlurFade>

        {message && (
          <Card className="text-sm text-center py-2 min-w-fit font-bold">
            {message}
          </Card>
        )}

        {loading ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2 mx-auto" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/4" />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Skeleton className="h-8 w-32" />
            </CardFooter>
          </Card>
        ) : (
          <>
            {referral ? (
              <Card>
                <CardHeader className="text-left">
                  <CardTitle>Your Referral Details</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="font-medium">Referral Code</p>
                      <div className="flex items-center">
                        <code className="text-lg">{referral.couponCode}</code>
                        <Copy
                          onClick={() => setCopiedReferral(true)}
                          className="ml-2 cursor-pointer"
                          size={20}
                        />
                      </div>
                    </div>

                    {referral.selfCouponCode && (
                      <div className="space-y-2">
                        <p className="font-medium">Self‑Coupon</p>
                        <div className="flex items-center">
                          <code className="text-lg">
                            {referral.selfCouponCode}
                          </code>
                          <Copy
                            onClick={() => setCopiedSelf(true)}
                            className="ml-2 cursor-pointer"
                            size={20}
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <p className="font-medium">Created</p>
                      <p>{new Date(referral.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium">Expiry</p>
                      <div className="flex items-center gap-2">
                        <p>
                          {new Date(referral.expiryDate).toLocaleDateString()}
                        </p>
                        <Badge variant="outline">
                          {new Date() < new Date(referral.expiryDate)
                            ? "Active"
                            : "Expired"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">Redemptions Progress</p>
                      <p>
                        {referral.redeemedBy.length} / {referral.maxRedemption}
                      </p>
                    </div>
                    <Progress
                      value={
                        (referral.redeemedBy.length / referral.maxRedemption) *
                        100
                      }
                    />
                  </div>

                  {referral.redeemedBy.length > 0 && (
                    <div className="space-y-2">
                      <p className="font-medium">Referred Users</p>
                      <div className="border rounded-lg p-4 max-h-40 overflow-y-auto">
                        {referral.redeemedBy.map((r) => (
                          <div
                            key={r.userId}
                            className="flex justify-between py-2"
                          >
                            <div>
                              <p>{r.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {r.email}
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(r.redeemedAt).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>

                {referral.redeemedBy.length >= referral.minRedemption &&
                  !referral.selfCouponCode && (
                    <CardFooter className="flex justify-end">
                      <Button onClick={handleGenerateSelfCoupon}>
                        Generate Self‑Coupon
                      </Button>
                    </CardFooter>
                  )}
              </Card>
            ) : (
              <div className="flex justify-center">
                <Button
                  onClick={handleCreateReferral}
                  disabled={loading}
                  size="lg"
                >
                  {loading ? "Creating..." : "Create Referral Code"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
