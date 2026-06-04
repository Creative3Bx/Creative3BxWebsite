import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import React from "react";
import { animated, useSpring } from "@react-spring/web";

const About = ({ data }) => {
  const { frontmatter, mdxContent } = data;
  const { title, video, education, experience } = frontmatter;

  // Reusable hook for scroll-triggered animations
  const useScrollAnimation = (
    delay = 0,
    threshold = 0.1,
    config = { tension: 170, friction: 26 }
  ) => {
    const [ref, setRef] = React.useState(null);
    const [inView, setInView] = React.useState(false);

    const animation = useSpring({
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0px)" : "translateY(40px)",
      delay: inView ? delay : 0,
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

  const [contentRef, contentAnimation] = useScrollAnimation(0);
  const [videoRef, videoAnimation] = useScrollAnimation(100);
  const [educationRef, educationAnimation] = useScrollAnimation(200);
  const [experienceRef, experienceAnimation] = useScrollAnimation(300);

  return (
    <section className="section">
      <div className="container text-center">
        {markdownify(title, "h1", "h1 text-center mb-8 lg:text-[55px]")}

        <div className="content text-left">
          <MDXRemote {...mdxContent} components={shortcodes} />
        </div>
        {video && (
          <animated.div ref={videoRef} style={videoAnimation} className="mb-8">
            <video
              width="100%"
              className="rounded-lg"
              loop
              autoPlay
              muted
              controls
            >
              <source src={video} type="video/mp4" />
              {"Sorry, your browser doesn't support videos."}
            </video>
          </animated.div>
        )}
        <div className="row mt-24 text-left lg:flex-nowrap">
          <animated.div
            ref={educationRef}
            style={educationAnimation}
            className="lg:col-6"
          >
            <div className="rounded border border-border p-6 dark:border-darkmode-border">
              {markdownify(education.title, "h2", "section-title mb-12")}
              <div className="row">
                {education.degrees.map((degree, index) => (
                  <div className="mb-7 md:col-6" key={"degree-" + index}>
                    <h4 className="text-base lg:text-[25px]">
                      {degree.university}
                    </h4>
                    <p className="mt-2">{degree.content}</p>
                  </div>
                ))}
              </div>
              <br />
              <br />
              <br />
            </div>
          </animated.div>
          <animated.div
            ref={experienceRef}
            style={experienceAnimation}
            className="experience mt-10 lg:col-6 lg:mt-0"
          >
            <div className="rounded border border-border p-6 dark:border-darkmode-border">
              {markdownify(experience.title, "h2", "section-title mb-12")}
              <ul className="row">
                {experience?.list?.map((item, index) => (
                  <li
                    className="mb-5 text-lg font-bold text-dark lg:col-6 dark:text-darkmode-light"
                    key={"experience-" + index}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </animated.div>
        </div>
      </div>
    </section>
  );
};

export default About;
