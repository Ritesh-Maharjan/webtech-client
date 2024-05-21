import Hero from "./component/Hero";
import Service from "./component/Service";
import About from "./component/About";
import { useEffect, useRef, useState } from "react";
import Navigation from "./component/Navigation";
import Testimonial from "./component/Testimonial";
import Contact from "./component/Contact";
import Works from "./component/Works";
import background1 from "/bg-1.jpg";
// import background2 from "/bg-2.jpg";

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
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
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    if (serviceRef.current) {
      observer.observe(serviceRef.current);
    }

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }

      if (serviceRef.current) {
        observer.unobserve(serviceRef.current);
      }
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
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
      <Works />
      <div
        style={{
          backgroundImage: `url(${background1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          position: "relative",
        }}
      >
        <Testimonial />
        <Contact ref={contactRef} restBase={restBase} />
      </div>
    </div>
  );
}

export default App;
