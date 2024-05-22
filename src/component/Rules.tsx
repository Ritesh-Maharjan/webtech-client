import { forwardRef, useEffect, useState } from "react";

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

const Rules = forwardRef<HTMLDivElement, AccordionProps>(
  ({ restBase }, ref) => {
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
      <div ref={ref} className="my-8 h-fit p-4 lg:py-0 lg:my-0 lg:h-screen">
        <h3 className="text-xl font-semibold py-1 text-center bg-cyan-500/50">
          Our Principles
          {/* values */}
        </h3>
        {pageContent && (
          <>
            <p
              className="my-6 lg:my-4"
              dangerouslySetInnerHTML={{ __html: pageContent.content.rendered }}
            />
            <ul className="flex gap-4 flex-wrap justify-between">
              <li className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.3333%-1rem)] lg:w-[calc(33.3333%-1rem)]">
                <h3 className="text-sm py-1 lg:text-base font-bold">EXPERIENCE</h3>
                <p className="text-sm">{pageContent.acf.experience}</p>
              </li>
              <li className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.3333%-1rem)] lg:w-[calc(33.3333%-1rem)]">
                <h3 className="text-sm py-1 lg:text-base font-bold">
                  WORK WITH PASSION
                </h3>
                <p className="text-sm">{pageContent.acf.working_with_passion}</p>
              </li>
              <li className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.3333%-1rem)] lg:w-[calc(33.3333%-1rem)]">
                <h3 className="text-sm py-1 lg:text-base font-bold">ACCESSIBILITY</h3>
                <p className="text-sm">{pageContent.acf.accessibility}</p>
              </li>
              <li className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.3333%-1rem)] lg:w-[calc(33.3333%-1rem)]">
                <h3 className="text-sm py-1 lg:text-base font-bold">SECURITY</h3>
                <p className="text-sm">{pageContent.acf.security}</p>
              </li>
              <li className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.3333%-1rem)] lg:w-[calc(33.3333%-1rem)]">
                <h3 className="text-sm py-1 lg:text-base font-bold">COMMUNICATION</h3>
                <p className="text-sm">{pageContent.acf.communication}</p>
              </li>
              <li className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.3333%-1rem)] lg:w-[calc(33.3333%-1rem)]">
                <h3 className="text-sm py-1 lg:text-base font-bold">BESPOKE</h3>
                <p className="text-sm">{pageContent.acf.bespoke}</p>
              </li>
              <li className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.3333%-1rem)] lg:w-[calc(33.3333%-1rem)]">
                <h3 className="text-sm py-1 lg:text-base font-bold">WORK ETHICS</h3>
                <p className="text-sm">{pageContent.acf.work_ethics}</p>
              </li>
              <li className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.3333%-1rem)] lg:w-[calc(33.3333%-1rem)]">
                <h3 className="text-sm py-1 lg:text-base font-bold">FEEDBACK</h3>
                <p className="text-sm">{pageContent.acf.feedback}</p>
              </li>
            </ul>
          </>
        )}
      </div>
    );
  }
);

export default Rules;
