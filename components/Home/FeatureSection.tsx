import Image from "next/image";
import React from "react";

function FeatureSection() {
  return (
    <div className="pt-10 pb-10 lg:pt-20 lg:pb-20">
      <h1 className="h1-style my-4">Why Notes Buddy?</h1>
      <div className="container mx-auto px-10 py-8">
        <section className="grid md:grid-cols-3 gap-6 max-md:max-w-xs mx-auto ">
          <div className="group  bg-gradient-to-t from-[#242424] to-[#020202] hover:from-[#182135] hover:to-[#080808] relative before:absolute before:inset-0 before:bg-[url('/noise.gif')] before:opacity-5 rounded-2xl border ">
            <div className="relative">
              <div className="px-6 py-5">
                <div className="group-hover:bg-blue-400 bg-white transition-all duration-500 ease-in-out w-fit px-3 rounded-full text-sm py-1 text-black group-hover:text-white mb-1">
                  Concepts
                </div>
                <span className="text-lg group-hover:hidden inline-block font-semibold pt-2 text-slate-200 mb-1 transition-all duration-500 ease-in-out">
                  Overwhelmed with Complexity
                </span>
                <span className="text-lg group-hover:inline-block hidden font-semibold pt-2 text-slate-200 mb-1 transition-all duration-500 ease-in-out">
                  Clarity Over Complexity
                </span>
                <p className="text-sm text-slate-500">
                  Notes Buddy simplifies concepts for deeper and better
                  understanding.
                </p>
              </div>
              <div className="flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-500 ease-in-out">
                <Image
                  className="group-hover:opacity-0 transition-opacity duration-500 object-cover h-full m-0 p-0"
                  src="/featured/card-1-b.png"
                  width={350}
                  height={240}
                  alt="Card Before"
                />
                <Image
                  className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity object-cover duration-300 h-full m-0 p-0"
                  src="/featured/card-1-a.png"
                  width={350}
                  height={240}
                  alt="Card After"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
          <div className="group  bg-gradient-to-t from-[#050a0a] to-[#051818] hover:from-[#05070a] hover:to-[#0b1a3b] relative before:absolute before:inset-0 before:bg-[url('/noise.gif')] before:opacity-5 rounded-2xl border ">
            <div className="relative">
              <div className="px-6 py-5">
                <div className="bg-green-400 group-hover:bg-blue-600  transition-all duration-500 ease-in-out w-fit px-3 rounded-full text-sm py-1 text-white mb-1">
                  AI
                </div>
                <span className="text-lg group-hover:hidden inline-block font-semibold pt-2 text-slate-200 mb-1 transition-all duration-500 ease-in-out">
                  Answers at Your Fingertips
                </span>
                <span className="text-lg group-hover:inline-block hidden font-semibold pt-2 text-slate-200 mb-1 transition-all duration-500 ease-in-out">
                  Doubts Left Unanswered
                </span>
                <p className="text-sm text-slate-500">
                  Our AI answers your questions instantly, helping you learn
                  faster.
                </p>
              </div>
              <div className="flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-500 ease-in-out">
                <Image
                  className="group-hover:opacity-0 transition-opacity duration-500"
                  src="/featured/card-2-a.png"
                  width={350}
                  height={240}
                  alt="Card image 01"
                />
                <Image
                  className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  src="/featured/card-2-b.png"
                  width={350}
                  height={240}
                  alt="Card image 01 displaying on hover"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
          <div className="group  bg-gradient-to-t from-[#171c35] to-[#000000] hover:from-[#2b131e] hover:to-[#141414] relative before:absolute before:inset-0 before:bg-[url('/noise.gif')] before:opacity-5  rounded-2xl border ">
            <div className="relative">
              <div className="px-6 py-5">
                <div className="bg-blue-400 group-hover:bg-red-500 transition-all duration-500 ease-in-out w-fit px-3 rounded-full text-sm py-1 text-white mb-1">
                  Speed
                </div>
                <span className="text-lg group-hover:hidden inline-block font-semibold pt-2 text-slate-200 mb-1 transition-all duration-500 ease-in-out">
                  Fast and Efficient Learning
                </span>
                <span className="text-lg group-hover:inline-block hidden font-semibold pt-2 text-slate-200 mb-1 transition-all duration-500 ease-in-out">
                  Slow and Time-Consuming
                </span>
                <p className="text-sm text-slate-500">
                  Notes Buddy accelerates learning with quick, focused
                  resources.
                </p>
              </div>
              <div className="flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-500 ease-in-out">
                <Image
                  className="group-hover:opacity-0 transition-opacity duration-500"
                  src="/featured/card-3-a.png"
                  width={350}
                  height={240}
                  alt="Card image 01"
                />
                <Image
                  className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  src="/featured/card-3-b.png"
                  width={350}
                  height={240}
                  alt="Card image 01 displaying on hover"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default FeatureSection;
