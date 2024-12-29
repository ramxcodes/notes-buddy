import Link from "next/link";
import { Spotlight } from "../ui/spotlight";
import { HeroSlideTextEffect } from "./HeroSlideTextEffect";
import Tooltip from "./Tooltip";
import BlurFade from "../ui/blur-fade";
import AnimatedShinyText from "../ui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="h-[40rem] w-full rounded-md flex flex-col md:items-center md:justify-center dark:bg-[#010510]/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden items-start justify-center container pt-10 pb-10 lg:pt-52 lg:pb-20 mb-5 md:mb-20">
      <Spotlight
        className="-top-40 left-0 md:left-80 md:-top-20"
        fill="purple"
      />
      <div className="text-center space-y-2 container mx-auto px-4 md:px-0">
        <BlurFade delay={0.25} inView>
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 select-none border rounded-full">
            <span>✨ Welcome to Notes buddy</span>
            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </BlurFade>
        <BlurFade delay={0.3} inView>
          <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">
            Prepare Fast
            <br />
            Study Smart <span className="text-white">😎</span>
          </h1>
        </BlurFade>
        <BlurFade delay={0.5} inView>
          <div className="text-[1rem] lg:text-[1.5rem]">
            Notes Buddy is your one stop solution for{" "}
            <HeroSlideTextEffect interval={1.3} className="font-bold">
              {["Notes", "Flashcards", "One-Shots"]}
            </HeroSlideTextEffect>
          </div>
        </BlurFade>
      </div>
      <BlurFade delay={0.7} inView>
        <div className="container lg:px-72 pt-20 flex flex-col md:flex-row items-center justify-between w-full space-y-6">
          <div className="w-1/2 lg:w-3/4 flex items-center justify-center">
            <button className="group relative h-12 rounded-full border-2 dark:border-[#9f65e2] border-[#813981] bg-gradient-to-r dark:from-[#070e41] dark:to-[#9f65e2] from-[#7642a7] to-[#09139b] px-6 text-white whitespace-nowrap">
              <span className="relative inline-flex overflow-hidden">
                <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-12 whitespace-nowrap">
                  <Link href={`/notes`}>Read Notes</Link>
                </div>
                <div className="absolute translate-y-[114%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0 whitespace-nowrap">
                  <Link href={`/notes`}>Read Notes</Link>
                </div>
              </span>
            </button>
          </div>
          <div className="w-1/2 flex flex-col md:flex-row items-center justify-center py-4">
            <Tooltip />
            <span className="text-center pl-4 py-4 text-xs text-gray-500 dark:text-gray-400">
              Rated by 1000+ students from 100+ colleges in India
            </span>
          </div>
        </div>
      </BlurFade>
    </div>
  );
}
