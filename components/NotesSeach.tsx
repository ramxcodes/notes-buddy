"use client"
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import SearchInput from "./ui/search";
import { Search } from "lucide-react";
import { Notes } from "@/types/Notes-type";
import { useRouter } from 'next/router';
import Link from "next/link";
import { Badge } from "./ui/badge";


interface SearchContextType {
  isFocused: boolean;
  setFocused: (focused: boolean) => void;
  query: string | null;
  setquery: (query: string | null) => void;
}


const SearchContext = createContext<SearchContextType | undefined>(undefined);


export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFocused, setFocused] = useState<boolean>(false);
  const [query, setquery] = useState<string | null>("");

  return (
    <SearchContext.Provider value={{ isFocused,query,setquery, setFocused }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);

interface SearchBoxItemProps {
  data: Notes;
  context :SearchContextType
}
const SearchBoxItem = ({data,context}:SearchBoxItemProps) =>{

    return(
        <Link href={"/"+data.path || '/'} onClick={()=>context.setFocused(false)} className="border border-input hover:text-black   flex p-3 hover:bg-gray-100 rounded-md">
            <h2>{data.title}</h2>
            
            <div className="ml-auto flex justify-center items-center gap-2">
              {data?.tags?.map((e,index)=>{
                return(
                 <Badge key={index} variant="secondary">{e.Name}</Badge>
                )
              })}
            </div>
        </Link>
    )
   
}
interface SearchBoxProps {
  DropBox: boolean
  className?:string
}
const SearchBox: React.FC<SearchBoxProps> = ({ DropBox, className = "" }) => {
  const df = useSearchContext();
  const [NotesList, setNotesList] = useState<Array<Notes>>([]);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const [alignLeft, setAlignLeft] = useState(true); 

  const Topclass = `relative ${DropBox ? "w-full mt-3" : "w-fit"}  ${className}`;

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
      setNotesList(result);
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
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        df?.setFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [df]);

  useEffect(() => {
    function checkAlignment() {
      if (searchBoxRef.current) {
        const rect = searchBoxRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        setAlignLeft(rect.right <= viewportWidth);
      }
    }

    checkAlignment();
    window.addEventListener("resize", checkAlignment);
    return () => {
      window.removeEventListener("resize", checkAlignment);
    };
  }, []);

  return (
    <div className={Topclass} ref={searchBoxRef}>
      {df?.isFocused && (
        <div
          className={`absolute top-full ${
            alignLeft ? "left-0" : "right-0"
          } z-10 flex flex-col max-h-60 ${
            DropBox ? "w-full" : "w-fit"
          } rounded-md  mt-4 border border-input bg-background px-3 gap-2 py-2 shadow-sm overflow-y-auto`}
        >
          {NotesList.map((e, index) => (
            <SearchBoxItem context={df} data={e} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};


interface NotesSeachProps{
  DropBox:boolean
}
export const NotesSeach:React.FC<NotesSeachProps> =({DropBox = true}) =>{
    return (
    <div>
        <SearchProvider>
            <SearchInput
                icon={<Search size={17}/>}
            />
            <SearchBox DropBox={DropBox} />
        </SearchProvider>
    </div>
  )
}
export const DropBox =() =>{
  return (
  <NotesSeach DropBox={false}/>
)
}




