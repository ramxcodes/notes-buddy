"use client";

import React from "react";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { CardBody, CardContainer } from "@/components/ui/3d-card";
import { Spotlight } from "@/components/ui/spotlight";
import BlurFade from "@/components/ui/blur-fade";

export default function AboutSection() {
    const [refSection1, inViewSection1] = useInView({ threshold: 0.2, triggerOnce: true });
    const [refSection2, inViewSection2] = useInView({ threshold: 0.2, triggerOnce: true });
    const controls = useAnimation();

    React.useEffect(() => {
        if (inViewSection1) controls.start("visible");
        if (inViewSection2) controls.start("visible");
    }, [inViewSection1, inViewSection2, controls]);

    return (
        <div style={{ fontFamily: 'var(--font-Wotfard)' }}>
            <Spotlight className="-top-40 left-0 md:left-80 md:-top-20" fill="indigo" />

            <div className="h-[40rem] w-full dark:bg flex flex-col items-center justify-center overflow-hidden rounded-md">
                <BlurFade delay={0.5} inView>
                <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center relative z-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-purple-500 dark:to-cyan-200 text-transparent bg-clip-text">
  About Us
</h1>
                    <h2 className="md:text-2xl text-xl lg:text-3xl text-center text-gray-800 dark:text-white mx-8 md:mx-20 lg:mx-40 mt-4 mb-4 pt-14 ">
                    Welcome to NotesBuddy👋, think of us as your nerdy best friend 🤝 who loves simplifying tough concepts into clear, and bite-sized notes—no stress, no drama!👍🏻💫
                    </h2>
                </BlurFade>
            </div>

            <div className="display-flex items-center mx-15 my-8">
                <div className="mx-40">
                    <motion.div
                        ref={refSection1}
                        variants={slideInFromLeft(0.5)}
                        initial="hidden"
                        animate={controls}
                        className="flex flex-col px-10 md:text-5xl text-2xl lg:text-7xl font-bold dark:text-white max-w-[600px]">
                        <span>
                            What
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-purple-500 dark:to-cyan-200"> NotesBuddy </span>
                            is?
                        </span>
                    </motion.div>

                    <motion.p
                        variants={slideInFromLeft(0.5)}
                        initial="hidden"
                        animate={controls}
                        className=" md:text-lg text-xl lg:text-2xl text-gray-700 text-left dark:text-white px-10 mt-4 mb-4 pt-14 leading-relaxed"
                    >
                        We take the headache out of learning by turning boring 💤, complicated notes into fun 🎉, simplified AI-driven notes 📓. Whether you&apos;re cramming for exams or just trying to make sense of your textbooks📚, NotesBuddy has got your back🤚🏻. Think of us as the superhero cape 🦸🏻 you wear to conquer academics—without the stress, but with a lot of style! 🎓💡
                    </motion.p>

                    {/* <motion.a
                        variants={slideInFromRight(1)}
                        initial="hidden"
                        animate={controls}
                        className="py-2 space-x-4 dark:text-white cursor-pointer rounded-lg max-w-[200px]"
                    >
                        <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-md font-semibold leading-6 text-white inline-block">
                            <span className="absolute inset-0 overflow-hidden rounded-full">
                                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            </span>
                            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
                                <Link href={`/`}>Home Page</Link>
                            </div>
                            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-purple-500/0 via-cyan-400/90 to-cyan-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                        </button>

                        <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-md font-semibold leading-6 text-white inline-block">
                            <span className="absolute inset-0 overflow-hidden rounded-full">
                                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(25,125,168,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            </span>
                            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
                                <Link href={`/notes`}>View Notes</Link>
                            </div>
                            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-purple-500/0 via-cyan-400/90 to-cyan-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                        </button>
                    </motion.a> */}
                </div>

                <motion.div
                    variants={slideInFromTop(0.8)}
                    initial="hidden"
                    animate={controls}
                    className="col-span-1 flex justify-center items-center"
                >
                    <CardContainer>
                        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-purple-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                            <Image
                                src="/featured/card-3-b.png"
                                height={1000}
                                width={1000}
                                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                alt="thumbnail"
                            />
                        </CardBody>
                    </CardContainer>
                </motion.div>
            </div>

            <div className="mx-40">
                <motion.div
                    ref={refSection2}
                    variants={slideInFromRight(1.5)}
                    initial="hidden"
                    animate={controls}
                    className="flex flex-col px-10 md:text-5xl text-2xl lg:text-7xl font-bold dark:text-white max-w-[600px]"
                >
                    <span>
                        Why we
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-purple-500 dark:to-cyan-200"> Built </span>
                        it?
                    </span>
                </motion.div>
                <motion.p
                    variants={slideInFromRight(1.5)}
                    initial="hidden"
                    animate={controls}
                    className="md:text-lg text-xl lg:text-2xl text-gray-700 text-left dark:text-white px-10 mt-4 mb-4 pt-12 leading-relaxed"
                >
                    We started NotesBuddy because, let’s face it, studying shouldn’t feel like deciphering ancient hieroglyphs!🍂 We’ve been there—lost in piles of notes, wondering 💭 what’s important and what’s just noise🔉. That’s why we decided to create a space where students like you can find notes that are simple, clear, and to the point🎯. No jargon, no fluff, just the stuff you need to shine💫. Because we believe learning should be smart, not hard. 😎🚀
                </motion.p>
                <motion.div
                    variants={slideInFromTop(2.0)}
                    initial="hidden"
                    animate={controls}
                    className="col-span-1 flex justify-center items-center"
                >
                    <CardContainer>
                        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-xl dark:hover:shadow-purple-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                            <Image
                                src="/featured/card-3-b.png"
                                height={1000}
                                width={1000}
                                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                alt="thumbnail"
                            />
                        </CardBody>
                    </CardContainer>
                </motion.div>
            </div>
        </div>
    );
}
