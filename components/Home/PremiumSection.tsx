import { CheckIcon, X } from "lucide-react";
import BlurFade from "../ui/blur-fade";
import Link from "next/link";

export default function PremiumSection() {
  return (
    <section className="py-24 lg:pb-32 overflow-hidden text-neutral-800 dark:text-neutral-50 font-wotfard">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <BlurFade delay={0.2} inView>
            <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[3.5rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center my-10 md:20">
              Why Study the Hard Way? <span className="text-white">🤔</span>
            </h1>
          </BlurFade>
          <BlurFade delay={0.3} inView>
            <p className="text-2xl tracking-tight">
              Unlock the perfect guide to your preparation journey.
            </p>
          </BlurFade>
        </div>
        <BlurFade delay={0.4} inView>
          <div className="flex flex-wrap -m-6">
            {/* Tier 1 */}
            <div className="w-full md:w-1/3 p-6">
              <div className="h-full bg-white dark:bg-black/30 border border-neutral-300 dark:border-neutral-600 rounded-2xl transform-gpu hover:-translate-y-2 transition duration-500">
                <div className="p-12 border-b border-neutral-300 dark:border-neutral-600">
                  <h4 className="mb-6 text-6xl tracking-tighter">₹99/-</h4>
                  <p className="text-xl font-semibold font-gilroy mb-2">
                    Tier 1 - Noob
                  </p>
                  <p className="tracking-tight">
                    The ideal plan for newbies to start with.
                  </p>
                </div>
                <div className="p-12 pb-11">
                  <ul className="-m-1.5 mb-11">
                    <FeatureItem checked={true}>
                      Access to One Shots
                    </FeatureItem>
                    <FeatureItem checked={true}>
                      Access to Quizzes of all units
                    </FeatureItem>
                    <FeatureItem checked={false}>
                      Previous Year Questions with answers
                    </FeatureItem>
                    <FeatureItem checked={false}>Flashcards</FeatureItem>
                    <FeatureItem checked={false}>Video Material</FeatureItem>
                    <FeatureItem checked={false}>
                      Toppers Handwritten Notes
                    </FeatureItem>
                    <FeatureItem checked={false}>AI Chatbot</FeatureItem>
                  </ul>
                  <PricingButton href="/buy-premium">Buy Now</PricingButton>
                </div>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-6 ">
              <div
                className="p-px overflow-hidden rounded-2xl hover:-translate-y-2 transition duration-500 transform-gpu backdrop-blur-sm"
                style={{
                  backgroundImage: "url('/advanced-gradient.jpg')",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <div className="h-full bg-white dark:bg-black/90 rounded-2xl">
                  <div
                    className="p-12"
                    style={{
                      backgroundImage: "url('/advanced-gradient.jpg')",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="pr-9">
                      <h4 className="mb-6 text-6xl tracking-tighter">₹169/-</h4>
                      <p className="mb-2 text-xl font-semibold text-black font-gilroy">
                        Tier 2 - Pro
                      </p>
                      <p className="tracking-tight text-black">
                        The ideal plan for last minute preparation.
                      </p>
                    </div>
                  </div>
                  <div className="p-12 pb-11">
                    <ul className="-m-1.5 mb-11">
                      <FeatureItem checked={true}>
                        Access to One Shots
                      </FeatureItem>
                      <FeatureItem checked={true}>
                        Access to Quizzes of all units
                      </FeatureItem>
                      <FeatureItem checked={true}>
                        Previous Year Questions with answers
                      </FeatureItem>
                      <FeatureItem checked={true}>Flashcards</FeatureItem>
                      <FeatureItem checked={false}>Video Material</FeatureItem>
                      <FeatureItem checked={false}>
                        Toppers Handwritten Notes
                      </FeatureItem>
                      <FeatureItem checked={false}>AI Chatbot</FeatureItem>
                    </ul>
                    <PricingButton href="/buy-premium">Buy Now</PricingButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="w-full md:w-1/3 p-6">
              <div className="h-full bg-white dark:bg-black/30 border border-neutral-300 dark:border-neutral-600 rounded-2xl transform-gpu hover:-translate-y-2 transition duration-500">
                <div className="p-12 border-b border-neutral-300 dark:border-neutral-600">
                  <h4 className="mb-6 text-6xl tracking-tighter">₹199/-</h4>
                  <p className="text-xl font-semibold font-gilroy mb-2">
                    Tier 3 - Cracked
                  </p>
                  <p className="tracking-tight">
                    The ideal plan for absolute cracked students.
                  </p>
                </div>
                <div className="p-12 pb-11">
                  <ul className="-m-1.5 mb-11">
                    <FeatureItem checked={true}>
                      Access to One Shots
                    </FeatureItem>
                    <FeatureItem checked={true}>
                      Access to Quizzes of all units
                    </FeatureItem>
                    <FeatureItem checked={true}>
                      Previous Year Questions with answers
                    </FeatureItem>
                    <FeatureItem checked={true}>Flashcards</FeatureItem>
                    <FeatureItem checked={true}>Video Material</FeatureItem>
                    <FeatureItem checked={true}>
                      Toppers Handwritten Notes
                    </FeatureItem>
                    <FeatureItem checked={true}>
                      AI Chatbot (Under Development)
                    </FeatureItem>
                  </ul>
                  <PricingButton href="/buy-premium">Buy Now</PricingButton>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

const FeatureItem = ({
  children,
  checked,
}: {
  children: string;
  checked: boolean;
}) => {
  return (
    <li className="flex items-center py-1.5">
      {checked ? (
        <CheckIcon className="size-3 mr-3 text-green-500" />
      ) : (
        <X className="size-3 mr-3 text-red-500" />
      )}
      <span className="font-medium tracking-tight">{children}</span>
    </li>
  );
};

const PricingButton = ({
  href,
  children,
}: {
  href: string;
  children: string;
}) => {
  return (
    <Link
      className="inline-block px-5 py-4 w-full text-center font-semibold tracking-tight bg-transparent hover:bg-neutral-900 hover: border dark:hover:bg-white dark:hover:text-neutral-800 hover:scale-105 border-neutral-700 rounded-lg transition duration-200"
      href={href}
    >
      {children}
    </Link>
  );
};
