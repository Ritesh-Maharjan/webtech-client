import React, { forwardRef, useEffect, useState } from "react";
import Staff from "./Staff";
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
    <div id="about" ref={ref} className="max-width h-fit p-4 lg:h-screen">
      <h2 className="text-4xl my-6 text-center">About Us</h2>
      {/* <div className="p-4 max-w-lg" dangerouslySetInnerHTML={{ __html: pageContent }} /> */}

      <div className="block lg:flex">
        {/* About Us Content */}
        <div className="w-full md:text-justify lg:w-1/2 p-4">
          <div dangerouslySetInnerHTML={{ __html: pageContent }} />
        </div>
        {/* First Section Staff Members */}
        <div className="w-full lg:w-1/2 pr-4">
          <Staff restBase={restBase} section="first" />
        </div>

      </div>

      {/* Second Section Staff Members and Accordion */}
      <div className="w-full lg:w-full mt-4 block lg:flex">
        <div className="w-full lg:w-1/4 pr-4">
          <Staff restBase={restBase} section="second" />
        </div>
        <div className="w-full lg:w-3/4">
          <Accordion restBase={restBase} />
        </div>
      </div>
    </div>
  );
});

export default About;
