import React, { useRef } from "react";
import { cn } from "@/lib/utils"; // Optional: If you already have a cn utility
import { useSearchContext } from "../NotesSeach";

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode; // Allow passing a custom icon
}

const SearchInput: React.FC<SearchInputProps> = ({ icon, className, ...props }) => {
  const fc = useSearchContext()
  const inputref = useRef()
  function HandleChange(){
    fc.setquery(inputref.current.value)
  }
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
        ref = {inputref}
        onFocus={()=>fc.setFocused(true)}
        onBlur={()=>fc.setFocused(false)}
        onChange={()=>HandleChange()}
      />
    </div>
  );
};

export default SearchInput;
