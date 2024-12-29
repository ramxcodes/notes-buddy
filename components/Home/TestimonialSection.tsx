import Image from "next/image";
import Marquee from "../Marquee";
import BlurFade from "../ui/blur-fade";
import { cn } from "@/lib/utils";

export default function TestimonialSection() {
  const reviews = [
    {
      name: "Dolly",
      username: "@._dollyg",
      body: "The one-shots make studying so easy!",
      img: "/avatar/1.jpg",
    },
    {
      name: "Samriddhi",
      username: "@Samriddhi_114",
      body: "The flashcards and resources are amazing!",
      img: "/avatar/2.jpg",
    },
    {
      name: "Swati Mehta",
      username: "@Swati_Mehta4",
      body: "Organized notes by year and semester are a lifesaver.",
      img: "/avatar/3.jpg",
    },
    {
      name: "Priyansh Patni",
      username: "@Priyansh_Patni8",
      body: "The resources make exam prep effortless.",
      img: "/avatar/4.jpg",
    },
    {
      name: "Aniket",
      username: "@aniket_.541",
      body: "The PYQs and detailed notes are super helpful.",
      img: "/avatar/5.jpg",
    },
    {
      name: "Ishaan Chaudhary",
      username: "@Ishh_x_ok",
      body: "Notes Buddy is perfect for smart learning.",
      img: "/avatar/6.jpg",
    },
    {
      name: "Riya",
      username: "@riya___29",
      body: "A must-have for every student. So reliable!",
      img: "/avatar/7.jpg",
    },
  ];

  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  const ReviewCard = ({
    img,
    name,
    username,
    body,
  }: {
    img: string;
    name: string;
    username: string;
    body: string;
  }) => {
    return (
      <figure
        className={cn(
          "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 transition-transform duration-300",
          "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
        )}
      >
        <div className="flex flex-row items-center gap-2">
          <Image
            className="rounded-full"
            width="32"
            height="32"
            alt=""
            src={img}
          />
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium dark:text-white">
              {name}
            </figcaption>
            <p className="text-xs font-medium dark:text-white/40">{username}</p>
          </div>
        </div>
        <blockquote className="mt-1 text-sm">{body}</blockquote>
      </figure>
    );
  };

  return (
    <>
      <section className="relative container mx-auto pt-16 pb-16">
        <BlurFade delay={0.5} inView>
          <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[3rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center my-8 md:16">
            What People Say about us <span className="text-white">🗣️</span>
          </h1>
        </BlurFade>
        <BlurFade delay={0.7} inView>
          <Marquee
            className="[--duration:20s]"
            pauseOnHover
            style={{ transform: "rotate(0deg)" }}
          >
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
        </BlurFade>
        <BlurFade delay={0.9} inView>
          <Marquee
            reverse
            className="[--duration:20s]"
            pauseOnHover
            style={{ transform: "rotate(0deg)" }}
          >
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
        </BlurFade>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </section>
    </>
  );
}
