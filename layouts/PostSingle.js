import config from "@config/config.json";
import Base from "@layouts/Baseof";
import dateFormat from "@lib/utils/dateFormat";
import dynamic from "next/dynamic";
import { MDXRemote } from "next-mdx-remote";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegCalendar, FaUserAlt } from "react-icons/fa";
import Sidebar from "./partials/Sidebar";
import shortcodes from "./shortcodes/all";
import RelatedPosts from "./partials/RelatedPosts";
import { markdownify, slugify } from "@lib/utils/textConverter";
const { hyvor_talk } = config;
const { meta_author } = config.metadata;

// Dynamically import the Hyvor Talk Embed component with SSR turned off
// We are now directly injecting the script and using the native web component.
// The React wrapper is no longer used.
const HyvorTalkEmbed = dynamic(
  () =>
    Promise.resolve(() => {
      // This component will be a placeholder for the web component,
      // as the actual rendering is handled by the browser after script injection.
      return (
        <div id="hyvor-talk-view-container">
          <p className="mt-16">Loading comments...</p>
        </div>
      );
    }),
  { ssr: false }
);

const PostSingle = ({
  frontmatter,
  content,
  mdxContent,
  slug,
  posts,
  allCategories,
  relatedPosts,
}) => {
  let { description, title, date, image, categories } = frontmatter;
  description = description ? description : content.slice(0, 120);

  const { theme } = useTheme();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Effect to manage the Hyvor Talk embed script
  useEffect(() => {
    setIsClient(true);

    // Only inject script if Hyvor Talk is enabled and we are on the client
    if (hyvor_talk.enable && typeof window !== "undefined") {
      const scriptId = "hyvor-talk-embed-script";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://talk.hyvor.com/embed/embed.js";
        script.async = true;
        document.head.appendChild(script);
      }
    }
  }, []);

  // Ensure the Hyvor Talk web component is only rendered if enabled and on client
  const shouldRenderHyvorTalk = hyvor_talk.enable && isClient;

  return (
    <Base title={title} description={description}>
      <section className="section single-blog mt-6">
        <div className="container">
          <div className="row">
            <div className="lg:col-8">
              <article>
                <div className="relative">
                  {image && (
                    <Image
                      src={image}
                      height="500"
                      width="1000"
                      alt={title}
                      className="rounded-lg"
                      style={{ height: "auto" }}
                    />
                  )}
                  <ul className="absolute left-2 top-3 flex flex-wrap items-center">
                    {categories.map((tag, index) => (
                      <li
                        className="mx-2 inline-flex h-7 rounded-[35px] bg-red-900 px-3 text-white"
                        key={"tag-" + index}
                      >
                        <Link
                          className="capitalize"
                          href={`/categories/${slugify(tag)}`}
                        >
                          {tag}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {markdownify(title, "h1", "lg:text-[42px] mt-16")}
                <ul className="flex items-center space-x-4">
                  <li>
                    <Link
                      className="inline-flex items-center font-secondary text-xs leading-3"
                      href="/about"
                    >
                      <FaUserAlt className="mr-1.5" />
                      {meta_author}
                    </Link>
                  </li>
                  <li className="inline-flex items-center font-secondary text-xs leading-3">
                    <FaRegCalendar className="mr-1.5" />
                    {dateFormat(date)}
                  </li>
                </ul>
                <div className="content mb-16">
                  <MDXRemote {...mdxContent} components={shortcodes} />
                </div>
              </article>
              <div className="mt-16">
                {/* Hyvor Talk Comments */}
                {shouldRenderHyvorTalk && (
                  // Directly render the native Hyvor Talk web component
                  // The script injected in useEffect will find and populate this.
                  <hyvor-talk-comments
                    website-id={hyvor_talk.website_id}
                    page-id={slug} // Use page-id for the web component
                    colorscheme={theme === "dark" ? "dark" : "light"} // Use colorscheme for the web component
                    key={router.asPath} // Force re-render on navigation
                  ></hyvor-talk-comments>
                )}
              </div>
            </div>
            <Sidebar posts={posts} categories={allCategories} />
          </div>
        </div>

        <RelatedPosts posts={relatedPosts} />
      </section>
    </Base>
  );
};

export default PostSingle;
