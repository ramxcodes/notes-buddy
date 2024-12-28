"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";

interface TocItem {
  text: string;
  id: string;
  subItems?: TocItem[];
}

interface TableOfContentsProps {
  code: string;
}

export function TableOfContents({ code }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll("h2"));
    const subHeadings = Array.from(document.querySelectorAll("h3"));

    const tocItems: TocItem[] = [];

    headings.forEach((heading) => {
      const headingId =
        heading.id ||
        heading.textContent?.replace(/\s+/g, "-").toLowerCase() ||
        "";

      const subItems = subHeadings
        .filter(
          (subHeading) =>
            subHeading.compareDocumentPosition(heading) &
            Node.DOCUMENT_POSITION_PRECEDING
        )
        .map((subHeading) => ({
          text: subHeading.textContent || "",
          id:
            subHeading.id ||
            subHeading.textContent?.replace(/\s+/g, "-").toLowerCase() ||
            "",
        }));

      tocItems.push({
        text: heading.textContent || "",
        id: headingId,
        subItems,
      });
    });

    setToc(tocItems);
  }, [code]);

  const handleSmoothScroll = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!toc.length) {
    return null;
  }

  return (
    <Card className="min-w-fit">
      <CardTitle className="text-center">Table of Contents</CardTitle>
      <CardContent>
        <ol className="space-y-2 list-decimal list-inside">
          {toc.map((item, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="flex-shrink-0">{index + 1}.</span>
              <button
                onClick={() => handleSmoothScroll(item.id)}
                className="hover:text-gray-700 hover:underline transition-colors duration-150 text-left"
              >
                {item.text}
              </button>

              {/*TODO: Add subitems LATER */}
              {/* {item.subItems && item.subItems.length > 0 && (
                <ul className="ml-4 space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <button
                        onClick={() => handleSmoothScroll(subItem.id)}
                        className="hover:text-blue-800 transition duration-200 underline"
                      >
                        {subItem.text}
                      </button>
                    </li>
                  ))}
                </ul>
              )} */}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
