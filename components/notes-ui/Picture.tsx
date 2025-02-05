/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PictureProps {
  src: string;
  className?: string;
}

export default function Picture({
  src,
  className,
}: PictureProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <img
          src={src}
          alt="notes buddy"
          className={cn("cursor-pointer rounded-2xl", className)}
        />
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none flex items-center justify-center">
        <div className="relative w-full max-w-4xl">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75"
          >
            <X size={24} />
          </button>
          <img src={src} alt="notes buddy" className="w-full h-auto rounded-md" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
