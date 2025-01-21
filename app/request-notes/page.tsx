"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popup } from "../buy-premium/components/Popup";
import BlurFade from "@/components/ui/blur-fade";

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
    captchaToken: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPhonePrompt, setShowPhonePrompt] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setPhoneNumber(session?.user.phoneNumber || null);
    } else if (status === "unauthenticated") {
      setPopupMessage("Please log in to submit notes!");
      setShowPopup(true);
    }
  }, [status, session]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber) {
      setShowPhonePrompt(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/notes/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: session?.user.id,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      alert("Request submitted successfully!");
      setFormData({
        university: "",
        degree: "",
        year: "",
        semester: "",
        subject: "",
        syllabus: "",
        captchaToken: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to submit the request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneSubmit = async () => {
    if (!phoneNumber || phoneNumber.trim().length < 10) {
      setPopupMessage("Please enter a valid phone number.");
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch("/api/save-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session?.user.id, phoneNumber }),
      });

      if (!response.ok) {
        throw new Error("Failed to save phone number.");
      }

      setShowPhonePrompt(false);
    } catch (error) {
      console.error(error);
      setPopupMessage("Failed to save phone number. Please try again.");
      setShowPopup(true);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <div>
        <BlurFade delay={0.2} inView>
          <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">
            Request Notes
          </h1>
        </BlurFade>
      </div>

      <BlurFade delay={0.3} inView>
        <Card className="w-full max-w-lg mt-8">
          <CardHeader>
            <CardTitle>Submit your notes request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  placeholder="Acme University"
                  name="university"
                  type="text"
                  value={formData.university}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="degree">Degree</Label>
                <Input
                  id="degree"
                  placeholder="Acme Degree"
                  name="degree"
                  type="text"
                  value={formData.degree}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  name="year"
                  placeholder="Year"
                  type="number"
                  value={formData.year}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="semester">Semester</Label>
                <Input
                  id="semester"
                  placeholder="Acme Semester"
                  name="semester"
                  type="text"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Acme Subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="syllabus">Syllabus</Label>
                <Textarea
                  id="syllabus"
                  name="syllabus"
                  placeholder="Copy/paste the syllabus here OR  Provide a public google drive link"
                  value={formData.syllabus}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </BlurFade>

      {showPhonePrompt && (
        <Popup
          message={
            <div className="space-y-4">
              <Label>Enter your phone number</Label>
              <Input
                type="text"
                value={phoneNumber || ""}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full"
              />
              <Button onClick={handlePhoneSubmit}>Submit</Button>
            </div>
          }
          onClose={() => setShowPhonePrompt(false)}
        />
      )}

      {showPopup && (
        <Popup
          message={popupMessage}
          onClose={() => setShowPopup(false)}
          showLoginButton={popupMessage === "Please log in to submit notes!"}
        />
      )}
    </div>
  );
};

export default RequestNotesPage;
