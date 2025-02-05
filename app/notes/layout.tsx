import React, { Suspense } from "react";

interface NotesLayoutProps {
  children: React.ReactNode;
}

export default function NotesLayout({ children }: NotesLayoutProps) {
  return (
    <Suspense fallback={null}>
      {children}
    </Suspense>
  );
}
