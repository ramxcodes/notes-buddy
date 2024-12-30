"use client";

import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MDXContent } from "@/components/notes-ui/mdx-components";
import { Tag } from "@/components/tag";

interface DynamicArticleProps {
  title: string;
  description?: string;
  tags?: string[];
  body: string;
  slug: string;
  currentUnit: number;
  totalUnits: number;
}

export default function DynamicArticle({
  title,
  description,
  tags,
  body,
  slug,
  currentUnit,
  totalUnits,
}: DynamicArticleProps) {
  const [selectedFont, setSelectedFont] = useState("font-CartographCf");
  const [selectedSize, setSelectedSize] = useState("text-base");

  useEffect(() => {
    const storedFont = localStorage.getItem("preferredFont");
    const storedSize = localStorage.getItem("preferredSize");
    if (storedFont) setSelectedFont(storedFont);
    if (storedSize) setSelectedSize(storedSize);
  }, []);

  const handleFontChange = (font: string) => {
    setSelectedFont(font);
    localStorage.setItem("preferredFont", font);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    localStorage.setItem("preferredSize", size);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Customize</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="px-4 py-2 font-semibold">Change Font</div>
            {[
              { name: "Wotfard", className: "font-wotfard" },
              { name: "Gilroy", className: "font-Gilroy" },
            ].map((font) => (
              <DropdownMenuItem
                key={font.className}
                onClick={() => handleFontChange(font.className)}
              >
                {font.name}
              </DropdownMenuItem>
            ))}
            <hr className="my-2" />
            <div className="px-4 py-2 font-semibold">Change Size</div>
            {[
              { name: "Small", className: "text-sm" },
              { name: "Normal", className: "text-base" },
              { name: "Large", className: "text-lg" },
              { name: "Extra Large", className: "text-2xl" },
            ].map((size) => (
              <DropdownMenuItem
                key={size.className}
                onClick={() => handleSizeChange(size.className)}
              >
                {size.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <article
        className={`container py-6 prose dark:prose-invert ${selectedFont} ${selectedSize}`}
      >
        <h1 className="mb-2">{title}</h1>
        <div className="flex gap-2 mb-2">
          {tags?.map((tag) => (
            <Tag tag={tag} key={tag} />
          ))}
        </div>
        {description && (
          <p className="text-xl mt-0 text-muted-foreground">{description}</p>
        )}
        <hr className="my-4" />
        <MDXContent
          code={body}
          currentUnit={currentUnit}
          totalUnits={totalUnits}
          slug={slug}
        />
      </article>
    </>
  );
}
