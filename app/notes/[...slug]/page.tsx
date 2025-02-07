import { posts } from "#site/content";
import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { hasAccess } from "@/lib/access";
import clientPromise from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import NoteUsage from "@/models/NoteUsage";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UpgradePrompt from "@/components/UpgradePrompt";

import { SlugArticle } from "./components/SlugArticle";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

export const revalidate = 3600;

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post =
    posts.find((p) => p.slugAsParams === slug) ||
    posts.find((p) => p.slugAsParams === `${slug}/index`);
  return post;
}

// ----------------------------------------

async function validateAccess(
  requiredTier: string,
  requiredSemester: string,
  requiredDegree: string
) {
  if (requiredTier === "Free") {
    return {
      errorMessage: null,
      userTier: "Free",
      userSemesters: [],
      userDegree: null,
      hasSemesterAccess: true,
      isBlocked: false,
    };
  }

  const session = await getServerSession();

  if (!session) {
    return {
      errorMessage: "You are not signed in.",
      userTier: null,
      userSemesters: [],
      userDegree: null,
      hasSemesterAccess: false,
      isBlocked: false,
    };
  }

  const db = await clientPromise;
  const usersCollection = db.db().collection("users");
  const user = await usersCollection.findOne({ email: session.user?.email });

  if (!user) {
    return {
      errorMessage: "User not found.",
      userTier: null,
      userSemesters: [],
      userDegree: null,
      hasSemesterAccess: false,
      isBlocked: false,
    };
  }

  if (user.Blocked) {
    redirect("/blocked");
  }

  const userDegree = user.degree || "Not Set";

  if (requiredDegree && user.degree !== requiredDegree) {
    return {
      errorMessage: `Access denied. Your purchased degree (${
        user.degree || "none"
      }) does not match the required degree (${requiredDegree}).`,
      userTier: user.planTier || "Free",
      userSemesters: user.semesters || [],
      userDegree,
      hasSemesterAccess: false,
      isBlocked: false,
    };
  }

  const userTier = user.planTier || "Free";
  const userSemesters: string[] = user.semesters || [];

  const tierCheck = hasAccess(userTier, requiredTier);
  const hasSemesterAccess = userSemesters.includes(requiredSemester);

  const tiers = Object.keys(tierCheck);
  const userTierIndex = tiers.indexOf(userTier);
  const requiredTierIndex = tiers.indexOf(requiredTier);

  if (!hasSemesterAccess) {
    return {
      errorMessage: `Access denied. You do not have access to the semester: "${requiredSemester}".`,
      userTier,
      userSemesters,
      userDegree,
      hasSemesterAccess: false,
      isBlocked: false,
    };
  }

  if (userTierIndex < requiredTierIndex) {
    return {
      errorMessage: `Access denied. Upgrade your subscription to at least ${requiredTier}.`,
      userTier,
      userSemesters,
      userDegree,
      hasSemesterAccess: true,
      isBlocked: false,
    };
  }

  return {
    errorMessage: null,
    userTier,
    userSemesters,
    userDegree,
    hasSemesterAccess: true,
    isBlocked: false,
  };
}

// ----------------------------------------

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
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">
          Notes not found
        </h1>
        <p className="text-xl text-center text-muted-foreground">
          Your exams last moment notes are here!
        </p>
        <div className="flex flex-row items-center justify-center space-x-4">
          <Button variant={"outline"} className="mt-4">
            <Link href="/">Home</Link>
          </Button>
          <Button variant={"secondary"} className="mt-4">
            <Link href="/notes">Go to Notes</Link>
          </Button>
        </div>
      </div>
    );
  }

  const requiredTier = post.metadata?.planTier || "Free";
  const requiredSemester = post.metadata?.semester || "Unknown";
  const requiredDegree = post.metadata?.degree || "";

  const { errorMessage, userTier, userSemesters, userDegree } =
    await validateAccess(requiredTier, requiredSemester, requiredDegree);

  if (errorMessage) {
    return (
      <div className="container mx-auto mt-20 text-center flex flex-col items-center justify-center h-screen">
        <UpgradePrompt message={errorMessage} />
        <Card className="mt-4 p-6 text-left shadow-lg rounded-lg font-gilroy">
          {!userTier ? (
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg">
                You are not signed in. Please sign in to see your plan details
                and access content.
              </p>
              <Button variant="default" className="mt-4">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Your Plan Details :
              </h2>
              <p className="text-lg mb-2">
                <strong>Your Current Plan:</strong> {userTier}
              </p>
              <p className="text-lg mb-2">
                <strong>Your Purchased Degree:</strong> {userDegree}
              </p>
              <p className="text-lg">
                <strong>Your Semester Access:</strong>{" "}
                {userSemesters.length > 0
                  ? userSemesters.join(", ")
                  : "No semester access"}
              </p>
              <hr className="mb-4 mt-4" />
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Requirement :
              </h2>
              <p className="text-lg mb-2">
                <strong>Required Plan:</strong> {requiredTier}
              </p>
              <p className="text-lg mb-2">
                <strong>Required Semester:</strong> {requiredSemester}
              </p>
              <p className="text-lg mb-2">
                <strong>Required Degree:</strong> {requiredDegree}
              </p>
            </>
          )}
        </Card>
      </div>
    );
  }

  const slug = post.slug.replace(/^notes\//, "");
  const session = await getServerSession();
  const headerList = headers();
  const forwardedFor = headerList.get("x-forwarded-for") || "";
  const ip = forwardedFor.split(",")[0] || "UNKNOWN_IP";
  await NoteUsage.create({
    noteSlug: slug,
    userEmail: session?.user?.email || null,
    ip,
  });

  const unitMatch = slug.match(/unit-(\d+)/i);
  const currentUnit = unitMatch ? parseInt(unitMatch[1], 10) : 1;

  return (
    <SlugArticle
      title={post.title}
      description={post.description || "Oops! No description found."}
      tags={post.tags}
      body={post.body}
      slug={slug}
      currentUnit={currentUnit}
      totalUnits={5}
    />
  );
}
