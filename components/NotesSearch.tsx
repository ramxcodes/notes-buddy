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
import SearchModal from "./SearchModal";

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

const SearchBoxItem = ({ data, context }: SearchBoxItemProps) => {
  return (
    <Link
      href={"/" + data.path || "/"}
      onClick={() => context.setFocused(false)}
      className="border border-input flex flex-col p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md w-full max-w-[90vw] sm:max-w-3xl"
    >
      <h2 className="text-sm sm:text-base">
        {highlightQuery(data.title, context.query)}
      </h2>
      {data.desc && (
        <p className="mt-1 text-xs sm:text-sm line-clamp-2">
          {highlightQuery(data.desc || '', context.query)}
        </p>
      )}
      <div className="ml-1 sm:ml-2 flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-2">
        {data?.tags?.map((e, index) => (
          <Badge key={index} variant="secondary" className="text-xs sm:text-sm">
            {e.Name}
          </Badge>
        ))}
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

  const Topclass = `relative ${DropBox ? "w-full mt-3" : "w-fit"} ${className}`;

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
      setNotesList(result.slice(0, 6));
    } catch (error) {
      return [];
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
        <div className="absolute z-10 flex flex-col max-h-60 min-h-fit rounded-md mt-4 border border-input bg-background px-3 gap-2 py-2 shadow-sm w-max">
          {NotesList.length > 0 ? (
            NotesList.map((e, index) => (
              <SearchBoxItem context={df} data={e} key={index} />
            ))
          ) : df.query ? (
            <p className="text-center">No result found for notes.</p>
          ) : (
            <p className="text-center">
              Type and search for notes.
              <br />
              Press `Enter` for detailed search.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

interface NotesSearchProps {
  DropBox: boolean;
}

const SearchWithModal: React.FC<{ DropBox: boolean }> = ({ DropBox }) => {
  const searchContext = useSearchContext();
  return (
    <>
      {searchContext?.isFocused ? (
        <SearchModal
          open={true}
          onClose={() => searchContext.setFocused(false)}
        >
          <SearchInput icon={<Search size={17} />} />
          <SearchBox DropBox={DropBox} />
        </SearchModal>
      ) : (
        <>
          <SearchInput icon={<Search size={17} />} />
          <SearchBox DropBox={DropBox} />
        </>
      )}
    </>
  );
};

export const NotesSearch: React.FC<NotesSearchProps> = ({ DropBox = true }) => {
  return (
    <div>
      <SearchProvider>
        <SearchWithModal DropBox={DropBox} />
      </SearchProvider>
    </div>
  );
};

export const DropBox = () => {
  return <NotesSearch DropBox={false} />;
};
