"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MDXContent } from "@/components/notes-ui/mdx-components";
import { Tag } from "@/components/tag";
import { Brush, Flag } from "lucide-react";
import Head from "next/head";
import { useHeadingTracker } from "@/hooks/useHeadingTracker";

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
  const router = useRouter();
  const [selectedFont, setSelectedFont] = useState("font-wotfard");
  const [selectedSize, setSelectedSize] = useState("text-base");
  const [isClient, setIsClient] = useState(false);

  const storageKey = `last-read-heading-${slug}`;
  useHeadingTracker(storageKey); 

  useEffect(() => {
    setIsClient(true);
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

  const handleReportNote = () => {
    router.push(`/report-note?url=${encodeURIComponent(window.location.href)}`);
  };

  if (!isClient) return null;

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
      {/* Mobile Drawer */}
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

      {/* Desktop Dropdown Options */}
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
                className="hover:bg-gray-300 dark:hover:bg-gray-700"
                key={font.className}
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
                className="hover:bg-gray-300 dark:hover:bg-gray-700"
                key={size.className}
                onClick={() => handleSizeChange(size.className)}
              >
                {size.name}
              </DropdownMenuItem>
            ))}
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
