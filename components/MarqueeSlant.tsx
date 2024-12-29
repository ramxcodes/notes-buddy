import Image from "next/image";
import Marquee from "./Marquee";
import BlurFade from "./ui/blur-fade";

const reviews = [
  {
    name: "First Year Notes",
    username: "@notesbuddy",
    body: "Comprehensive notes for first-year B.Tech students.",
    img: "/marquee/marquee-1.png",
    link: "/tags/1st-Year",
  },
  {
    name: "Second Year Notes",
    username: "@notesbuddy",
    body: "Detailed notes to ace your second-year subjects.",
    img: "/marquee/marquee-2.png",
    link: "/tags/2nd-Year",
  },
  {
    name: "Third Year Notes",
    username: "@notesbuddy",
    body: "Expertly crafted notes for third-year engineering.",
    img: "/marquee/marquee-3.png",
    link: "/tags/3rd-Year",
  },
  {
    name: "Fourth Year Notes",
    username: "@notesbuddy",
    body: "All the resources you need for your final year.",
    img: "/marquee/marquee-4.png",
    link: "/tags/4th-Year",
  },
];

// Shuffle the reviews to randomize marquee content
const shuffledReviews = [...reviews, ...reviews].sort(
  () => Math.random() - 0.5
);
const firstRow = shuffledReviews.slice(0, shuffledReviews.length / 4);
const secondRow = shuffledReviews.slice(
  shuffledReviews.length / 4,
  shuffledReviews.length / 2
);
const thirdRow = shuffledReviews.slice(
  shuffledReviews.length / 2,
  (3 * shuffledReviews.length) / 4
);
const fourthRow = shuffledReviews.slice((3 * shuffledReviews.length) / 4);

const ReviewCard = ({
  img,
  name,
  username,
  body,
  link,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
  link: string;
}) => {
  return (
    <a href={link}>
      <div className="w-full mx-auto rounded-lg shadow-md border">
        <Image
          src={img}
          alt={name}
          width={500}
          height={500}
          className="w-full h-52 object-top object-cover rounded-lg mb-4"
        />
        <div className="px-4">
          <h2 className="text-lg font-bold text-secondary-900 dark:text-gray-100 mb-2">
            {name}
          </h2>
          <p className="text-sm text-secondary-900 dark:text-gray-100 mb-4">
            {body}
          </p>
        </div>
      </div>
    </a>
  );
};

const MarqueeSlant = () => {
  return (
    <>
      <BlurFade delay={1.1} inView>
        <div className="relative flex h-screen flex-row items-center justify-center overflow-hidden rounded-lg gap-6 w-full">
          <Marquee pauseOnHover vertical className="[--duration:15s]">
            {firstRow.map((review, index) => (
              <ReviewCard key={`${review.username}-${index}`} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical className="[--duration:18s]">
            {secondRow.map((review, index) => (
              <ReviewCard key={`${review.username}-${index}`} {...review} />
            ))}
          </Marquee>
          <Marquee pauseOnHover vertical className="[--duration:20s]">
            {thirdRow.map((review, index) => (
              <ReviewCard key={`${review.username}-${index}`} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical className="[--duration:22s]">
            {fourthRow.map((review, index) => (
              <ReviewCard key={`${review.username}-${index}`} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white dark:from-[#01050E]"></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-[#01050E]"></div>
        </div>
      </BlurFade>
    </>
  );
};

export default MarqueeSlant;
