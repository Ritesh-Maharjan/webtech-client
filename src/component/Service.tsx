import { forwardRef, useEffect, useState } from "react";
import parse from "html-react-parser";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
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
    const fadeInAnimation = {
      initial: {
        opacity: 0,
        y: 10,
      },
      animate: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.2 * index,
        },
      }),
    };
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
        <h2 className="flex items-center gap-2 my-6 text-4xl w-full font-bold">
          <Icon
            icon="bi:fingerprint"
            width="50"
            height="50"
            style={{ color: "orange" }}
          />
          Our Services
        </h2>
        <section className="grid grid-cols-1 sm:grid-cols-2 pb-40 xl:flex gap-8 ">
          {services.map((service, index) => (
            <motion.article
              variants={fadeInAnimation}
              initial="initial"
              whileInView="animate"
              custom={index}
              key={service.id}
              className="flex flex-col shadow-cyan-500/50 gap-4 p-4 py-20 hover:shadow-orange-400/60 shadow-xl h-full"
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
            </motion.article>
          ))}
        </section>
      </div>
    );
  }
);
export default Service;
