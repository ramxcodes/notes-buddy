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
        <AboutSection />
        <FeatureSection />
        <MarqueeSlant />
        <PostSection />
        <FooterSection />
      </div>
    </>
  );
}
