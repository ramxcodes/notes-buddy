"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SearchInput from "./ui/search";
import { Search } from "lucide-react";
import { Notes } from "@/types/Notes-type";
import Link from "next/link";
import { Badge } from "./ui/badge";

interface SearchContextType {
  isFocused: boolean;
  setFocused: (focused: boolean) => void;
  query: string | null;
  setquery: (query: string | null) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isFocused, setFocused] = useState<boolean>(false);
  const [query, setquery] = useState<string | null>("");

  return (
    <SearchContext.Provider value={{ isFocused, query, setquery, setFocused }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);

interface SearchBoxItemProps {
  data: Notes;
  context: SearchContextType;
}
const SearchBoxItem = ({ data, context }: SearchBoxItemProps) => {
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

  return (
    <Link
      href={"/" + data.path || "/"}
      onClick={() => context.setFocused(false)}
      className="border border-input flex p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
    >
      <h2>{highlightQuery(data.title, context.query)}</h2>

      <div className="ml-2 flex justify-center items-center gap-2">
        {data?.tags?.map((e, index) => {
          return (
            <Badge key={index} variant="secondary">
              {e.Name}
            </Badge>
          );
        })}
      </div>
    </Link>
  );
};
interface SearchBoxProps {
  DropBox: boolean;
  className?: string;
}
const SearchBox: React.FC<SearchBoxProps> = ({ DropBox, className = "" }) => {
  const df = useSearchContext();
  const [NotesList, setNotesList] = useState<Array<Notes>>([]);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const Topclass = `relative ${
    DropBox ? "w-full mt-3" : "w-fit"
  }  ${className}`;

  async function FetchQuery(query: string | undefined | null) {
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const result = await res.json();
      setNotesList(result.slice(0, 5)); // Limit results to 5
    } catch (error) {
      // console.error("Failed to fetch search results:", error);
    }
  }

  useEffect(() => {
    if (df?.query !== "") {
      FetchQuery(df?.query);
    }
  }, [df?.query]);

useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        df?.setFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [df]);

  return (
    <div className={Topclass} ref={searchBoxRef}>
      {df?.isFocused && (
        <div className="absolute top-full left-0 z-10 flex flex-col max-h-60 min-h-fit rounded-md  mt-4 border border-input bg-background px-3 gap-2 py-2 shadow-sm overflow-y-auto w-max">
          {NotesList.length > 0 ? (
            NotesList.map((e, index) => (
              <SearchBoxItem context={df} data={e} key={index} />
            ))
          ) : df.query ? (
            <p className="text-center left-0">No result found for notes.</p>
          ) : (
            <p className="text-center">Type and search for notes</p>
          )}
        </div>
      )}
    </div>
  );
};

interface NotesSearchProps {
  DropBox: boolean;
}
export const NotesSearch: React.FC<NotesSearchProps> = ({ DropBox = true }) => {
  return (
    <div>
      <SearchProvider>
        <SearchInput icon={<Search size={17} />} />
        <SearchBox DropBox={DropBox} />
      </SearchProvider>
    </div>
  );
};
export const DropBox = () => {
  return <NotesSearch DropBox={false} />;
};
