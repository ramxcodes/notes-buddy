import FollowCursor from "@/components/Follow-cursor";
import AboutSection from "@/components/Home/AboutSection";
import FeatureSection from "@/components/Home/FeatureSection";
import FooterSection from "@/components/Home/FooterSection";
import HeroSection from "@/components/Home/HeroSection";
import NotesSection from "@/components/Home/NotesSection";
import NotLanding from "@/components/Home/NotLanding";
import PostSection from "@/components/Home/PostSection";
import TestimonialSection from "@/components/Home/TestimonialSection";
import MarqueeSlant from "@/components/MarqueeSlant";

export default function Home() {
  return (
    <>
      <FollowCursor />
      <div className="w-screen overflow-hidden relative font-wotfard tracking-widest">
        <HeroSection />
        <AboutSection />
        <FeatureSection />
        <PostSection />
        <MarqueeSlant />
        <NotesSection />
        <TestimonialSection />
        <FooterSection />
        <NotLanding />
      </div>
    </>
  );
}
