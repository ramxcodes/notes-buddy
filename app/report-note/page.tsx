/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Popup } from "../buy-premium/components/Popup";
import BlurFade from "@/components/ui/blur-fade";
import { Skeleton } from "@/components/ui/skeleton";

const ERROR_MESSAGES = {
  LOGIN_REQUIRED: "Please log in to report notes!",
  BLOCKED_USER: "You are blocked by an admin and cannot report notes.",
  SUBMISSION_FAILED: "Failed to submit the report.",
  SUBMISSION_SUCCESS: "Report submitted successfully! We will review it soon.",
};

const ReportNotePage = () => {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto p-6">
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-14 w-full mb-6" />
          <Skeleton className="h-10 w-1/2 mb-4" />
          <Skeleton className="h-14 w-full mb-6" />
          <Skeleton className="h-10 w-1/2 mb-4" />
          <Skeleton className="h-24 w-full mb-6" />
          <Skeleton className="h-10 w-32" />
        </div>
      }
    >
      <ReportNotePageContent />
    </Suspense>
  );
};

const ReportNotePageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [noteUrl, setNoteUrl] = useState(searchParams.get("url") || "");
  const [issue, setIssue] = useState("");
  const [otherText, setOtherText] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      setPopupMessage(ERROR_MESSAGES.LOGIN_REQUIRED);
      setShowPopup(true);
    } else if (status === "authenticated" && session?.user?.Blocked) {
      setPopupMessage(ERROR_MESSAGES.BLOCKED_USER);
      setShowPopup(true);
      router.push("/blocked");
    }
  }, [status, session]);

  const handleSubmit = async () => {
    if (!issue) {
      setPopupMessage("Please select an issue.");
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch("/api/report-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          noteUrl,
          issue,
          otherText,
          userId: session?.user.id,
          userName: session?.user.name,
          userEmail: session?.user.email,
        }),
      });

      if (response.status === 403) {
        setPopupMessage(ERROR_MESSAGES.BLOCKED_USER);
        setShowPopup(true);
        return;
      }

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setPopupMessage(ERROR_MESSAGES.SUBMISSION_SUCCESS);
      setShowPopup(true);
      setOtherText("");
      setIssue("");
    } catch (error) {
      console.error("Error submitting report:", error);
      setPopupMessage(ERROR_MESSAGES.SUBMISSION_FAILED);
      setShowPopup(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="min-h-screen flex flex-col justify-center space-y-6">
        <BlurFade delay={0.2} inView>
          <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">
            Report Notes
          </h1>
        </BlurFade>
        <BlurFade delay={0.3} inView>
          <div className="space-y-4">
            <div>
              <label className="block font-bold mb-2">Notes URL</label>
              <Input
                value={noteUrl}
                readOnly={!noteUrl}
                onChange={(e) => setNoteUrl(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Select an Issue</label>
              <Select onValueChange={setIssue}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an issue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="misinformation">
                    Misinformation / Wrong Information
                  </SelectItem>
                  <SelectItem value="short-notes">
                    Notes are too short
                  </SelectItem>
                  <SelectItem value="diagrams-needed">
                    Need more diagrams
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block font-bold mb-2">
                Other Issue (Optional)
              </label>
              <Textarea
                placeholder="Describe your issue"
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
              />
            </div>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </BlurFade>
        {showPopup && (
          <Popup
            message={popupMessage}
            onClose={() => setShowPopup(false)}
            showLoginButton={popupMessage === ERROR_MESSAGES.LOGIN_REQUIRED}
          />
        )}
      </div>
    </div>
  );
};

export default ReportNotePage;
