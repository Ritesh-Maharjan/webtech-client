import React, { forwardRef, useEffect, useState } from "react";

interface PageContent {
  id: number;
  content: { rendered: string };
}

interface AccordionProps {
  restBase: string;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(({ restBase }, ref) => {
  const [pageContent, setPageContent] = useState<string>("");

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await fetch(`${restBase}pages/60`);
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
    <div id="accordion" ref={ref} className="max-width h-fit p-4 lg:h-screen">
      <h2 className="text-4xl text-center">Our Rules</h2>
      {/* <div className="p-4 max-w-lg" dangerouslySetInnerHTML={{ __html: pageContent }} /> */}

      <div className="bg-gray-700 p-4 rounded-md">
        {/* Accordion Us Content */}
        <div className="">
          <div dangerouslySetInnerHTML={{ __html: pageContent }} />
        </div>
      </div>
    </div>
  );
});

export default Accordion;
