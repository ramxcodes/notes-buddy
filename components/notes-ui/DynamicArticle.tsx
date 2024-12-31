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
import { Brush } from "lucide-react";
import Head from "next/head";

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
  const [selectedFont, setSelectedFont] = useState("font-wotfard");
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
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.19/dist/katex.min.css"
          integrity="sha384-7lU0muIg/i1plk7MgygDUp3/bNRA65orrBub4/OSWHECgwEsY83HaS1x3bljA/XV"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/katex@0.16.19/dist/katex.min.js"
          integrity="sha384-..."
          crossOrigin="anonymous"
          async
          defer
        ></script>
      </Head>
      <div className="z-auto fixed right-10 lg:right-40 top-32">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-3xl p-2 opacity-40 lg:opacity-100 dark:text-[#E6B3FF] text-[#2C0B8E] gap-2"
            >
              <Brush className="size-6 lg:size-4" />{" "}
              <span className="hidden lg:block">Change Font & Size</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="px-4 py-2 font-bold">Change Font</div>
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
            <div className="px-4 py-2 font-bold">Change Size</div>
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
        className={`container py-6 prose dark:prose-invert max-w-3xl mx-auto ${selectedFont} ${selectedSize}`}
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
