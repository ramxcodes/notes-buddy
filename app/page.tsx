import FollowCursor from "@/components/Follow-cursor";
import AboutSection from "@/components/Home/AboutSection";
import FeatureSection from "@/components/Home/FeatureSection";
import FooterSection from "@/components/Home/FooterSection";
import HeroSection from "@/components/Home/HeroSection";
import PostSection from "@/components/Home/PostSection";
import MarqueeSlant from "@/components/MarqueeSlant";
import { Sparkles } from "@/components/Sparkles";

export default function Home() {
  return (
    <>
      <FollowCursor />
      <div className="w-screen overflow-hidden relative">
        <HeroSection />
        <div className="relative -mt-32 h-80 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#6d388a,transparent_90%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[10%] after:border-t after:border-[#6d388a] after:bg-[#b060dbbe] dark:after:bg-[#4b275f]">
          <Sparkles
            density={800}
            speed={1.2}
            size={3}
            direction="top"
            opacitySpeed={2}
            color="#440467"
            className="absolute inset-x-0 bottom-0 h-full w-full "
          />
        </div>
        <AboutSection />
        <FeatureSection />
        <MarqueeSlant />
        <PostSection />
        <FooterSection />
      </div>
    </>
  );
}
