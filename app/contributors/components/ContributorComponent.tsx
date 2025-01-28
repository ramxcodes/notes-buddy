/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MagicCard } from "@/components/ui/magic-card";
import { Github, Linkedin, Globe } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import Link from "next/link";

type Contributor = {
  name: string;
  description: string;
  role: string;
  image: string;
  github: string;
  linkedin?: string;
  website?: string;
  contributions?: number;
};

const customContributors: Omit<Contributor, "contributions">[] = [
  {
    name: "Ramkrishna Swarnkar",
    description: "Developed the entire project and deployed it.",
    role: "Full Stack Web Developer",
    image: "/profile/ram.png",
    github: "https://github.com/ramxcodes",
    linkedin: "https://linkedin.com/in/ramxcodes",
    website: "https://ramx.in",
  },
  {
    name: "Ayush Paliwal",
    description: "Developed Chatbot and versatility across platform.",
    role: "AI/ML Developer",
    image: "/profile/pali.jpeg",
    github: "https://github.com/Pali29",
    linkedin: "https://linkedin.com/in/pali29",
  },
  {
    name: "Kavyansh Yadav",
    description: "Created searching functionality.",
    role: "Full Stack Web Developer",
    image: "/profile/Kavyansh.png",
    github: "https://github.com/KavyanshYadav",
  },
  {
    name: "Taha Mill Wala",
    description: "Created notes for a semester.",
    role: "Web Developer",
    image: "/profile/taha.png",
    github: "https://github.com/Taha7838",
  },
  {
    name: "Kuhu Vyas",
    description: "Created About Us page.",
    role: "Web Developer",
    image: "/profile/kuhu.png",
    github: "https://github.com/KuhuVyas",
    linkedin: "https://www.linkedin.com/in/kuhu-vyas-643895288",
  },

  {
    name: "Jeet Solanki",
    description: "Created notes for 1 subject.",
    role: "Web Developer",
    image: "/profile/jeet.png",
    github: "https://github.com/Jeet0808",
    linkedin: "https://www.linkedin.com/in/jeet-solanki-213b52339/",
  },
  {
    name: "Ankit Kashyap",
    description: "Created authentication system.",
    role: "Full Stack Web Developer",
    image: "/profile/ankit.jpeg",
    github: "https://github.com/Kashyap1ankit",
  },
  {
    name: "Swetabh Tripathy",
    description: "Created notes for 1 subject.",
    role: "Web Developer",
    image: "/profile/swetabh.png",
    github: "https://github.com/Tswetabh",
    linkedin: "https://www.linkedin.com/in/swetabh-tripathy-49855020b/",
  },
  {
    name: "Divya Vadnere",
    description: "Created Contributors page.",
    role: "Web Developer",
    image: "/profile/divya.jpeg",
    github: "https://github.com/Doinggithub14",
    linkedin: "https://www.linkedin.com/in/divya-vadnere-a49692288",
  },
  {
    name: "Srijan Nigam",
    description: "Created notes for one semester.",
    role: "Web Developer",
    image: "/profile/srijan.png",
    github: "https://github.com/Srophos",
  },
];

export default function ContributorComponent() {
  const { theme } = useTheme();
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/ramxcodes/notes-buddy/contributors"
        );
        const data = await response.json();

        const contributorsData = customContributors.map((custom) => {
          const githubUsername = custom.github.split("/").pop();
          const githubData = data.find(
            (item: any) => item.login === githubUsername
          );

          return {
            ...custom,
            contributions: githubData ? githubData.contributions : 0,
          };
        });

        setContributors(contributorsData);
      } catch (error) {
        console.error("Failed to fetch contributors:", error);
      }
    };

    fetchContributors();
  }, []);

  return (
    <div className="container mx-auto py-16 px-4 sm:px-8 font-wotfard">
      <div className="flex flex-col gap-8 text-center mb-16">
        <BlurFade delay={0.2} inView>
          <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-4">
            Contributors
          </h1>
        </BlurFade>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {contributors.map((contributor, index) => (
          <BlurFade key={index} delay={0.1 * index} inView>
            <MagicCard
              className="cursor-pointer flex flex-col items-center sm:items-start p-6 rounded-lg shadow-md"
              gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            >
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                {/* Profile Image */}
                <div className="w-40 h-32 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={contributor.image}
                    alt={`${contributor.name} Profile Picture`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Profile Content */}
                <div className="text-center sm:text-left">
                  <h2 className="text-xl font-bold font-gilroy">
                    {contributor.name}
                  </h2>
                  <p className="text-gray-500 mt-2">
                    <span className="text-sm font-light px-4 py-2 bg-black/50 text-white rounded-lg block sm:inline">
                      {contributor.role}
                    </span>
                  </p>
                  <p className="mt-4">{contributor.description}</p>
                  {contributor.contributions && (
                    <p className="mt-2 text-sm text-gray-500">
                      <b>Contributions: </b> {contributor.contributions}
                    </p>
                  )}
                  <div className="flex justify-center sm:justify-start gap-4 mt-4">
                    {/* GitHub */}
                    <Link
                      href={contributor.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github
                        className="hover:opacity-50 opacity-100 transition-all duration-300 ease-in-out"
                        size={24}
                      />
                    </Link>
                    {/* LinkedIn */}
                    {contributor.linkedin && (
                      <Link
                        href={contributor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin
                          className="hover:opacity-50 opacity-100 transition-all duration-300 ease-in-out"
                          size={24}
                        />
                      </Link>
                    )}
                    {/* Website */}
                    {contributor.website && (
                      <Link
                        href={contributor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe
                          className="hover:opacity-50 opacity-100 transition-all duration-300 ease-in-out"
                          size={24}
                        />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </MagicCard>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
