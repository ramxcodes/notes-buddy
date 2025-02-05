/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { signIn } from "next-auth/react";

export const SignInForm = () => (
  <Card className="px-24 py-20 space-y-4 flex flex-col items-center justify-center">
    <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">
      Sign In
    </h1>
    <p className="font-wotfard py-2 text-center">
      Please sign in / Sign Up to continue.
    </p>
    <Button onClick={() => signIn("google")} className="flex gap-2">
      <img src="/google.svg" alt="" className="size-6" />
      <span className="pr-2">Sign in with Google</span>
    </Button>
  </Card>
);