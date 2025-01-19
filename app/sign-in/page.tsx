/* eslint-disable @next/next/no-img-element */
"use client";

import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { signIn, signOut, useSession } from "next-auth/react";

interface Benefit {
  feature: string;
  tiers: [boolean, boolean, boolean];
}

const tierBenefits: Benefit[] = [
  { feature: "Access to One Shots", tiers: [true, true, true] },
  { feature: "Access to Quizzes of all units", tiers: [true, true, true] },
  {
    feature: "Previous Year Questions with answers",
    tiers: [false, true, true],
  },
  { feature: "Flashcards", tiers: [false, true, true] },
  { feature: "Video Material", tiers: [false, false, true] },
  { feature: "Toppers Handwritten Notes", tiers: [false, false, true] },
  { feature: "AI Chatbot (Under Development)", tiers: [false, false, true] },
];

const tierIndexMap: Record<string, number> = {
  "Tier 1": 0,
  "Tier 2": 1,
  "Tier 3": 2,
};

export default function SignInPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (session) {
    const { user } = session;
    const isFreeUser = !user.planTier || user.planTier === "Free"; // Check if the user is free
    const userTierIndex = tierIndexMap[user.planTier || "Tier 1"] ?? 0; // Default to Tier 1 for benefit mapping
    const firstName = user.name?.split(" ")[0] || "User";
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-6">
        <Card className="px-24 py-20 space-y-4 flex flex-col items-center justify-center font-wotfard">
          <img
            src={user.image || "/default-profile.png"}
            alt={`${user.name}'s profile`}
            className="w-24 h-24 rounded-full"
          />
          <h1 className="text-[2rem] lg:text-[3.5rem] md:text-[3rem] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">
            Welcome, {firstName}!
          </h1>
          <div className="text-left space-y-2 flex flex-col items-start justify-center">
            <p className="text-lg font-medium">
              University: {user.university || "Unknown"}
            </p>
            <p className="text-lg font-medium">Email: {user.email}</p>
            {!isFreeUser && (
              <>
                <p className="text-lg font-medium">
                  Purchased Plan: {user.planTier}
                </p>
                <p className="text-lg font-medium">
                  Plan Expiration:{" "}
                  {user.subscriptionEndDate
                    ? new Date(user.subscriptionEndDate).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-lg font-medium">
                  Semester Access:{" "}
                  {user.semesters && user.semesters.length > 0
                    ? user.semesters.join(", ")
                    : "No semester access"}
                </p>
                <div className="mt-4">
                  <h2 className="text-xl font-gilroy font-semibold">
                    Plan Benefits:
                  </h2>
                  <ul className="list-none pl-0 mt-2">
                    {tierBenefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-center text-lg space-x-2"
                      >
                        <span>
                          {benefit.tiers[userTierIndex] ? "✅" : "❌"}
                        </span>
                        <span>{benefit.feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            {isFreeUser && (
              <p className="text-lg font-medium text-muted-foreground">
                You are currently on a Free plan. <br /> Upgrade to enjoy
                exclusive benefits!
              </p>
            )}
          </div>
          <div className="flex flex-col space-x-0 space-y-4 md:space-y-0 md:flex md:flex-row md:space-x-4">
            <Button
              variant={"outline"}
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-600"
            >
              Sign Out
            </Button>
            <Button variant={"secondary"} className="px-4 py-2">
              <a href="/notes">View Notes</a>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6 w-full container mx-auto">
      <BlurFade delay={0.25} inView>
        <Card className="px-24 py-20 space-y-4 flex flex-col items-center justify-center">
          <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">
            Sign In
          </h1>
          <p className="font-wotfard py-2">
            Please sign in / Sign Up to continue.
          </p>
          <Button onClick={() => signIn("google")} className="px-4 py-2 ">
            <img src="/google.svg" alt="" className="size-8" /> Sign in with
            Google
          </Button>
        </Card>
      </BlurFade>
    </div>
  );
}
