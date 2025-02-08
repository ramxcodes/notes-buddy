"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { posts } from "#site/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotesSearch } from "@/components/NotesSearch";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import BlurFade from "@/components/ui/blur-fade";
import TagError from "@/components/TagError";
import dynamic from "next/dynamic";
import { PostItemBox } from "@/components/post-item-box";

const QueryPagination = dynamic(
  () =>
    import("@/components/query-pagination").then((mod) => mod.QueryPagination),
  { ssr: false }
);

const POSTS_PER_PAGE = 6;

function NotesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filter states
  const [selectedUniversity, setSelectedUniversity] = useState<string>(
    searchParams.get("university") || ""
  );
  const [selectedDegree, setSelectedDegree] = useState<string>(
    searchParams.get("degree") || ""
  );
  const [selectedSemester, setSelectedSemester] = useState<string>(
    searchParams.get("semester") || ""
  );
  const [selectedSubject, setSelectedSubject] = useState<string>(
    searchParams.get("subject") || ""
  );
  const [selectedType, setSelectedType] = useState<string>(
    searchParams.get("type") || ""
  );
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );

  // Update URL parameters when filters change.
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedUniversity) params.set("university", selectedUniversity);
    if (selectedDegree) params.set("degree", selectedDegree);
    if (selectedSemester) params.set("semester", selectedSemester);
    if (selectedSubject) params.set("subject", selectedSubject);
    if (selectedType) params.set("type", selectedType);
    params.set("page", currentPage.toString());
    router.replace(`?${params.toString()}`);
  }, [
    selectedUniversity,
    selectedDegree,
    selectedSemester,
    selectedSubject,
    selectedType,
    currentPage,
    router,
  ]);

  // Reset functions: when a parent filter is changed, clear only the filters that come after it.
  function resetAfterUniversity() {
    setSelectedDegree("");
    setSelectedSemester("");
    setSelectedSubject("");
    setSelectedType("");
  }
  function resetAfterDegree() {
    setSelectedSemester("");
    setSelectedSubject("");
    setSelectedType("");
  }
  function resetAfterSemester() {
    setSelectedSubject("");
    setSelectedType("");
  }
  function resetAfterSubject() {
    setSelectedType("");
  }

  // Compute available options from posts data.
  const universities = useMemo(
    () =>
      Array.from(
        new Set(
          posts
            .map((post) => post.metadata?.university)
            .filter((u): u is string => !!u)
        )
      ),
    []
  );

  const degrees = useMemo(
    () =>
      Array.from(
        new Set(
          posts
            .filter((post) => post.metadata?.university === selectedUniversity)
            .map((post) => post.metadata?.degree)
            .filter((d): d is string => !!d)
        )
      ),
    [selectedUniversity]
  );

  const semesters = useMemo(
    () =>
      Array.from(
        new Set(
          posts
            .filter(
              (post) =>
                post.metadata?.university === selectedUniversity &&
                post.metadata?.degree === selectedDegree
            )
            .map((post) => post.metadata?.semester)
            .filter((s): s is string => !!s)
        )
      ),
    [selectedUniversity, selectedDegree]
  );

  const subjects = useMemo(
    () =>
      Array.from(
        new Set(
          posts
            .filter(
              (post) =>
                post.metadata?.university === selectedUniversity &&
                post.metadata?.degree === selectedDegree &&
                post.metadata?.semester === selectedSemester
            )
            .map((post) => post.metadata?.subject)
            .filter((s): s is string => !!s)
        )
      ),
    [selectedUniversity, selectedDegree, selectedSemester]
  );

  const types: string[] =
    selectedUniversity && selectedDegree && selectedSemester && selectedSubject
      ? Array.from(
          new Set(
            posts
              .filter(
                (post) =>
                  post.metadata?.university === selectedUniversity &&
                  post.metadata?.degree === selectedDegree &&
                  post.metadata?.semester === selectedSemester &&
                  post.metadata?.subject === selectedSubject
              )
              .map((post) =>
                post.metadata?.contentType
                  ? post.metadata!.contentType
                  : "Notes"
              )
          )
        )
      : [];

  // Filtering logic for posts.
  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        const matchesUniversity =
          !selectedUniversity ||
          post.metadata?.university === selectedUniversity;
        const matchesDegree =
          !selectedDegree || post.metadata?.degree === selectedDegree;
        const matchesSemester =
          !selectedSemester || post.metadata?.semester === selectedSemester;
        const matchesSubject =
          !selectedSubject || post.metadata?.subject === selectedSubject;
        const matchesType =
          !selectedType ||
          (selectedType === "Notes"
            ? !post.metadata?.contentType
            : post.metadata?.contentType === selectedType);
        return (
          post.published &&
          !post.excludeFromMain &&
          matchesUniversity &&
          matchesDegree &&
          matchesSemester &&
          matchesSubject &&
          matchesType
        );
      }),
    [
      selectedUniversity,
      selectedDegree,
      selectedSemester,
      selectedSubject,
      selectedType,
    ]
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const displayPosts = useMemo(
    () =>
      filteredPosts.slice(
        POSTS_PER_PAGE * (currentPage - 1),
        POSTS_PER_PAGE * currentPage
      ),
    [filteredPosts, currentPage]
  );

  return (
    <div className="container max-w-4xl py-6 lg:py-10 font-wotfard">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">
              Welcome to Notes Buddy!
            </h1>
            <p className="text-xl text-center text-muted-foreground">
              Your exams last moment notes are here!
            </p>
            <NotesSearch DropBox={true} />
          </div>
        </div>
      </Suspense>

      {/* "Search By:" card with primary filters */}
      <Card className="my-10">
        <CardHeader>
          <CardTitle className="font-gilroy">Search By :</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row gap-4 items-center justify-center">
          <div className="flex flex-col md:flex-row gap-4 w-3/4 font-gilroy font-bold text-pretty tracking-wide dark:text-[#dbdbdb]">
            {/* University Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>{selectedUniversity || "Select University"}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {universities.map((uni) => (
                  <DropdownMenuItem
                    key={uni}
                    onClick={() => {
                      setSelectedUniversity(uni);
                      resetAfterUniversity();
                    }}
                  >
                    {uni}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Degree Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button disabled={!selectedUniversity}>
                  {selectedDegree || "Select Degree"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {degrees.map((deg) => (
                  <DropdownMenuItem
                    key={deg}
                    onClick={() => {
                      setSelectedDegree(deg);
                      resetAfterDegree();
                    }}
                  >
                    {deg}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Semester Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button disabled={!selectedDegree}>
                  {selectedSemester || "Select Semester"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {semesters.sort().map((sem) => (
                  <DropdownMenuItem
                    key={sem}
                    onClick={() => {
                      setSelectedSemester(sem);
                      resetAfterSemester();
                    }}
                  >
                    {sem}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Subject Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button disabled={!selectedSemester}>
                  {selectedSubject || "Select Subject"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {subjects.map((sub) => (
                  <DropdownMenuItem
                    key={sub}
                    onClick={() => {
                      setSelectedSubject(sub);
                      resetAfterSubject();
                    }}
                  >
                    {sub}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Type Filter */}
      {selectedUniversity &&
        selectedDegree &&
        selectedSemester &&
        selectedSubject && (
          <div className="flex flex-col md:flex-row gap-4 justify-start mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>{selectedType || "Select Type"}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  key="all-type"
                  onClick={() => setSelectedType("")}
                >
                  All Types
                </DropdownMenuItem>
                {types.map((type) => (
                  <DropdownMenuItem
                    key={type}
                    onClick={() => setSelectedType(type)}
                  >
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

      {/* Posts List */}
      <div className="flex flex-col gap-4">
        <hr />
        {displayPosts.length > 0 ? (
          <ul className="gap-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {displayPosts.map((post) => {
              const { slug, title, description, tags } = post;
              return (
                <li
                  key={slug}
                  className="border border-border rounded-xl dark:border-0"
                >
                  <BlurFade delay={0.1} inView>
                    <PostItemBox
                      slug={slug}
                      title={title}
                      description={description}
                      tags={tags}
                      premium={post.metadata?.premium}
                    />
                  </BlurFade>
                </li>
              );
            })}
          </ul>
        ) : (
          <TagError />
        )}
        <QueryPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          className="justify-end mt-4"
        />
      </div>
    </div>
  );
}

function NotesPageComponent() {
  return (
    <Suspense fallback={<div>Loading Notes...</div>}>
      <NotesContent />
    </Suspense>
  );
}

export default NotesPageComponent;
