import Hero from "./component/Hero";
import Service from "./component/Service";
import About from "./component/About";
import { useEffect, useRef, useState } from "react";
import Navigation from "./component/Navigation";
import Testimonial from "./component/Testimonial";

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
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
    };
  }, []);

  const restBase = `https://riteshmaharjan.com/webtech/wp-json/wp/v2/`;
  return (
    <div className="bg-black text-white scroll-container">
      <Hero ref={heroRef} />
      <Navigation activeSection={activeSection} />
      <Service ref={serviceRef} restBase={restBase} />
      <About ref={aboutRef} restBase={restBase} />
      <Testimonial />

    </div>
  );
}

export default App;
