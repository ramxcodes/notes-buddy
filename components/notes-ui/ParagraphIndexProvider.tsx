"use client";

import React, { createContext, useContext, useRef } from "react";

interface ParagraphCounter {
  getNextIndex: () => number;
}

const ParagraphIndexContext = createContext<ParagraphCounter | null>(null);

export const ParagraphIndexProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const counterRef = useRef(0);
  const getNextIndex = () => {
    const current = counterRef.current;
    counterRef.current += 1;
    return current;
  };
  return (
    <ParagraphIndexContext.Provider value={{ getNextIndex }}>
      {children}
    </ParagraphIndexContext.Provider>
  );
};

export function useParagraphIndex() {
  const context = useContext(ParagraphIndexContext);
  if (!context) {
    throw new Error(
      "useParagraphIndex must be used within a ParagraphIndexProvider"
    );
  }
  return context.getNextIndex;
}
