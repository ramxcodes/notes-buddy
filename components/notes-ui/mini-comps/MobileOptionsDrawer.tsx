"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Brush } from "lucide-react";
import { ZenModeToggler } from "./ZenModeToggler";

interface MobileOptionsDrawerProps {
  selectedFont: string;
  selectedSize: string;
  handleFontChange: (font: string) => void;
  handleSizeChange: (size: string) => void;
  handleReportNote: () => void;
}

export function MobileOptionsDrawer({
  selectedFont,
  selectedSize,
  handleFontChange,
  handleSizeChange,
  handleReportNote,
}: MobileOptionsDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button
          variant="outline"
          className="rounded-full p-4 fixed lg:hidden bottom-10 left-10"
        >
          <Brush />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="lg:hidden">
        <DrawerHeader>
          <DrawerTitle>Options</DrawerTitle>
          <DrawerDescription>Customize your preferences</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <div className="font-bold mb-2">Change Font</div>
          {[
            { name: "Wotfard", className: "font-wotfard" },
            { name: "Gilroy", className: "font-Gilroy" },
          ].map((font) => (
            <button
              key={font.className}
              className={`w-full p-2 rounded mb-2 ${
                font.className === selectedFont
                  ? "bg-gray-300 dark:bg-gray-700"
                  : ""
              }`}
              onClick={() => handleFontChange(font.className)}
            >
              {font.name}
            </button>
          ))}

          <div className="font-bold mb-2">Change Size</div>
          {[
            { name: "Small", className: "text-sm" },
            { name: "Normal", className: "text-base" },
            { name: "Large", className: "text-lg" },
            { name: "Extra Large", className: "text-xl" },
          ].map((size) => (
            <button
              key={size.className}
              className={`w-full p-2 rounded mb-2 ${
                size.className === selectedSize
                  ? "bg-gray-300 dark:bg-gray-700"
                  : ""
              }`}
              onClick={() => handleSizeChange(size.className)}
            >
              {size.name}
            </button>
          ))}

          {/* Zen Mode Toggler */}
          <div className="my-4">
            <ZenModeToggler />
          </div>

          <DrawerFooter>
            <button
              className="w-full p-2 rounded text-red-500 font-bold"
              onClick={handleReportNote}
            >
              Report
            </button>
            <DrawerClose>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
