import React, { useCallback, useEffect, useRef } from "react";
import { cn, debounce } from "@/lib/utils";
import { useSearchContext } from "../NotesSearch";
import { useRouter } from "next/navigation";

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const SearchInput: React.FC<SearchInputProps> = ({
  icon,
  className,
  ...props
}) => {
  const fc = useSearchContext();
  const inputref = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleFocus() {
    inputref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      inputref.current?.focus();
    }, 300);
  }

  useEffect(() => {
    const focusInput = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        handleFocus();
      }
    };
    window.addEventListener("keydown", focusInput);
    return () => {
      window.removeEventListener("keydown", focusInput);
    };
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = useCallback(
    debounce(() => {
      if (inputref.current?.value) {
        fc?.setquery(inputref.current.value);
      } else {
        fc?.setquery("");
      }
    }, 400),
    [fc]
  );

  return (
    <div
      className={cn(
        "relative flex items-center w-full rounded-md border border-input bg-background px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className
      )}
    >
      <span className="absolute left-3 text-muted-foreground">{icon}</span>
      <input
        type="text"
        className="w-full bg-transparent pl-10 text-sm placeholder:text-muted-foreground focus:outline-none"
        {...props}
        ref={inputref}
        onFocus={() => fc?.setFocused(true)}
        onChange={() => handleChange()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            router.push(
              `/search?query=${encodeURIComponent(
                inputref.current?.value || ""
              )}`
            );
            fc?.setFocused(false);
          }
        }}
      />
      <span className="absolute right-3 text-muted-foreground text-sm">
        <kbd className="bg-muted-foreground/10 px-1 py-0.5 rounded-md">
          Ctrl+K
        </kbd>
      </span>
    </div>
  );
};

export default SearchInput;
