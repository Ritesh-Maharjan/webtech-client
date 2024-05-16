import { forwardRef, useEffect, useState } from "react";
import parse from "html-react-parser";
import { Icon } from '@iconify/react';

// Define interfaces for the data structure
interface ServiceData {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
}

interface ContentData {
  type: string;
  content: any;  // Changed to any to accommodate various types of content
}

interface ParsedServiceData {
  title: string;
  id: number;
  contentData: ContentData[];
}

interface ServiceProps {
  restBase: string;
}

// Service component to fetch and parse data
const Service = forwardRef<HTMLDivElement, ServiceProps>(({ restBase }, ref) => {
  const [services, setServices] = useState<ParsedServiceData[]>([]);

  useEffect(() => {
    setServices([]);
    fetch(`${restBase}webtech-testimonial`)
      .then((response) => response.json())
      .then((data) => {
        const parsedServices: ParsedServiceData[] = data.map((serviceData: ServiceData) => {
          const title = serviceData.title.rendered;
          const { id } = serviceData;

          const contentData: ContentData[] = [];

          const parsedContent = parse(serviceData.content.rendered);
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

        setServices(parsedServices);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [restBase]);

  return (
    <div ref={ref}>
      {services.map((service) => (
        <div key={service.id}>
          <h2>{service.title}</h2>
          {service.contentData.map((content, index) => (
            <div key={index}>
              <h3>{content.type}</h3>
              <div>{content.content}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
});

// Testimonial component to display fetched data
const Testimonial = () => {
  const [testimonialData, setTestimonialData] = useState<ParsedServiceData[]>([]);

  // You can update the URL according to your API endpoint
  const restBase = "https://riteshmaharjan.com/webtech/wp-json/wp/v2/";

  useEffect(() => {
    fetch(`${restBase}webtech-testimonial`)
      .then((response) => response.json())
      .then((data) => {
        const parsedServices: ParsedServiceData[] = data.map((serviceData: ServiceData) => {
          const title = serviceData.title.rendered;
          const { id } = serviceData;

          const contentData: ContentData[] = [];

          const parsedContent = parse(serviceData.content.rendered);
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

        setTestimonialData(parsedServices);
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
            <div className="flex flex-row">
              <Icon icon="material-symbols:star" width="24" height="24" style={{ color: 'orange' }} />
              <Icon icon="material-symbols:star" width="24" height="24" style={{ color: 'orange' }} />
              <Icon icon="material-symbols:star" width="24" height="24" style={{ color: 'orange' }} />
              <Icon icon="material-symbols:star" width="24" height="24" style={{ color: 'orange' }} />
              <Icon icon="material-symbols:star" width="24" height="24" style={{ color: 'orange' }} />
            </div>
  
            {testimonial.contentData.map((content, index) => {
              return (
                <p className="text-justify" key={index}>
                  {content.content}
                </p>
              );
            })}
            <h3 className="font-semibold text-xl h-fit md:h-12">{testimonial.title}</h3>
          </article>
        ))}
      </section>
    </div>
  );
  };
  
  export default Testimonial;

  