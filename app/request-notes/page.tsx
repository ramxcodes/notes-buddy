/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popup } from "../buy-premium/components/Popup";
import { Skeleton } from "@/components/ui/skeleton";

const ERROR_MESSAGES = {
  LOGIN_REQUIRED: "Please log in to submit notes!",
  BLOCKED_USER: "You are blocked by an admin from submitting requests.",
  INVALID_PHONE: "Please enter a valid phone number.",
  SUBMISSION_FAILED: "Failed to submit the request.",
  SUBMISSION_SUCCESS: "Request submitted successfully!",
};

type FormFields = {
  university: string;
  degree: string;
  year: string;
  semester: string;
  subject: string;
  syllabus: string;
  phoneNumber: string;
};

const RequestNotesPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    university: "",
    degree: "",
    year: "",
    semester: "",
    subject: "",
    syllabus: "",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const isValidPhoneNumber = (phone: string) =>
    /^[0-9]{10,15}$/.test(phone.trim());

  const fetchBlockStatus = async () => {
    try {
      const response = await fetch(`/api/user/status`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setIsBlocked(data.blocked);

      if (data.blocked) {
        router.push("/blocked");
      }
    } catch (error) {
      console.error("Error fetching block status:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchBlockStatus();
    } else if (status === "unauthenticated") {
      setPopupMessage(ERROR_MESSAGES.LOGIN_REQUIRED);
      setShowPopup(true);
    }
  }, [status]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value } as FormFields));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (isBlocked) {
      setPopupMessage(ERROR_MESSAGES.BLOCKED_USER);
      setShowPopup(true);
      return;
    }

    if (!isValidPhoneNumber(formData.phoneNumber)) {
      setPopupMessage(ERROR_MESSAGES.INVALID_PHONE);
      setShowPopup(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/notes/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId: session?.user.id }),
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
      setFormData({
        university: "",
        degree: "",
        year: "",
        semester: "",
        subject: "",
        syllabus: "",
        phoneNumber: formData.phoneNumber,
      });
    } catch (error) {
      console.error("Submission error:", error);
      setPopupMessage(ERROR_MESSAGES.SUBMISSION_FAILED);
      setShowPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-12 w-1/3" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="min-h-screen flex flex-col justify-center space-y-6">
        <BlurFade delay={0.2} inView>
          <h1 className="text-[2.3rem] lg:text-[4.5rem] font-bold text-center py-2">
            Request Notes
          </h1>
        </BlurFade>
        <BlurFade delay={0.3} inView>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-center font-wotfard tracking-wide">Submit your notes request</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {[
                  { label: "University", name: "university" },
                  { label: "Degree", name: "degree" },
                  { label: "Year", name: "year", type: "number" },
                  { label: "Semester", name: "semester" },
                  { label: "Subject", name: "subject" },
                  { label: "Syllabus", name: "syllabus", textarea: true },
                  { label: "Phone Number", name: "phoneNumber" },
                ].map(({ label, name, type = "text", textarea }) => (
                  <div key={name} className="mb-4">
                    <Label htmlFor={name}>{label}</Label>
                    {textarea ? (
                      <Textarea
                        id={name}
                        name={name}
                        value={formData[name as keyof FormFields]}
                        onChange={handleChange}
                        required
                      />
                    ) : (
                      <Input
                        id={name}
                        name={name}
                        type={type}
                        value={formData[name as keyof FormFields]}
                        onChange={handleChange}
                        required
                      />
                    )}
                  </div>
                ))}
                <Button type="submit" disabled={isSubmitting}>
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>
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

export default RequestNotesPage;
