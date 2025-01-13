import { sortPosts } from "@/lib/utils";
import { PostItemBox } from "../post-item-box";
import { posts } from "@/.velite";
import BlurFade from "../ui/blur-fade";
import Link from "next/link";

export default function NotesSection() {
  const latestPosts = sortPosts(posts).slice(0, 6);
  return (
    <>
      <section className="container mx-auto pt-20 pb-20">
        <BlurFade delay={0.5} inView>
          <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[3.5rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center my-10 md:20">
            Sneak Peak of our notes <span className="text-white">👀</span>
          </h1>
        </BlurFade>
        <div className="flex justify-center">
          <ul className="gap-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-4xl">
            {latestPosts.map(
              (post) =>
                post.published && (
                  <li key={post.slug}>
                    <BlurFade delay={0.7} inView>
                      <PostItemBox
                        slug={post.slug}
                        title={post.title}
                        description={post.description}
                        tags={post.tags}
                      />
                    </BlurFade>
                  </li>
                )
            )}
          </ul>
        </div>
        <BlurFade delay={0.5} inView>
          <div className="flex items-center justify-center">
            <button className="group relative h-12 rounded-3xl border-2 dark:border-[#9f65e2] border-[#813981] bg-gradient-to-r dark:from-[#070e41] dark:to-[#9f65e2] from-[#7642a7] to-[#09139b] px-6 text-white whitespace-nowrap">
              <span className="relative inline-flex overflow-hidden">
                <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-12 whitespace-nowrap">
                  <Link href={`/notes`}>Read Notes</Link>
                </div>
                <div className="absolute translate-y-[114%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0 whitespace-nowrap">
                  <Link href={`/notes`}>Read Notes</Link>
                </div>
              </span>
            </button>
          </div>
        </BlurFade>
      </section>
    </>
  );
}
