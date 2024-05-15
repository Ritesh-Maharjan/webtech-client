import { useEffect, useState } from "react";
import parse from "html-react-parser";

// Define the type for your service data
interface ServiceData {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  // Add other fields as necessary
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

const Service: React.FC<{
  restBase: string;
}> = ({ restBase }) => {
  const [services, setServices] = useState<parsedServiceData[]>([]);

  useEffect(() => {
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
                console.log(el);
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
    <div>
      <h2>Services</h2>

      {services.map((service) => (
        <div key={service.id}>
          <h2>{service.title}</h2>
          {service.contentData.map((content, index) => {
            return <p key={index}>{content.content}</p>;
          })}
        </div>
      ))}
    </div>
  );
};

export default Service;
