import React, { useEffect, useState } from "react";
// import Staffs from "component/Staff";

interface PageContent {
  id: number;
  content: { rendered: string };
}

const About: React.FC<{ restBase: string }> = ({ restBase }) => {
  const [pageContent, setPageContent] = useState<string>("");

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await fetch(`${restBase}pages/17`);
        if (!response.ok) {
          throw new Error("Failed to fetch page content");
        }
        const data: PageContent = await response.json();
        setPageContent(data.content.rendered);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPageContent();
  }, [restBase]);

  return (
    <div className="max-width">
      <h2>About Us</h2>
      <div dangerouslySetInnerHTML={{ __html: pageContent }} />
			{/* <Staffs restBase={restBase} /> */}
    </div>
  );
};

export default About;
