import Link from "next/link";
import { Spotlight } from "../ui/spotlight";
import { HeroSlideTextEffect } from "./HeroSlideTextEffect";
import Tooltip from "./Tooltip";

export default function HeroSection() {
  return (
    <div className="h-[40rem] w-full rounded-md flex flex-col md:items-center md:justify-center dark:bg-[#010510]/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden items-start justify-center container pt-10 pb-10 lg:pt-20 lg:pb-20 mb-20">
      <Spotlight
        className="-top-40 left-0 md:left-80 md:-top-20"
        fill="purple"
      />
      <div className="text-center space-y-2 container mx-auto px-4 md:px-0">
        <h1 className="h1-style">
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
          <Link
            href={`/notes`}
            className="bg-purple-500 text-white px-4 py-2 rounded-full text-center hover:bg-purple-600 w-44 block text-lg font-medium"
          >
            Read Notes →
          </Link>
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
