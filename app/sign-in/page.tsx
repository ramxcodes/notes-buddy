"use client";

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
        <img
          src={user.image || "/default-profile.png"}
          alt={`${user.name}'s profile`}
          className="w-24 h-24 rounded-full"
        />
        <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
        <div className="text-left space-y-2">
          <p className="text-lg font-medium">University: {user.university || "N/A"}</p>
          <p className="text-lg font-medium">Purchased Plan: {user.planTier || "Free"}</p>
          <p className="text-lg font-medium">Email: {user.email}</p>
        </div>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-xl font-bold">Sign In</h1>
      <button
        onClick={() => signIn("google")}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Sign in with Google
      </button>
    </div>
  );
}
