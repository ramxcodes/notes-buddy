"use client";

import { useSession } from "next-auth/react";
import React from "react";

const messages = [
  "Keep going, you're doing great!",
  "Awesome work, keep it up!",
  "You're making progress, well done!",
  "Stay motivated and keep learning!",
  "Great job, every step counts!",
];

const anonMessages = ["You're on the right path! Log in to unlock all notes."];

export default function Watermark() {
  const { data: session } = useSession();
  const randomIndex = Math.floor(Math.random() * messages.length);

  if (session?.user) {
    return (
      <div className="mt-4 text-left text-xs text-muted-foreground opacity-40">
        <p>
          Hey {session.user.name} ({session.user.email}), {messages[randomIndex]}
        </p>
        {session.user.planTier === "Free" && (
          <p>
            You are on {session.user.planTier} plan. Consider upgrading it to unlock more benefits like quizzes, Flashcards, One-shots, Topper&apos;s handwritten notes & more!.
          </p>
        )}
        {/* NEW CODE HERE */}
      </div>
    );
  }
  return (
    <div className="mt-4 text-left text-xs text-muted-foreground">
      <p>
        (Hey Anon, you&apos;re doing great!)
        <br />
        {anonMessages[0]}
      </p>
    </div>
  );
}
