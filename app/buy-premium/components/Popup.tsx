"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PopupProps {
  message: React.ReactNode;
  onClose: () => void;
  showLoginButton?: boolean;
}

export function Popup({ message, onClose, showLoginButton }: PopupProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Card className="p-8 w-[90%] max-w-md rounded-lg shadow-lg space-y-4 flex flex-col items-center animate-fade-in">
        <p className="font-wotfard text-lg text-center">{message}</p>
        <div className="flex flex-row items-center justify-center space-x-4">
          {showLoginButton ? (
            <Button
              variant={"secondary"}
              onClick={onClose}
              className="px-4 py-2 rounded-md"
            >
              <Link href="/sign-in">Log In</Link>
            </Button>
          ) : (
            <Button
              variant={"outline"}
              onClick={onClose}
              className="px-4 py-2 rounded-md"
            >
              Close
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
