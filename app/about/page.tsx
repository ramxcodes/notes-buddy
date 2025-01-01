// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { siteConfig } from "@/config/site";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "About Me",
//   description: "Information about me",
// };

// export default async function AboutPage() {
//   return (
//     <section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-32">
//       <div className="container flex flex-col gap-4 text-center">
//         <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
//           About Us
//         </h1>
//       </div>
//     </section>
// );
// }
"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";

export default function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Build lamps <br /> the right way
      </motion.h1>
    </LampContainer>
  );
}
