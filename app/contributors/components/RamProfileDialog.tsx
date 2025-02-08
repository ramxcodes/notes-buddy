/* eslint-disable @next/next/no-img-element */

"use client";
import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { MagicCard } from "@/components/ui/magic-card";
import { Github, Linkedin, Globe } from "lucide-react";
import Link from "next/link";

export type Contributor = {
  name: string;
  description: string;
  role: string;
  image: string;
  github: string;
  linkedin?: string;
  website?: string;
  contributions?: number;
  group?: "top" | "tech" | "notes";
};

type RamProfileDialogProps = {
  contributor: Contributor;
};

const RamProfileDialog: React.FC<RamProfileDialogProps> = ({ contributor }) => {
  const githubUsername = contributor.github.split("/").pop() || "ramxcodes";
  const handle = `@${githubUsername}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <MagicCard className="flex flex-col items-center sm:items-start p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="w-40 h-32 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={contributor.image}
                  alt={`${contributor.name} Profile Picture`}
                  className="w-full h-full object-cover"
                />
              </div>
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
                {contributor.contributions !== undefined && (
                  <p className="mt-2 text-sm text-gray-500">
                    <b>Contributions: </b> {contributor.contributions}
                  </p>
                )}
                <div className="flex justify-center sm:justify-start gap-4 mt-4">
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
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="relative">
          <img
            src="/profile/banner.jpg"
            alt="Ram Banner"
            className="w-full h-32 object-fill"
          />
          <div className="absolute -bottom-10 left-4">
            <img
              src={contributor.image}
              alt={`${contributor.name} Profile Picture`}
              className="w-20 h-20 rounded-full border-2 border-white object-cover"
            />
          </div>
        </div>

        <div className="pt-12 px-4 pb-6">
          <h2 className="text-2xl font-bold">{contributor.name}</h2>
          <p className="text-sm text-gray-500">{handle}</p>
          <p className="mt-2">{contributor.description}</p>

          <div className="flex gap-4 mt-4">
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

          <div className="mt-6">
            <p className="font-semibold">Contributions:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Created coupon code functionality</li>
              <li>Created Referral system</li>
              <li>Notes analytics system</li>
              <li>Admin Panel</li>
              <li>Online Compiler</li>
              <li>Report Note Feature</li>
              <li>Request Notes Feature</li>
              <li>Buy Premium System</li>
              <li>Notes management system</li>
              <li>and more</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RamProfileDialog;
