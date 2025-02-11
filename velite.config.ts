import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";

const computedFields = <T extends { slug: string }>(data: T) => {
  const slugParts = data.slug.split("/");
  const isIndexFile = slugParts[slugParts.length - 1] === "index";
  const slug = isIndexFile ? slugParts.slice(0, -1).join("/") : data.slug;
  return {
    ...data,
    slugAsParams: slug.replace(/^notes\//, ""),
  };
};

const posts = defineCollection({
  name: "Post",
  pattern: "notes/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      excludeFromMain: s.boolean().default(false),
      tags: s.array(s.string()).optional(),
      body: s.mdx(),
      metadata: s
        .object({
          university: s.string().optional(),
          degree: s.string().optional(),
          semester: s.string().optional(),
          subject: s.string().optional(),
          premium: s.boolean().default(false),
          contentType: s.string().optional(),
          planTier: s.string().optional(),
        })
        .optional(),
    })
    .transform(computedFields),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      [
        rehypeKatex,
        {
          output: "MathML",
        },
      ],
      rehypeSlug,
      [rehypePrettyCode, { theme: "github-dark" }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
    remarkPlugins: [
      remarkMath,
      remarkGfm,
      [remarkToc, { heading: "Table of Contents" }],
    ],
  },
});
