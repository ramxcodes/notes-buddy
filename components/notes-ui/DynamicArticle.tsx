"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { useHeadingTracker } from "@/hooks/useHeadingTracker";
import { MDXContent } from "@/components/notes-ui/mdx-components";
import { Tag } from "@/components/tag";

// Import our new mini-components
import { MobileOptionsDrawer } from "./mini-comps/MobileOptionsDrawer";
import { DesktopOptionsDropdown } from "./mini-comps/DesktopOptionsDropdown";

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

      <MobileOptionsDrawer
        selectedFont={selectedFont}
        selectedSize={selectedSize}
        handleFontChange={handleFontChange}
        handleSizeChange={handleSizeChange}
        handleReportNote={handleReportNote}
      />

      <DesktopOptionsDropdown
        selectedFont={selectedFont}
        selectedSize={selectedSize}
        handleFontChange={handleFontChange}
        handleSizeChange={handleSizeChange}
        handleReportNote={handleReportNote}
      />

      {/* Article Content */}
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
