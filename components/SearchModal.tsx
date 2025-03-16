"use client";
import React from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SearchModal: React.FC<SearchModalProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay
        className="fixed inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />
      <DialogContent className="fixed top-32 z-50 bg-background p-4 rounded-b-md shadow-lg max-w-4xl mx-auto max-h-screen">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
