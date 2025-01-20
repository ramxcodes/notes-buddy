"use client";

import React from "react";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { CardBody, CardContainer } from "@/components/ui/3d-card";
import { Spotlight } from "@/components/ui/spotlight";
import BlurFade from "@/components/ui/blur-fade";

export default function AboutSection() {
  const [refSection1, inViewSection1] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [refSection2, inViewSection2] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const controls = useAnimation();

  React.useEffect(() => {
    if (inViewSection1) controls.start("visible");
    if (inViewSection2) controls.start("visible");
  }, [inViewSection1, inViewSection2, controls]);

  return (
    <div className="font-sans">
      <Spotlight
        className="-top-40 left-0 md:left-20 lg:left-40 xl:left-80 md:-top-20"
        fill="indigo"
      />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center overflow-hidden rounded-md max-w-screen-xl mx-auto px-4 py-8 sm:py-16">
        <BlurFade delay={0.5} inView>
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-purple-500 dark:to-cyan-200 text-transparent bg-clip-text">
            About Us
          </h1>
          <h2 className="text-lg md:text-xl lg:text-2xl text-center text-gray-800 dark:text-white mt-4 md:mt-6 lg:mt-8 px-4 md:px-12 lg:px-24">
            Welcome to NotesBuddy👋, think of us as your nerdy best friend 🤝 who
            loves simplifying tough concepts into clear, and bite-sized
            notes—no stress, no drama!👍🏻💫
          </h2>
        </BlurFade>
      </section>

      {/* What NotesBuddy Is */}
      <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 max-w-screen-xl mx-auto px-4 py-8 sm:py-16">
        <div>
          <motion.div
            ref={refSection1}
            variants={slideInFromLeft(0.5)}
            initial="hidden"
            animate={controls}
            className="text-2xl md:text-4xl lg:text-5xl font-bold dark:text-white"
          >
            <span>
              What
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-purple-500 dark:to-cyan-200">
                {" "}NotesBuddy{" "}
              </span>
              is?
            </span>
          </motion.div>
          <motion.p
            variants={slideInFromLeft(0.5)}
            initial="hidden"
            animate={controls}
            className="text-base md:text-lg lg:text-xl text-gray-800 dark:text-white mt-4 leading-relaxed"
          >
            We take the headache out of learning by turning boring 💤,
            complicated notes into fun 🎉, simplified AI-driven notes 📓.
            Whether you&apos;re cramming for exams or just trying to make sense
            of your textbooks📚, NotesBuddy has got your back🤚🏻. Think of us as
            the superhero cape 🦸🏻 you wear to conquer academics—without the
            stress, but with a lot of style! 🎓💡
          </motion.p>
        </div>
        <motion.div
          variants={slideInFromTop(0.8)}
          initial="hidden"
          animate={controls}
          className="flex justify-center items-center"
        >
          <CardContainer>
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-purple-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] lg:w-[24rem] xl:w-[30rem] h-auto rounded-xl p-4 border">
              <Image
                src="/about-card/card-1.png"
                height={1000}
                width={1000}
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardBody>
          </CardContainer>
        </motion.div>
      </section>

      {/* Why We Built It */}
      <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 max-w-screen-xl mx-auto px-4 py-8 sm:py-16">
        <motion.div
          variants={slideInFromTop(2.0)}
          initial="hidden"
          animate={controls}
          className="flex justify-center items-center order-last lg:order-first"
        >
          <CardContainer>
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-xl dark:hover:shadow-purple-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] lg:w-[24rem] xl:w-[30rem] h-auto rounded-xl p-4 border">
              <Image
                src="/about-card/card-2.png"
                height={1000}
                width={1000}
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardBody>
          </CardContainer>
        </motion.div>
        <div>
          <motion.div
            ref={refSection2}
            variants={slideInFromRight(1.5)}
            initial="hidden"
            animate={controls}
            className="text-2xl md:text-4xl lg:text-5xl font-bold dark:text-white mb-4"
          >
            <span>
              Why we
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-purple-500 dark:to-cyan-200">
                {" "}Built{" "}
              </span>
              it?
            </span>
          </motion.div>
          <motion.p
            variants={slideInFromRight(1.5)}
            initial="hidden"
            animate={controls}
            className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-white leading-relaxed"
          >
            We started NotesBuddy because, let’s face it, studying shouldn’t feel
            like deciphering ancient hieroglyphs!🍂 We’ve been there—lost in piles
            of notes, wondering 💭 what’s important and what’s just noise🔉.
            That’s why we decided to create a space where students like you can
            find notes that are simple, clear, and to the point🎯. No jargon, no
            fluff, just the stuff you need to shine💫. Because we believe learning
            should be smart, not hard. 😎🚀
          </motion.p>
        </div>
      </section>
    </div>
  );
}
