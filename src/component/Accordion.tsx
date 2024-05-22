import React, { forwardRef, useEffect, useState } from "react";

interface PageContent {
  id: number;
  content: { rendered: string };
  acf: {
    experience: string;
    working_with_passion: string;
    accessibility: string;
    security: string;
    communication: string;
    bespoke: string;
    work_ethics: string;
    feedback: string;
  };
}

interface AccordionProps {
  restBase: string;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(({ restBase }, ref) => {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await fetch(`${restBase}pages/60`);
        if (!response.ok) {
          throw new Error("Failed to fetch page content");
        }
        const data: PageContent = await response.json();
        setPageContent(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPageContent();
  }, [restBase]);

  return (
    <div id="accordion" ref={ref} className="max-width h-fit p-4 lg:h-screen">
      <h2 className="text-4xl text-center bg-cyan-500/50">Our Rules</h2>
      {pageContent && (
        <>
          <p dangerouslySetInnerHTML={{ __html: pageContent.content.rendered }} />
          <div className=" p-4 rounded-md">
            <div className="">
              <ul className="flex flex-wrap justify-between">
                <li className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-2">
                  <h3 className="text-2xl font-bold">EXPERIENCE</h3>
                  {pageContent.acf.experience}
                </li>
                <li className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-2">
                  <h3 className="text-2xl font-bold">WORK WITH PASSION</h3>
                  {pageContent.acf.working_with_passion}
                </li>
                <li className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-2">
                  <h3 className="text-2xl font-bold">ACCESSIBILITY</h3>
                  {pageContent.acf.accessibility}
                </li>
                <li className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-2">
                  <h3 className="text-2xl font-bold">SECURITY</h3>
                  {pageContent.acf.security}
                </li>
                <li className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-2">
                  <h3 className="text-2xl font-bold">COMMUNICATION</h3>
                  {pageContent.acf.communication}
                </li>
                <li className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-2">
                  <h3 className="text-2xl font-bold">BESPOKE</h3>
                  {pageContent.acf.bespoke}
                </li>
                <li className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-2">
                  <h3 className="text-2xl font-bold">WORK ETHICS</h3>
                  {pageContent.acf.work_ethics}
                </li>
                <li className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-2">
                  <h3 className="text-2xl font-bold">FEEDBACK</h3>
                  {pageContent.acf.feedback}
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default Accordion;
