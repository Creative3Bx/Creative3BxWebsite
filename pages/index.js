import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import Pagination from "@layouts/components/Pagination";
import Post from "@layouts/partials/Post";
import Sidebar from "@layouts/partials/Sidebar";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import dateFormat from "@lib/utils/dateFormat";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify, slugify } from "@lib/utils/textConverter";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";
import React from "react";
import { useSpring, animated, useTrail } from "@react-spring/web";
import styles from "../styles/genralstyles.module.css";
import Head from "next/head";

const { blog_folder, pagination } = config.settings;

const Home = ({
  banner,
  posts,
  featured_posts,
  recent_posts,
  categories,
  promotion,
}) => {
  // define state
  const sortPostByDate = sortByDate(posts);
  const featuredPosts = sortPostByDate.filter(
    (post) => post.frontmatter.featured
  );
  const showPosts = pagination;

  // Reusable hook for scroll-triggered animations
  const useScrollAnimation = (
    threshold = 0.1,
    config = { tension: 170, friction: 26 }
  ) => {
    const [ref, setRef] = React.useState(null);
    const [inView, setInView] = React.useState(false);

    const animation = useSpring({
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0px)" : "translateY(40px)",
      config,
    });

    React.useEffect(() => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target); // Animate only once
          }
        },
        { threshold }
      );

      observer.observe(ref);
      return () => observer.disconnect();
    }, [ref, threshold]);

    return [setRef, animation];
  };

  // Animation for the banner text
  const bannerTextAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 200,
  });

  // Animation for the banner image
  const bannerImageAnimation = useSpring({
    from: { opacity: 0, transform: "scale(0.9)" },
    to: { opacity: 1, transform: "scale(1)" },
    delay: 400,
  });

  // Scroll animations for page sections
  const [featuredRef, featuredAnimation] = useScrollAnimation();
  const [promotionRef, promotionAnimation] = useScrollAnimation();
  const [recentRef, recentAnimation] = useScrollAnimation();
  const [servicesRef, servicesAnimation] = useScrollAnimation();

  return (
    <>
      <Head>
        {banner.image && <link rel="preload" href={banner.image} as="image" />}
      </Head>
      <Base>
        {/* Banner */}
        <section className="section banner relative pb-0">
          <ImageFallback
            className="absolute bottom-0 left-0 z-[-1] w-full"
            src={"/images/banner-bg-shape.svg"}
            width={1905}
            height={295}
            alt="banner-shape"
            priority
          />

          <div className="container">
            <div className="row flex-wrap-reverse items-center justify-center lg:flex-row">
              <animated.div
                style={bannerTextAnimation}
                className="mt-12 text-center lg:col-6 lg:mt-0 lg:text-left"
              >
                <div>
                  <div className="banner-title">
                    {markdownify(banner.title, "h1")}
                    {markdownify(banner.title_small, "span")}
                  </div>
                  {markdownify(banner.content, "p", "mt-4")}
                  {/* Contact us button */}
                  <Link
                    className="ml-10"
                    href={banner.contactButton.link}
                    rel={banner.contactButton.rel}
                  >
                    <button className={styles.contactusBtn}>
                      {banner.contactButton.label}
                      <span className={styles.arrow}>
                        <svg
                          fill="rgb(183, 128, 255)"
                          viewBox="0 0 320 512"
                          height="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path>
                        </svg>
                      </span>
                    </button>
                  </Link>
                </div>
              </animated.div>
              <div className="col-9 lg:col-6">
                <animated.div style={bannerImageAnimation}>
                  <ImageFallback
                    className="mx-auto rounded-3xl object-contain"
                    src={banner.image}
                    width={548}
                    height={443}
                    priority={true}
                    alt="Banner Image"
                  />
                </animated.div>
              </div>
            </div>
          </div>
        </section>

        {/* Home main */}
        <section className="section">
          <div className="container">
            <div className="row items-start">
              <div className="mb-12 lg:col-8 lg:mb-0">
                {/* Featured posts */}
                {featured_posts.enable && (
                  <animated.div
                    style={featuredAnimation}
                    ref={featuredRef}
                    className="section"
                  >
                    {markdownify(featured_posts.title, "h2", "section-title")}
                    {markdownify(
                      featured_posts.subtitle,
                      "h3",
                      "sub-section-title"
                    )}
                    <div className="rounded border border-border p-6 dark:border-darkmode-border">
                      <div className="row">
                        <div className="md:col-6">
                          <Post post={featuredPosts[0]} />
                        </div>
                        <div className="scrollbar-w-[10px] mt-8 max-h-[480px] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-border md:col-6 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-darkmode-theme-dark md:mt-0">
                          {featuredPosts
                            .slice(1, featuredPosts.length)
                            .map((post, i, arr) => (
                              <div
                                className={`mb-6 flex items-center pb-6 ${
                                  i !== arr.length - 1 &&
                                  "border-b border-border dark:border-darkmode-border"
                                }`}
                                key={`key-${i}`}
                              >
                                {post.frontmatter.image && (
                                  <ImageFallback
                                    className="mr-3 h-[85px] rounded object-cover"
                                    src={post.frontmatter.image}
                                    alt={post.frontmatter.title}
                                    width={105}
                                    height={85}
                                  />
                                )}
                                <div>
                                  <h3 className="h5 mb-2">
                                    <Link
                                      href={`/${blog_folder}/${post.slug}`}
                                      className="block hover:text-red-600"
                                    >
                                      {post.frontmatter.title}
                                    </Link>
                                  </h3>
                                  <p className="inline-flex items-center font-bold">
                                    <FaRegCalendar className="mr-1.5" />
                                    {dateFormat(post.frontmatter.date)}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </animated.div>
                )}

                {/* Promotion */}
                {promotion.enable && (
                  <animated.div
                    style={promotionAnimation}
                    ref={promotionRef}
                    className="section block pt-0"
                  >
                    <ImageFallback
                      className="h-full w-full rounded-lg"
                      height="300"
                      width="800"
                      src={promotion.image}
                      alt="promotion"
                    />
                  </animated.div>
                )}

                {/* Recent Posts */}
                {recent_posts.enable && (
                  <animated.div
                    style={recentAnimation}
                    ref={recentRef}
                    className="section pt-0"
                  >
                    {markdownify(recent_posts.title, "h2", "section-title")}
                    <div className="rounded border border-border px-6 pt-6 dark:border-darkmode-border">
                      <div className="row">
                        {sortPostByDate.slice(0, showPosts).map((post) => (
                          <div className="mb-8 md:col-6" key={post.slug}>
                            <Post post={post} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </animated.div>
                )}
                {/* Our Services button */}
                <animated.div
                  style={servicesAnimation}
                  ref={servicesRef}
                  className="text-center"
                >
                  <Link
                    className="ml-10"
                    href={banner.servicesButton.link}
                    rel={banner.servicesButton.rel}
                  >
                    <button className={styles.contactusBtn}>
                      {banner.servicesButton.label}
                      <span className={styles.arrow}>
                        <svg
                          fill="rgb(183, 128, 255)"
                          viewBox="0 0 320 512"
                          height="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path>
                        </svg>
                      </span>
                    </button>
                  </Link>
                </animated.div>
                <br />

                <video width="100%" className="rounded-lg" controls>
                  <source src={banner.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <br />

                <Pagination
                  totalPages={Math.ceil(posts.length / showPosts)}
                  currentPage={1}
                />
              </div>
              {/* sidebar */}
              <Sidebar
                className={"lg:mt-[9.5rem]"}
                posts={posts}
                categories={categories}
              />
            </div>
          </div>
        </section>
      </Base>
    </>
  );
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner, featured_posts, recent_posts, promotion } = frontmatter;
  const posts = getSinglePage(`content/${blog_folder}`);
  const categories = getTaxonomy(`content/${blog_folder}`, "categories");

  return {
    props: {
      banner: banner,
      posts: posts,
      featured_posts,
      recent_posts,
      promotion,
      categories: categories.map((name) => ({ name: name })),
    },
  };
};
