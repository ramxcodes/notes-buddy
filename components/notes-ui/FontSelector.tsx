"use client";

import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface FontSelectorProps {
  onFontChange: (font: string) => void;
}

export default function FontSelector({ onFontChange }: FontSelectorProps) {
  const [selectedFont, setSelectedFont] = useState("font-CartographCf");

  useEffect(() => {
    const storedFont = localStorage.getItem("preferredFont");
    if (storedFont) {
      setSelectedFont(storedFont);
      onFontChange(storedFont); // Update the parent with the stored font
    }
  }, [onFontChange]);

  const handleFontChange = (font: string) => {
    setSelectedFont(font);
    localStorage.setItem("preferredFont", font);
    onFontChange(font); // Update the parent with the new font
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {selectedFont === "font-CartographCf" ? "Cartograph CF" : "Gilroy"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleFontChange("font-CartographCf")}>
          Cartograph CF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleFontChange("font-Gilroy")}>
          Gilroy
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
