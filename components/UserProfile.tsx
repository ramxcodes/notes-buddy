/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

export function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="animate-spin">👾</p>;
  }

  if (!session) {
    return (
      <Link href="/sign-in">
        <Button
          variant={"outline"}
          className="text-sm font-medium flex flex-row items-center space-x-2"
        >
          <img src="/google.svg" alt="" className="size-6" />{" "}
          <span>Sign In</span>
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <img
        src={session.user.image || "/default-profile.png"}
        alt={`${session.user.name}'s profile`}
        className="w-8 h-8 rounded-full"
      />
      <Link href="/sign-in">
        <p className="text-sm font-medium">Hello, {session.user.name}!</p>
      </Link>
    </div>
  );
}
