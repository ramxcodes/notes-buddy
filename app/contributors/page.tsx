// import { PrefixTree } from "@/lib/autoCompletePrefixTree";
// import { getAllNotesVelite } from "@/lib/getNotesJson";

// export default async function page() {
//   return (
//     <section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-32">
//       <div className="container flex flex-col gap-4 text-center">
//         <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
//           Top Contributors
//         </h1>
//       </div>
//     </section>
//   );
// }



"use client";
import React from "react";
import ProfileCard from "@/components/ui/ProfileCard";

const App: React.FC = () => (
  <div>
    <ProfileCard />
  </div>
);

export default App;
