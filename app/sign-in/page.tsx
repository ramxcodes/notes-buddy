"use client";

import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { signIn, signOut, useSession } from "next-auth/react";

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
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-6">
        <Card className="px-24 py-20 space-y-4 flex flex-col items-center justify-center font-wotfard">
          <img
            src={user.image || "/default-profile.png"}
            alt={`${user.name}'s profile`}
            className="w-24 h-24 rounded-full"
          />
          <h1 className="text-[2rem] lg:text-[3.5rem] md:text-[3rem] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">
            Welcome, {user.name}!
          </h1>
          <div className="text-left space-y-2 flex flex-col items-start justify-center">
            <p className="text-lg font-medium">
              University:{" "}
              {user.university || "Hogwarts School of Witchcraft (NaN) "}
            </p>
            <p className="text-lg font-medium">
              Purchased Plan: {user.planTier || "Free"}
            </p>
            <p className="text-lg font-medium">Email: {user.email}</p>
          </div>
          <Button
            variant={"outline"}
            onClick={() => signOut()}
            className="px-4 py-2 "
          >
            Sign Out
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
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
