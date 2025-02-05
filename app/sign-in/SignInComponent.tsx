"use client";

import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import {
  AuthButtons,
  LoadingSkeleton,
  PlanBenefits,
  SignInForm,
  UpgradePrompt,
  UserProfile,
} from "./components";
import BlurFade from "@/components/ui/blur-fade";
import { Card } from "@/components/ui/card";

export default function SignInComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") return <LoadingSkeleton />;

  if (session) {
    const { user } = session;
    const isFreeUser = user.planTier === "Free";
    const firstName = user.name?.split(" ")[0] || "User";

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-4xl p-8 space-y-6">
          <UserProfile user={user} firstName={firstName} />

          {!isFreeUser ? (
            <PlanBenefits
              planTier={user.planTier || "Free"}
              subscriptionEndDate={
                user.subscriptionEndDate
                  ? new Date(user.subscriptionEndDate)
                  : undefined
              }
              semesters={user.semesters}
            />
          ) : (
            <UpgradePrompt />
          )}

          <AuthButtons onSignOut={() => signOut()} />
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full container mx-auto p-4">
      <BlurFade delay={0.25} inView>
        <SignInForm />
      </BlurFade>
    </div>
  );
}
