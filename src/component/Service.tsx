import { forwardRef, useEffect, useState } from "react";
import parse from "html-react-parser";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ServiceData {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  _links: { "wp:featuredmedia": [{ href: string }] };
}

interface contentData {
  type: string;
  content: string;
}

interface parsedServiceData {
  title: string;
  id: number;
  featured_image_url: string; // Add the featured image URL field
  contentData: contentData[];
}

interface ServiceProps {
  restBase: string;
}

const Service = forwardRef<HTMLDivElement, ServiceProps>(({ restBase }, ref) => {
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
    fetch(`${restBase}webtech-service`)
      .then((response) => response.json())
      .then((data: ServiceData[]) => {
        const promises = data.map((serviceData) => {
          const title = serviceData.title.rendered;
          const { id, featured_media, _links } = serviceData;
          const contentData: contentData[] = [];
          const parsedContent = parse(serviceData.content.rendered);
          if (Array.isArray(parsedContent)) {
            parsedContent.forEach((el) => {
              if (typeof el === "object") {
                const { type } = el;
                const content = el.props.children;
                contentData.push({ type, content });
              }
            });
          }
          if (featured_media !== 0) {
            // Fetch the featured image URL
            console.log("Fetching media data for service ID", id);
            return fetch(_links["wp:featuredmedia"][0].href)
              .then((response) => response.json())
              .then((mediaData) => {
                console.log("Media data for service ID", id, mediaData);
                const imageUrl = mediaData?.media_details?.sizes?.full?.source_url || "";
                return {
                  title,
                  id,
                  featured_image_url: imageUrl,
                  contentData,
                };
              });
          } else {
            // If no featured image, return a promise with empty string for featured_image_url
            return Promise.resolve({
              title,
              id,
              featured_image_url: "",
              contentData,
            });
          }
        });
        Promise.all(promises).then((services) => {
          setServices(services);
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div
      ref={ref}
      className="max-width mb-24 h-fit xl:h-screen flex flex-wrap p-4"
      id="service"
    >
      <h2 className="flex items-center gap-2 my-6 text-4xl md:text-5xl w-full font-bold">
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
            
            {service.featured_image_url && (
              <img
                src={service.featured_image_url}
                alt={service.title}
                width="50"
                height="50"
                className="filter invert" // Apply Tailwind filter and invert classes
                style={{ marginBottom: "1rem" }}
              />
            )}

            <h3 className="font-semibold text-xl h-fit md:h-12">
              {service.title}
            </h3>
            {service.contentData.map((content, index) => (
              <p className="text-justify" key={index}>
                {content.content}
              </p>
            ))}
          </motion.article>
        ))}
      </section>
    </div>
  );
});

export default Service;
