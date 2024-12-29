import { sortPosts } from "@/lib/utils";
import { PostItemBox } from "../post-item-box";
import { posts } from "@/.velite";
import BlurFade from "../ui/blur-fade";

export default function NotesSection() {
  const latestPosts = sortPosts(posts).slice(0, 7);
  return (
    <>
      <section className="container mx-auto pt-20 pb-20">
        <BlurFade delay={0.5} inView>
          <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[3.5rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center my-10 md:20">
            Sneak Peak of our notes <span className="text-white">👀</span>
          </h1>
        </BlurFade>
        <ul className="gap-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
      </section>
    </>
  );
}
