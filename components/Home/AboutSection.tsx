import React from "react";
import ScrollBaseAnimation from "@/components/text-marquee";

function AboutSection() {
  return (
    <>
      <div className="h-[250px] lg:h-[500px] grid place-content-center">
        <ScrollBaseAnimation
          delay={500}
          baseVelocity={-3}
          classname="font-bold tracking-[-0.07em] leading-[90%] bg-gradient-to-r from-gray-800 to-gray-400 bg-clip-text text-transparent select-none"
        >
          Smarter Notes, Quick Answers, Flashcards, PYQs
        </ScrollBaseAnimation>
        <ScrollBaseAnimation
          delay={500}
          baseVelocity={3}
          classname="font-bold tracking-[-0.07em] leading-[90%] bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent select-none"
        >
          Study Better with Notes Buddy
        </ScrollBaseAnimation>
      </div>
    </>
  );
}

export default AboutSection;
