import React from "react";
import ScrollBaseAnimation from "@/components/text-marquee";
import BlurFade from "../ui/blur-fade";

function AboutSection() {
  return (
    <>
      <div className="h-[80px] md:h-[150px] lg:h-[500px] grid place-content-center w-fit">
        <BlurFade delay={0.1}>
          <ScrollBaseAnimation
            delay={500}
            baseVelocity={-2}
            classname="font-bold  leading-[110%] select-none"
          >
            Smarter Notes 🐧, Quick Answers 🏃🏻‍♀️, Flashcards 🗃️, PYQs 🤔
          </ScrollBaseAnimation>
        </BlurFade>
        <BlurFade delay={0.2} inView>
          <ScrollBaseAnimation
            delay={500}
            baseVelocity={2}
            classname="font-bold leading-[110%]  select-none"
          >
            Study Better with Notes Buddy 😎
          </ScrollBaseAnimation>
        </BlurFade>
      </div>
    </>
  );
}

export default AboutSection;
