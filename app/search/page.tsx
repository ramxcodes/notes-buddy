/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Notes } from "@/types/Notes-type";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const DetailedSearchPage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
      <SearchComponent />
    </Suspense>
  );
};

const SearchComponent: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState<Notes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const highlightQuery = (text: string, query: string | null) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) => (
      <span
        key={index}
        className={
          part.toLowerCase() === query.toLowerCase()
            ? "bg-yellow-200 dark:bg-yellow-600"
            : ""
        }
      >
        {part}
      </span>
    ));
  };

  const getSnippet = (body: string, query: string | null) => {
    if (!body) return "";
    if (!query) return body.slice(0, 150) + (body.length > 150 ? "..." : "");
    const lowerBody = body.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerBody.indexOf(lowerQuery);
    if (index === -1)
      return body.slice(0, 150) + (body.length > 150 ? "..." : "");
    const start = Math.max(0, index - 30);
    const end = Math.min(body.length, index + query.length + 30);
    return (
      (start > 0 ? "..." : "") +
      body.slice(start, end) +
      (end < body.length ? "..." : "")
    );
  };

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      try {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      }
      setLoading(false);
    }
    if (query.trim() !== "") {
      fetchResults();
    }
  }, [query]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">
        Search Results for "
        <span className="bg-gradient-to-b from-[rgb(237,240,66)] to-[rgb(134,132,11)] text-transparent bg-clip-text">
          {query}
        </span>
        "
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <ul className="space-y-4 mt-8">
          {results.map((item, index) => (
            <li key={index} className="border border-input p-4 rounded-md">
              <Link href={"/" + item.path || "/"}>
                <h2 className="text-xl font-semibold">
                  {highlightQuery(item.title, query)}
                </h2>
              </Link>
              {item.desc && (
                <p className="mt-2">{highlightQuery(item.desc, query)}</p>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                {item.tags?.map((tag, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="text-xs sm:text-sm"
                  >
                    {tag.Name}
                  </Badge>
                ))}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default DetailedSearchPage;
