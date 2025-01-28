"use client";

import { Button } from "@/components/ui/button";
import BlurFade from "@/components/ui/blur-fade";

const BlockedComponent = () => {
  const handleSupport = () => {
    window.location.href =
      "https://whatsapp.com/channel/0029VayjCJcKWEKvVhqtjj3R";
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-6">
      <BlurFade delay={0.2} inView>
        <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold bg-gradient-to-b from-[#cf5f5f] to-[#971c1c] text-transparent bg-clip-text py-2 text-center uppercase">
          You Are Blocked
        </h1>
      </BlurFade>
      <div>
        <BlurFade delay={0.3} inView>
          <p className="mt-4 text-lg text-center max-w-2xl">
            You have been blocked by an admin and cannot access this page.
          </p>
        </BlurFade>
        <BlurFade delay={0.4} inView>
          <hr className="mt-2 mb-2" />
        </BlurFade>
        <BlurFade delay={0.4} inView>
          <ul className="list-disc list-inside mt-4 space-y-2 text-left">
            Following can be the reasons:
            <li className="mt-2">
              You were spamming our server with false requests.
            </li>
            <li>You violated our terms of service.</li>
            <li>Your account has been flagged for suspicious activities.</li>
            <li>Mujhe aapki shakal achchi nhi lagi.</li>
            <li>You were sharing your credentials and cookies unethically.</li>
          </ul>
        </BlurFade>
        <BlurFade delay={0.4} inView>
          <hr className="mt-4 mb-2" />
        </BlurFade>
      </div>

      <BlurFade delay={0.3} inView>
        <p className="mt-4 text-lg text-center max-w-2xl">
          If you think this was a mistake, please contact us via Whatsapp.
        </p>
      </BlurFade>

      <BlurFade delay={0.5} inView>
        <Button
          variant={"outline"}
          className="mt-6 hover:bg-green-500 dark:hover:bg-green-950 transition-all duration-200 ease-in flex items-center justify-center gap-2 group"
          onClick={handleSupport}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="dark:group-hover:text-green-600 group-hover:text-green-300  transition-all duration-200 ease-in"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path>
            <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"></path>
          </svg>
          <span>Whatsapp</span>
        </Button>
      </BlurFade>
    </div>
  );
};

export default BlockedComponent;
