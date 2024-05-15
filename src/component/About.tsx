import { useEffect, useState } from "react";
import parse from "html-react-parser";

// Define the type for your about data
interface aboutData {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  // Add other fields as necessary
}

// Define the type for your about data
interface contentData {
  type: string;
  content: string;
  // Add other fields as necessary
}

interface parsedAboutData {
  title: string;
  id: number;
  contentData: contentData[];
}

const about: React.FC<{
  restBase: string;
}> = ({ restBase }) => {
  const [abouts, setAbouts] = useState<parsedAboutData[]>([]);

  useEffect(() => {
    fetch(`${restBase}pages/17`)
      .then((response) => response.json())
      .then((data) => {
				console.log(data);
        data.map((aboutData: aboutData) => {
          const title = aboutData.title.rendered;
          const { id } = aboutData;
          const contentData: contentData[] = [];

          const parsedContent = parse(aboutData.content.rendered);
          if (Array.isArray(parsedContent)) {
            parsedContent.map((el) => {
              if (typeof el == "object") {
                console.log(el);
                const { type } = el;
                const content = el.props.children;
                contentData.push({ type, content });
              }
            });

            setAbouts((prevData) => [
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
      <h2>abouts</h2>

      {abouts.map((about) => (
        <div key={about.id}>
          <h2>{about.title}</h2>
          {about.contentData.map((content, index) => {
            return <p key={index}>{content.content}</p>;
          })}
        </div>
      ))}
    </div>
  );
};

export default about;
