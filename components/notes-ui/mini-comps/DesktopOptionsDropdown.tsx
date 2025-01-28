"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
import { ZenModeToggler } from "./ZenModeToggler";

interface DesktopOptionsDropdownProps {
  selectedFont: string;
  selectedSize: string;
  handleFontChange: (font: string) => void;
  handleSizeChange: (size: string) => void;
  handleReportNote: () => void;
}

export function DesktopOptionsDropdown({
  selectedFont,
  selectedSize,
  handleFontChange,
  handleSizeChange,
  handleReportNote,
}: DesktopOptionsDropdownProps) {
  return (
    <div className="hidden lg:block fixed right-44 top-24 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full">
            Options
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit p-4 px-8 border rounded-lg shadow-md">
          <div className="font-bold mb-2">Change Font</div>
          <hr />
          {[
            { name: "Wotfard", className: "font-wotfard" },
            { name: "Gilroy", className: "font-Gilroy" },
          ].map((font) => (
            <DropdownMenuItem
              key={font.className}
              className="hover:bg-gray-300 dark:hover:bg-gray-700"
              onClick={() => handleFontChange(font.className)}
            >
              {font.name}
            </DropdownMenuItem>
          ))}

          <div className="font-bold mb-2">Change Size</div>
          <hr />
          {[
            { name: "Small", className: "text-sm" },
            { name: "Normal", className: "text-base" },
            { name: "Large", className: "text-lg" },
            { name: "Extra Large", className: "text-xl" },
          ].map((size) => (
            <DropdownMenuItem
              key={size.className}
              className="hover:bg-gray-300 dark:hover:bg-gray-700"
              onClick={() => handleSizeChange(size.className)}
            >
              {size.name}
            </DropdownMenuItem>
          ))}

          <hr />
          {/* Zen Mode Toggler */}
          <ZenModeToggler />

          <hr />
          <div>
            <Button
              onClick={handleReportNote}
              variant="outline"
              className="text-red-500 font-bold gap-2 mt-4"
            >
              <Flag className="size-4" /> <span>Report</span>
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
