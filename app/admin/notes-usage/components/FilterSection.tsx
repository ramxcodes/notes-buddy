"use client";

import { Dispatch, SetStateAction, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { NoteUsageItem } from "./types";

interface FilterSectionProps {
  usageData: NoteUsageItem[];

  universityFilter: string;
  setUniversityFilter: Dispatch<SetStateAction<string>>;

  degreeFilter: string;
  setDegreeFilter: Dispatch<SetStateAction<string>>;

  yearFilter: string;
  setYearFilter: Dispatch<SetStateAction<string>>;

  semesterFilter: string;
  setSemesterFilter: Dispatch<SetStateAction<string>>;

  subjectFilter: string;
  setSubjectFilter: Dispatch<SetStateAction<string>>;

  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;

  endDate: string;
  setEndDate: Dispatch<SetStateAction<string>>;

  sortField: "views" | "lastViewed";
  setSortField: Dispatch<SetStateAction<"views" | "lastViewed">>;

  sortDirection: "asc" | "desc";
  setSortDirection: Dispatch<SetStateAction<"asc" | "desc">>;
}

export function FilterSection({
  usageData,
  universityFilter,
  setUniversityFilter,
  degreeFilter,
  setDegreeFilter,
  yearFilter,
  setYearFilter,
  semesterFilter,
  setSemesterFilter,
  subjectFilter,
  setSubjectFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
}: FilterSectionProps) {
  // We'll gather unique items from usageData for the dropdowns
  const universities = useMemo(() => {
    const setU = new Set(
      usageData.map((item) => item.university).filter(Boolean)
    );
    return Array.from(setU);
  }, [usageData]);

  const degrees = useMemo(() => {
    const setD = new Set(usageData.map((item) => item.degree).filter(Boolean));
    return Array.from(setD);
  }, [usageData]);

  const years = useMemo(() => {
    const setY = new Set(usageData.map((item) => item.year).filter(Boolean));
    return Array.from(setY);
  }, [usageData]);

  const semesters = useMemo(() => {
    const setS = new Set(
      usageData.map((item) => item.semester).filter(Boolean)
    );
    return Array.from(setS);
  }, [usageData]);

  return (
    <div className="flex flex-col gap-4 mb-4">
      {/* Row 1: University, Degree, Year, Semester, Subject */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* University */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">University</label>
          <Select
            value={universityFilter}
            onValueChange={(val) => setUniversityFilter(val)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {universities.map((uni) => (
                <SelectItem key={uni} value={uni}>
                  {uni}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Degree */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Degree</label>
          <Select
            value={degreeFilter}
            onValueChange={(val) => setDegreeFilter(val)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {degrees.map((deg) => (
                <SelectItem key={deg} value={deg}>
                  {deg}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Year */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Year</label>
          <Select value={yearFilter} onValueChange={(val) => setYearFilter(val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {years.map((yr) => (
                <SelectItem key={yr} value={yr}>
                  {yr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Semester */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Semester</label>
          <Select
            value={semesterFilter}
            onValueChange={(val) => setSemesterFilter(val)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {semesters.map((sem) => (
                <SelectItem key={sem} value={sem}>
                  {sem}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subject */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Subject</label>
          <Input
            type="text"
            placeholder="Search subject"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Row 2: Date Range + Sorting */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Start Date */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Start Date</label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">End Date</label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Sort Field */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Sort Field</label>
          <Select
            value={sortField}
            onValueChange={(val: any) => setSortField(val)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Views" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="views">Views</SelectItem>
              <SelectItem value="lastViewed">Last Viewed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Direction */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Direction</label>
          <Select
            value={sortDirection}
            onValueChange={(val: any) => setSortDirection(val)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Desc" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
