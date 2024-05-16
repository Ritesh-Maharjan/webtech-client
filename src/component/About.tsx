import React, { forwardRef, useEffect, useState } from "react";
import Staffs from "./Staff";
import Accordion from "./Accordion";

interface PageContent {
  id: number;
  content: { rendered: string };
}

interface AboutProps {
  restBase: string;
}

const About = forwardRef<HTMLDivElement, AboutProps>(({ restBase }, ref) => {
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
    <div id="about" ref={ref} className="max-width">
      <h2>About Us</h2>
      <div dangerouslySetInnerHTML={{ __html: pageContent }} />
      <Staffs restBase={restBase} />
      <Accordion />
    </div>
  );
});

export default About;
