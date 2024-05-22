import React from "react";

const Navigation: React.FC<{ activeSection: string }> = ({ activeSection }) => {
  return (
    <nav className="hidden lg:block fixed top-1/2 -translate-y-1/2 right-6 before:top-0 before:bg-gray-500 before:w-1 before:-right-4 before:block before:h-full before:rounded-full before:absolute z-50">
      <ul
        className={`flex flex-col text-orange-400 cursor-pointer before:bg-orange-500 before:w-1 before:-right-4 before:block before:h-14 before:rounded-full before:absolute ${
          activeSection == "hero" && "before:top-0"
        } ${activeSection == "service" && "before:top-14"}
        ${activeSection == "about" && "before:top-28"}
        ${activeSection == "work" && "before:top-44"}
        ${activeSection == "testimonial" && "before:top-56"}
        ${activeSection == "contact" && "before:top-72"}
        `}
      >
        <li className="py-4">
          <a href="#hero">00</a>
        </li>
        <li className="py-4">
          <a href="#service">01</a>
        </li>
        <li className="py-4">
          <a href="#about">02</a>
        </li>
        <li className="py-4">
          <a href="#work">03</a>
        </li>
        <li className="py-4">
          <a href="#testimonial">04</a>
        </li>
        <li className="py-4">
          <a href="#contact">05</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
