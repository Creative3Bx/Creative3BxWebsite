import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import { NextScript } from "next/document";

const About = ({ data }) => {
  const { frontmatter, mdxContent } = data;
  const { title, video, education, experience } = frontmatter;

  return (
    <section className="section mt-16">
      <div className="container text-center">
        {markdownify(title, "h1", "h1 text-left lg:text-[55px] mt-12")}

        <div className="content text-left">
          <MDXRemote {...mdxContent} components={shortcodes} />
        </div>
        {video && (
          <div className="mb-8">
            <video
              width="100%"
              className="rounded-lg"
              loop
              autoPlay
              controls
            >
              <source src={video} type="video/mp4" />
              {"Sorry, your browser doesn't support videos."}
            </video>
          </div>
        )}
        <div className="row mt-24 text-left lg:flex-nowrap">
          <div className="lg:col-6">
            <div className="rounded border border-border p-6 dark:border-darkmode-border ">
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
          </div>
          <div className="experience mt-10 lg:mt-0 lg:col-6">
            <div className="rounded border border-border p-6 dark:border-darkmode-border ">
              {markdownify(experience.title, "h2", "section-title mb-12")}
              <ul className="row">
                {experience?.list?.map((item, index) => (
                  <li
                    className="mb-5 text-lg font-bold text-dark dark:text-darkmode-light lg:col-6"
                    key={"experience-" + index}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
