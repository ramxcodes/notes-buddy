"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popup } from "../buy-premium/components/Popup";
import BlurFade from "@/components/ui/blur-fade";

const RequestNotesPage = () => {
  const { data: session, status } = useSession();

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

  useEffect(() => {
    if (status === "authenticated") {
      setFormData((prev) => ({
        ...prev,
        phoneNumber: session?.user.phoneNumber || "",
      }));
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

    if (!formData.phoneNumber || formData.phoneNumber.trim().length < 10) {
      setPopupMessage("Please enter a valid phone number.");
      setShowPopup(true);
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

      // Show success popup
      setPopupMessage("Request submitted successfully!");
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
      console.error(error);

      // Show failure popup
      setPopupMessage("Failed to submit the request.");
      setShowPopup(true);
    } finally {
      setIsSubmitting(false);
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
              <div className="mb-4">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  type="text"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
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
