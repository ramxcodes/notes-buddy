/* eslint-disable @next/next/no-img-element */
import { Card } from "@/components/ui/card";
import { Session } from "next-auth";

interface UserProfileProps {
  user: Session["user"];
  firstName: string;
}

export const UserProfile = ({ user, firstName }: UserProfileProps) => (
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
        University: {user.university || "Probably Medicaps? (Not sure)"}
      </p>
      <p className="text-lg font-medium">Email: {user.email}</p>
    </div>
  </Card>
);