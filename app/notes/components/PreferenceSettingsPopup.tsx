"use client";

import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { posts } from "#site/content";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";

interface PreferenceSettingsPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (preferences: {
    university: string;
    degree: string;
    semester: string;
  }) => void;
  initialPreferences: { university: string; degree: string; semester: string };
}

const PreferenceSettingsPopup: React.FC<PreferenceSettingsPopupProps> = ({
  open,
  onOpenChange,
  onSave,
  initialPreferences,
}) => {
  const { data: session } = useSession();
  const [selectedUniversity, setSelectedUniversity] = useState(
    initialPreferences.university
  );
  const [selectedDegree, setSelectedDegree] = useState(
    initialPreferences.degree
  );
  const [selectedSemester, setSelectedSemester] = useState(
    initialPreferences.semester
  );

  const universities = useMemo(() => {
    return Array.from(
      new Set(
        posts
          .map((post) => post.metadata?.university)
          .filter((u): u is string => !!u)
      )
    );
  }, []);

  const degrees = useMemo(() => {
    return selectedUniversity
      ? Array.from(
          new Set(
            posts
              .filter(
                (post) => post.metadata?.university === selectedUniversity
              )
              .map((post) => post.metadata?.degree)
              .filter((d): d is string => !!d)
          )
        )
      : [];
  }, [selectedUniversity]);

  const semesters = useMemo(() => {
    return selectedUniversity && selectedDegree
      ? Array.from(
          new Set(
            posts
              .filter(
                (post) =>
                  post.metadata?.university === selectedUniversity &&
                  post.metadata?.degree === selectedDegree
              )
              .map((post) => post.metadata?.semester)
              .filter((s): s is string => !!s)
          )
        )
      : [];
  }, [selectedUniversity, selectedDegree]);

  const handleSave = async () => {
    if (!session) {
      window.location.href = "/sign-in";
      return;
    }
    if (selectedUniversity && selectedDegree && selectedSemester) {
      Cookies.set("notesPreference_university", selectedUniversity);
      Cookies.set("notesPreference_degree", selectedDegree);
      Cookies.set("notesPreference_semester", selectedSemester);

      try {
        const response = await fetch("/api/preferences", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            university: selectedUniversity,
            degree: selectedDegree,
            semester: selectedSemester,
          }),
        });
        if (!response.ok) {
          console.error("Failed to save preference to DB");
        }
      } catch (error) {
        console.error("Error saving preference to DB:", error);
      }

      onSave({
        university: selectedUniversity,
        degree: selectedDegree,
        semester: selectedSemester,
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Your Preferences</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>{selectedUniversity || "Select University"}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {universities.map((uni) => (
                <DropdownMenuItem
                  key={uni}
                  onClick={() => {
                    setSelectedUniversity(uni);
                    setSelectedDegree("");
                    setSelectedSemester("");
                  }}
                >
                  {uni}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button disabled={!selectedUniversity}>
                {selectedDegree || "Select Degree"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {degrees.map((deg) => (
                <DropdownMenuItem
                  key={deg}
                  onClick={() => {
                    setSelectedDegree(deg);
                    setSelectedSemester("");
                  }}
                >
                  {deg}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button disabled={!selectedDegree}>
                {selectedSemester || "Select Semester"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {semesters.sort().map((sem) => (
                <DropdownMenuItem
                  key={sem}
                  onClick={() => setSelectedSemester(sem)}
                >
                  {sem}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSave}
            disabled={
              !(selectedUniversity && selectedDegree && selectedSemester)
            }
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreferenceSettingsPopup;
