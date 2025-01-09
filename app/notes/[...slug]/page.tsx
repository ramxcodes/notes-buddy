import { posts } from "#site/content";
import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import ScrollProgress from "@/components/notes-ui/ScrollProcess";
import DynamicArticle from "@/components/notes-ui/DynamicArticle";
import { Button } from "@/components/ui/button";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");

  const post =
    posts.find((post) => post.slugAsParams === slug) ||
    posts.find((post) => post.slugAsParams === `${slug}/index`);

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post || (!post.published && !post.excludeFromMain)) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">
            Notes not found
          </h1>
          <p className="text-xl text-center text-muted-foreground">
            Your exams last moment notes are here!
          </p>
          <div className="flex flex-row items-center justify-center space-x-4">
            <Button variant={"outline"} className="mt-4">
              <a href="/">Home</a>
            </Button>
            <Button variant={"secondary"} className="mt-4">
              <a href="/notes">Go to Notes</a>
            </Button>
          </div>
        </div>
      </>
    );
  }

  const slug = post.slug.replace(/^notes\//, "");
  const unitMatch = slug.match(/unit-(\d+)/i);
  const currentUnit = unitMatch ? parseInt(unitMatch[1], 10) : 1;

  const { metadata } = post;
  const hierarchicalDetails = metadata
    ? `${metadata.university} > ${metadata.degree} > ${metadata.semester} > ${metadata.subject}`
    : null;

  return (
    <>
      <ScrollProgress />
      <DynamicArticle
        title={post.title}
        description={post.description}
        tags={post.tags}
        body={post.body}
        slug={slug}
        currentUnit={currentUnit}
        totalUnits={5}
      />
    </>
  );
}
