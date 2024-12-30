"use client";
import React from "react";
import { useTheme } from "next-themes";
import { MagicCard } from "@/components/ui/magic-card";
import ProfileCard from "@/components/ui/ProfileCard";
import SearchInput from "@/components/ui/search";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/contributor-table";

const Page: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="container mx-auto py-12;
      font-family: var(--font-Gilroy); ">
      {/* Header Section */}
      <div className="container flex flex-col gap-4 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
          Top Contributors
        </h1>
      </div>

      {/* Top Contributors Section */}
      <section className="grid md:grid-cols-3 gap-6 max-md:max-w-xs mx-auto">
        {/* Magic Cards wrapping Profile Cards */}
        <MagicCard
          className="cursor-pointer flex items-center justify-center shadow-2xl"
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
          <ProfileCard />
        </MagicCard>
        <MagicCard
          className="cursor-pointer flex items-center justify-center shadow-2xl"
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
          <ProfileCard />
        </MagicCard>
        <MagicCard
          // className="cursor-pointer flex items-center justify-center shadow-2xl"
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
          <ProfileCard />
        </MagicCard>
      </section>

      {/* Search Input */}
      <SearchInput />

      {/* Table Section */}
      <div>
        <Table>
          <TableCaption>List of recent contributors.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Contributor</TableHead>
              <TableHead className="text-center">PR Merges</TableHead>
              <TableHead className="text-right">Commits</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">John Doe</TableCell>
              <TableCell className="text-center">5</TableCell>
              <TableCell className="text-right">20</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Jane Smith</TableCell>
              <TableCell className="text-center">3</TableCell>
              <TableCell className="text-right">15</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Alice Johnson</TableCell>
              <TableCell className="text-center">8</TableCell>
              <TableCell className="text-right">30</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
