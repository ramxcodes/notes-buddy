"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import SearchInput from "./ui/search";
import { Search } from "lucide-react";
import { Notes } from "@/types/Notes-type";

const SearchContext = createContext({
  isFocused: false,
  setFocused: (focused: boolean) => {},
  query :'',
  setquery:(query:string) =>{}
});

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFocused, setFocused] = useState<boolean>(false);
  const [query, setquery] = useState<string>("");

  return (
    <SearchContext.Provider value={{ isFocused,query,setquery, setFocused }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);


const SearchBoxItem = ({data}) =>{

    return(
        <div>
            {data.title}
        </div>
    )
   
}

const SearchBox = () =>{
    const df = useSearchContext()
    const [NotesList,setNotesList] = useState<Array<Notes>>([]);

    async function FetchQuey(query:string) {
        const res = await fetch('/api/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: query }),
          })

          const resrult = await res.json()
          setNotesList(resrult)

    }

    useEffect(()=>{
        FetchQuey(df.query)
        
    },[df.query])
    return(
        <div>
            {df.isFocused ? <div>focused</div>:<div>unfous</div>}
            {NotesList.map((e,index)=>{

                return <SearchBoxItem data={e} key={index} />
            })}
        </div>
    )
}

export default function NotesSeach() {

    return (
    <div>
        <SearchProvider>
            <SearchInput
                icon={<Search size={17}/>}
            />
            <SearchBox/>
        </SearchProvider>
    </div>
  )
}



