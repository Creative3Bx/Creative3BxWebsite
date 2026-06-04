import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getTaxonomy } from "@lib/taxonomyParser";
import { humanize, markdownify, slugify } from "@lib/utils/textConverter";
import Link from "next/link";
const { blog_folder } = config.settings;
import React from "react";
import { useTrail, animated } from "@react-spring/web";
import { getSinglePage } from "@lib/contentParser";
import { FaFolder } from "react-icons/fa";

const Categories = ({ categories }) => {
  // Staggered animation for the category boxes
  const trail = useTrail(categories.length, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { mass: 1, tension: 280, friction: 25 },
    delay: 200,
  });

  return (
    <Base title={"categories"}>
      <section className="section pt-0">
        {markdownify(
          "Categories",
          "h1",
          "h2 mb-16 bg-theme-light dark:bg-darkmode-theme-dark py-12 text-center lg:text-[55px]"
        )}
        <div className="container pt-12 text-center">
          <ul className="row">
            {trail.map((style, index) => (
              <animated.li
                style={style}
                key={`category-${index}`}
                className="mt-4 block lg:col-4 xl:col-3"
              >
                <Link
                  href={`/categories/${slugify(categories[index].name)}`}
                  className="flex w-full items-center justify-center rounded-lg bg-theme-light px-4 py-4 font-bold text-dark transition hover:bg-red-900 hover:text-white  dark:bg-darkmode-theme-dark dark:text-darkmode-light dark:hover:bg-red-900 dark:hover:text-white"
                >
                  <FaFolder className="mr-1.5" />
                  {humanize(categories[index].name)} ({categories[index].posts})
                </Link>
              </animated.li>
            ))}
          </ul>
        </div>
      </section>
    </Base>
  );
};

export default Categories;

export const getStaticProps = () => {
  const posts = getSinglePage(`content/${blog_folder}`);
  const categories = getTaxonomy(`content/${blog_folder}`, "categories");
  const categoriesWithPostsCount = categories.map((category) => {
    const filteredPosts = posts.filter(
      (post) =>
        post.frontmatter.categories &&
        post.frontmatter.categories.map((c) => slugify(c)).includes(category)
    );
    return {
      name: category,
      posts: filteredPosts.length,
    };
  });
  return {
    props: {
      categories: categoriesWithPostsCount,
    },
  };
};
