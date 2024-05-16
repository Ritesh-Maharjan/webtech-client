import { forwardRef, useEffect, useState } from "react";
import parse from "html-react-parser";

interface ServiceData {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
}

// Define the type for your service data
interface contentData {
  type: string;
  content: string;
  // Add other fields as necessary
}

interface parsedServiceData {
  title: string;
  id: number;
  contentData: contentData[];
}

interface ServiceProps {
  restBase: string;
}

const Service = forwardRef<HTMLDivElement, ServiceProps>(
  ({ restBase }, ref) => {
    const [services, setServices] = useState<parsedServiceData[]>([]);

    useEffect(() => {
      setServices([]);
      fetch(`${restBase}webtech-service`)
        .then((response) => response.json())
        .then((data) => {
          data.map((serviceData: ServiceData) => {
            const title = serviceData.title.rendered;
            const { id } = serviceData;
            const contentData: contentData[] = [];

            const parsedContent = parse(serviceData.content.rendered);
            if (Array.isArray(parsedContent)) {
              parsedContent.map((el) => {
                if (typeof el == "object") {
                  const { type } = el;
                  const content = el.props.children;
                  contentData.push({ type, content });
                }
              });

              setServices((prevData) => [
                ...prevData,
                {
                  title: title,
                  id: id,
                  contentData: contentData,
                },
              ]);
            }
          });
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
      <div
        ref={ref}
        className="max-width mb-24 h-fit lg:h-screen flex flex-wrap p-4"
        id="service"
      >
        <h2 className="my-6 text-4xl text-center w-full">Our Services</h2>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-8 ">
          {services.map((service) => (
            <article
              key={service.id}
              className="flex flex-col gap-4 p-4 last:pb-32
          "
            >
              <h3 className="font-semibold text-xl h-fit md:h-12">
                {service.title}
              </h3>
              {service.contentData.map((content, index) => {
                return (
                  <p className="text-justify" key={index}>
                    {content.content}
                  </p>
                );
              })}
            </article>
          ))}
        </section>
      </div>
    );
  }
);

export default Service;
