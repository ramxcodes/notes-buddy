import { TextShimmer } from "../ui/text-shimmer";

export function HeroShimmerTextEffect() {
  return (
    <TextShimmer
      duration={1.2}
      className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance [--base-color:theme(colors.yellow.400)] [--base-gradient-color:theme(colors.yellow.200)] dark:[--base-color:theme(colors.yellow.700)] dark:[--base-gradient-color:theme(colors.yellow.400)]"
    >
      Notes Buddy
    </TextShimmer>
  );
}
