import { forwardRef, useEffect, useState } from "react";
import Staff from "./Staff";
import Rules from "./Rules";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from 'framer-motion';

interface PageContent {
  id: number;
  content: { rendered: string };
}

interface AboutProps {
  restBase: string;
}

interface Staff {
  name: string;
  source_url: string;
}

const About = forwardRef<HTMLDivElement, AboutProps>(({ restBase }, ref) => {
  const [pageContent, setPageContent] = useState<string>("");
  const [staff, setStaff] = useState<Staff[]>([]);
	const fadeInAnimationLeft = {
		initial: { opacity: 0, x: 10 },
    animate: () => ({
      opacity: 1,
      x: 0,
      transition: { duration:1 , delay: 0.2 },
    }),
	}
	const fadeInAnimationBottom = {
		initial: { opacity: 0, y: 15 },
    animate: () => ({
      opacity: 1,
      y: 0,
      transition: { duration:1 , delay: 0.2 },
    }),
	}

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

    const fetchStaffContent = async () => {
      try {
        const response = await fetch(`${restBase}webtech-staff?_embed`);
        if (!response.ok) {
          throw new Error("Failed to fetch page content");
        }
        const data: PageContent = await response.json();
        if (Array.isArray(data)) {
          data.forEach((staffData) => {
            const newStaff = {
              name: staffData.title.rendered,
              source_url:
                staffData._embedded?.["wp:featuredmedia"][0].source_url,
            };
            setStaff((prevState) => [...prevState, newStaff]);
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPageContent();
    fetchStaffContent();
  }, [restBase]);

  return (
    <div
      ref={ref}
      id="about"
      className="max-width h-fit p-4 pb-32 lg:pb-4 lg:h-screen"
    >
      <h2 className="flex items-center gap-2 my-2 text-4xl md:text-5xl w-full font-bold">
        <Icon
          icon="bi:fingerprint"
          width="50"
          height="50"
          style={{ color: "orange" }}
        />
        About Us
      </h2>

      <motion.div className="block lg:flex"
					variants={fadeInAnimationLeft}
					initial="initial"
          whileInView="animate"
					

			>
        {/* About Us Content */}
        <div className="w-full md:text-justify lg:w-1/2 p-4">
          <div dangerouslySetInnerHTML={{ __html: pageContent }} />
        </div>
        {/* First Section Staff Members */}
        <div className="w-full lg:w-1/2 pr-4">
          <Staff firstStaff={staff[0]} secondStaff={staff[1]} section="first" />
        </div>
      </motion.div>

      {/* Second Section Staff Members and Accordion */}
      <motion.div className="w-full lg:w-full mt-4 block lg:flex"
				variants={fadeInAnimationBottom}
				initial="initial"
				whileInView="animate"
				
			>
        <div className="w-full lg:w-1/4 pr-4">
          <Staff
            firstStaff={staff[2]}
            secondStaff={staff[3]}
            section="second"
          />
        </div>
        <div className="w-full lg:w-3/4">
          <Rules restBase={restBase} />
        </div>
      </motion.div>
    </div>
  );
});

export default About;
