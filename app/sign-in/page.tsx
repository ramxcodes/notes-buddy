'use client';

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold">Sign In</h1>
      <button
        onClick={() => signIn("google")}
        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Sign in with Google
      </button>
    </div>
  );
}
