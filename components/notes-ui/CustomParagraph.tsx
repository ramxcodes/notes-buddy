"use client";

import React from "react";
import { useParagraphIndex } from "./ParagraphIndexProvider";

import Watermark from "./Watermark";

interface CustomParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export default function CustomParagraph({
  children,
  ...props
}: CustomParagraphProps) {
  const getNextIndex = useParagraphIndex();
  const index = getNextIndex();

  return (
    <>
      <p {...props}>{children}</p>
      {index % 4 === 3 && <Watermark />}
    </>
  );
}
