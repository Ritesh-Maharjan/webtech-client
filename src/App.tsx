import Hero from "./component/Hero";
import Service from "./component/Service";
import About from "./component/About";
import { useEffect, useRef, useState } from "react";
import Navigation from "./component/Navigation";
import Testimonial from "./component/Testimonial";
import Contact from "./component/Contact";
import Works from "./component/Works";
import background1 from "/bg-1.jpg";
import Hamburger from "./component/Hamburger";

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    const sections = [
      heroRef.current,
      serviceRef.current,
      aboutRef.current,
      workRef.current,
      testimonialRef.current,
      contactRef.current,
    ];

    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  const restBase = `https://riteshmaharjan.com/webtech/wp-json/wp/v2/`;
  return (
    <div className="bg-black text-white scroll-container">
      <Hero ref={heroRef} />
      <div
        style={{
          backgroundImage: `url(${background1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          width: "100vw",
        }}
      >
        <Navigation activeSection={activeSection} />
        <Service ref={serviceRef} restBase={restBase} />
        <About ref={aboutRef} restBase={restBase} />
      </div>
      <Works ref={workRef} />
      <div
        style={{
          backgroundImage: `url(${background1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          position: "relative",
        }}
      >
        <Testimonial ref={testimonialRef} restBase={restBase} />
        <Contact ref={contactRef} restBase={restBase} />
      </div>
      <Hamburger />
    </div>
  );
}

export default App;
