'use client'

import { Button } from "@/components/ui/button";
import BlurFade from "@/components/ui/blur-fade";

const BlockedPage = () => {
  const handleSupport = () => {
    // Handle the support action (e.g., redirect to contact page or open email)
    window.location.href = "/contact-us"; // Adjust URL to your support/contact page
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <BlurFade delay={0.2} inView>
        <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold py-2 text-center">
          Access Denied
        </h1>
      </BlurFade>
      <BlurFade delay={0.3} inView>
        <p className="mt-4 text-lg text-center max-w-2xl">
          You have been blocked by an admin and cannot access this page. If you
          believe this is a mistake, please contact support.
        </p>
      </BlurFade>
      <BlurFade delay={0.4} inView>
        <Button className="mt-6" onClick={handleSupport}>
          Contact Support
        </Button>
      </BlurFade>
    </div>
  );
};

export default BlockedPage;
