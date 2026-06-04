import React from "react";
import { markdownify } from "@lib/utils/textConverter";
import { MDXRemote } from "next-mdx-remote";
import { animated, useSpring } from "@react-spring/web";
import shortcodes from "@layouts/shortcodes/all";
import Accordion from "@layouts/shortcodes/Accordion"; // Correct path

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

// Animated Accordion Wrapper
const AnimatedAccordion = ({ children, delay, ...props }) => {
  const [ref, animation] = useScrollAnimation(parseInt(delay, 10) || 0);
  return (
    <animated.div ref={ref} style={animation}>
      <Accordion {...props}>{children}</Accordion>
    </animated.div>
  );
};

const Services = ({ data }) => {
  const { frontmatter, mdxContent } = data;
  const { title } = frontmatter;

  const components = {
    ...shortcodes,
    Accordion: AnimatedAccordion,
  };

  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "h1 text-center mb-8")}
        <div className="content">
          {mdxContent && <MDXRemote {...mdxContent} components={components} />}
        </div>
      </div>
    </section>
  );
};

export default Services;
