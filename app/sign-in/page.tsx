"use client";

import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  return (
    <div className="pt-10 pb-10 lg:pt-52 lg:pb-20 mb-5 md:mb-20">
      <BlurFade delay={0.1} inView>
        <div className="w-11/12 sm:w-fit p-4 text-center sm:p-6 md:p-12 rounded-lg border border-neutral-800  mx-auto flex flex-col gap-12">
          <div>
            <p className="text-[2rem]  md:text-[2.5rem] leading-[1] font-bold ">
              Welcome Back !
            </p>

            <p className="text-sm text-gray-400 text-center mt-2">
              Start your great journey with Notes-Buddy
            </p>
          </div>

          <Button
            className="flex gap-2 items-center"
            onClick={() =>
              signIn("google", {
                redirect: true,
                redirectTo: "/notes",
              })
            }
          >
            <FcGoogle className="size-6" />
            <p className="text-gray-800 font-bold">Continue With Google</p>
          </Button>
        </div>
      </BlurFade>
    </div>
  );
}
