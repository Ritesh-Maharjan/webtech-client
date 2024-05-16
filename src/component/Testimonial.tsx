import { forwardRef, useEffect, useState } from "react";
import parse from "html-react-parser";
import { Icon } from '@iconify/react';

interface TestimonialData {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
}

// Define the type for your service data
interface ContentData {
  type: string;
  content: any;  // Changed to any to accommodate various types of content
}

interface ParsedTestimonialData {
  title: string;
  id: number;
  contentData: ContentData[];
}

interface ServiceProps {
  restBase: string;
}

const Service = forwardRef<HTMLDivElement, ServiceProps>(({ restBase }, ref) => {
  const [testimonialData, setTestimonialData] = useState<ParsedTestimonialData[]>([]);

  useEffect(() => {
    fetch(`${restBase}webtech-testimonial`)
      .then((response) => response.json())
      .then((data) => {
        const parsedTestimonials: ParsedTestimonialData[] = data.map((testimonialData: TestimonialData) => {
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
        });

        setTestimonialData(parsedTestimonials);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [restBase]);

  return (
    <div className="max-width">
      <h1 className="my-6 text-4xl text-center w-full">Testimonials</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2">
        {testimonialData.map((testimonial) => (
          <article
            key={testimonial.id}
            className="flex flex-col gap-8 p-4 hover:scale-105 transform transition-transform duration-300"
          >
            {testimonial.contentData.map((content, index) => (
              <p className="text-justify" key={index}>
                {content.content}
              </p>
            ))}
            <div className="flex flex-row">
              <Icon icon="material-symbols:star" width="24" height="24" style={{ color: 'orange' }} />
              <Icon icon="material-symbols:star" width="24" height="24" style={{ color: 'orange' }} />
              <Icon icon="material-symbols:star" width="24" height="24" style={{ color: 'orange' }} />
              <Icon icon="material-symbols:star" width="24" height="24" style={{ color: 'orange' }} />
              <Icon icon="material-symbols:star" width="24" height="24" style={{ color: 'orange' }} />
            </div>
            <h3 className="font-semibold text-xl h-fit md:h-12">{testimonial.title}</h3>
          </article>
        ))}
      </section>
    </div>
  );
});

const Testimonial = () => {
  return (
    <Service restBase="https://riteshmaharjan.com/webtech/wp-json/wp/v2/" />
  );
};

export default Testimonial;



  