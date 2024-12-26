import { posts } from "#site/content";
import { PostItemBox } from "@/components/post-item-box";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, getPostsByTagSlug, sortTagsByCount } from "@/lib/utils";
import { slug } from "github-slugger";
import { Metadata } from "next";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = params;
  return {
    title: tag,
    description: `Posts on the topic of ${tag}`,
  };
}

export const generateStaticParams = () => {
  const tags = getAllTags(posts);
  const paths = Object.keys(tags).map((tag) => ({ tag: slug(tag) }));
  return paths;
};

export default function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const title = tag.split("-").join(" ");

  const allPosts = getPostsByTagSlug(posts, tag);
  const displayPosts = allPosts.filter((post) => post.published);
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="container max-w-4xl py-6 lg:py-10 mb-5">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl capitalize">
            {title}
          </h1>
        </div>
      </div>

      <hr className="my-6" />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search By :</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {sortedTags?.map((t) => (
            <Tag tag={t} key={t} count={tags[t]} current={slug(t) === tag} />
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {displayPosts?.length > 0 ? (
          displayPosts.map((post) => {
            const { slug, title, description, tags } = post;
            return (
              <PostItemBox
                key={slug}
                slug={slug}
                title={title}
                description={description}
                tags={tags}
              />
            );
          })
        ) : (
          <p className="col-span-1 md:col-span-2 lg:col-span-3">
            Nothing to see here yet
          </p>
        )}
      </div>
    </div>
  );
}
