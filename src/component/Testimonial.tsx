import { forwardRef, useEffect, useState } from "react";
import parse from "html-react-parser";
import { Icon } from "@iconify/react";
import { motion } from 'framer-motion';

interface TestimonialData {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
}

// Define the type for your testimonial data
interface ContentData {
  type: string;
  content: any; // Changed to any to accommodate various types of content
}

interface ParsedTestimonialData {
  title: string;
  id: number;
  contentData: ContentData[];
}

interface TestimonialProps {
  restBase: string;
}

const Testimonial = forwardRef<HTMLDivElement, TestimonialProps>(
  ({ restBase }, ref) => {
    const [testimonialData, setTestimonialData] = useState<
      ParsedTestimonialData[]
    >([]);
		const fadeInAnimation = {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 1 } },
    };

    useEffect(() => {
      fetch(`${restBase}webtech-testimonial`)
        .then((response) => response.json())
        .then((data) => {
          const parsedTestimonials: ParsedTestimonialData[] = data.map(
            (testimonialData: TestimonialData) => {
              const title = testimonialData.title.rendered;
              const { id } = testimonialData;

              const contentData: ContentData[] = [];

              const parsedContent = parse(testimonialData.content.rendered);
              if (Array.isArray(parsedContent)) {
                parsedContent.forEach((el: any) => {
                  if (typeof el === "object" && el !== null) {
                    const { type } = el;
                    const content = el.props.children;
                    contentData.push({ type, content });
                  }
                });
              }

              return { title, id, contentData };
            }
          );

          setTestimonialData(parsedTestimonials);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, [restBase]);

    return (
      <div
        id="testimonial"
        ref={ref}
        className="max-width flex flex-wrap p-4"
      >
        <h2 className="flex items-center gap-2 my-6 text-4xl md:text-5xl w-full font-bold">
          <Icon
            icon="bi:fingerprint"
            width="50"
            height="50"
            style={{ color: "orange" }}
          />
          Our Testimonials
        </h2>

        <section className="grid grid-cols-1 sm:grid-cols-2">
          {testimonialData.map((testimonial) => (
            <motion.article
							variants={fadeInAnimation}
							initial="initial"
              whileInView="animate"
              key={testimonial.id}
              className="flex flex-col gap-4 p-4 lg:gap-1 hover:scale-105 transform transition-transform duration-300"
            >
              {testimonial.contentData.map((content, index) => (
                <p className="text-justify" key={index}>
                  {content.content}
                </p>
              ))}
              <div className="flex flex-row">
                <Icon
                  icon="material-symbols:star"
                  width="24"
                  height="24"
                  style={{ color: "orange" }}
                />
                <Icon
                  icon="material-symbols:star"
                  width="24"
                  height="24"
                  style={{ color: "orange" }}
                />
                <Icon
                  icon="material-symbols:star"
                  width="24"
                  height="24"
                  style={{ color: "orange" }}
                />
                <Icon
                  icon="material-symbols:star"
                  width="24"
                  height="24"
                  style={{ color: "orange" }}
                />
                <Icon
                  icon="material-symbols:star"
                  width="24"
                  height="24"
                  style={{ color: "orange" }}
                />
              </div>
              <h3 className="font-semibold text-xl h-fit md:h-12">
                {testimonial.title}
              </h3>
            </motion.article>
          ))}
        </section>
      </div>
    );
  }
);

export default Testimonial;
