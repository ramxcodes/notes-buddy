import Link from "next/link";
import { Spotlight } from "../ui/spotlight";
import { HeroSlideTextEffect } from "./HeroSlideTextEffect";
import Tooltip from "./Tooltip";

export default function HeroSection() {
  return (
    <div className="h-[40rem] w-full rounded-md flex flex-col md:items-center md:justify-center dark:bg-[#010510]/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden items-start justify-center container pt-10 pb-10 lg:pt-52 lg:pb-20 mb-20">
      <Spotlight
        className="-top-40 left-0 md:left-80 md:-top-20"
        fill="purple"
      />
      <div className="text-center space-y-2 container mx-auto px-4 md:px-0">
        <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center pt-20 md:pt-0">
          Prepare Fast
          <br />
          Study Smart
        </h1>
        <div className="text-[1rem] lg:text-[1.5rem]">
          Notes Buddy is your one stop solution for{" "}
          <HeroSlideTextEffect interval={1.3} className="font-bold">
            {["Notes", "Flashcards", "One-Shots"]}
          </HeroSlideTextEffect>
        </div>
      </div>
      <div className="container lg:px-72 pt-20 flex flex-col md:flex-row items-center justify-between w-full space-y-6">
        <div className="w-1/2 lg:w-3/4 flex items-center justify-center">
          <button className="group relative h-12 rounded-full border-2 dark:border-[#9f65e2] border-[#813981] bg-gradient-to-r dark:from-[#070e41] dark:to-[#9f65e2] from-[#7642a7] to-[#09139b] px-5 text-white">
            <span className="relative inline-flex overflow-hidden">
              <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-12">
                <Link href={`/notes`}>Read Notes →</Link>
              </div>
              <div className="absolute translate-y-[114%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                <Link href={`/notes`}>Read Notes →</Link>
              </div>
            </span>
          </button>
        </div>
        <div className="w-1/2 flex flex-col md:flex-row items-center justify-center py-4">
          <Tooltip />
          <span className="text-center ml-2 py-4 text-xs text-gray-500 dark:text-gray-400">
            Rated by 1000+ students from 100+ colleges in India
          </span>
        </div>
      </div>
    </div>
  );
}
