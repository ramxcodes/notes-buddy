import React from "react";
import ScrollBaseAnimation from "@/components/text-marquee";

function AboutSection() {
  return (
    <>
      <div className="h-[80px] md:h-[150px] lg:h-[500px] grid place-content-center w-fit">
        <ScrollBaseAnimation
          delay={500}
          baseVelocity={-2}
          classname="font-bold  leading-[110%] select-none"
        >
          Smarter Notes 🐧, Quick Answers 🏃🏻‍♀️, Flashcards 🗃️, PYQs 🤔
        </ScrollBaseAnimation>
        <ScrollBaseAnimation
          delay={500}
          baseVelocity={2}
          classname="font-bold leading-[110%]  select-none"
        >
          Study Better with Notes Buddy 😎
        </ScrollBaseAnimation>
      </div>
    </>
  );
}

export default AboutSection;
