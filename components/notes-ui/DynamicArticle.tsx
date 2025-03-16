"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MDXContent } from "@/components/notes-ui/mdx-components";
import { Tag } from "@/components/tag";
import { MobileOptionsDrawer } from "./mini-comps/MobileOptionsDrawer";
import { DesktopOptionsDropdown } from "./mini-comps/DesktopOptionsDropdown";
import { ParagraphIndexProvider } from "@/components/notes-ui/ParagraphIndexProvider";
import CustomParagraph from "@/components/notes-ui/CustomParagraph";

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
  const [selectedFont, setSelectedFont] = useState(
    "font-wotfard  tracking-wider"
  );
  const [selectedSize, setSelectedSize] = useState("text-base");
  const [isClient, setIsClient] = useState(false);

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

  const customMDXComponents = {
    p: CustomParagraph,
  };

  const MDXContentWithComponents = MDXContent as React.ComponentType<
    React.ComponentProps<typeof MDXContent> & { components?: any }
  >;

  return (
    <>
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
        <ParagraphIndexProvider>
          <MDXContentWithComponents
            code={body}
            currentUnit={currentUnit}
            totalUnits={totalUnits}
            slug={slug}
            components={customMDXComponents}
          />
        </ParagraphIndexProvider>
      </article>
    </>
  );
}
