import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="fixed top-1/2 -translate-y-1/2 right-6 before:top-0 before:bg-gray-500 before:w-1 before:-right-4 before:block before:h-full before:rounded-full before:absolute">
      <ul className="flex flex-col text-orange-400 cursor-pointer">
        <li className="py-4">
            
          {/* <NavLink to="/#home">00</NavLink> */}
        </li>
        <li className="py-4">
          {/* <NavLink to="/#home">01</NavLink> */}
        </li>
        <li className="py-4">
          {/* <NavLink to="/#home">02</NavLink> */}
        </li>
        <li className="py-4">
          {/* <NavLink to="/#home">03</NavLink> */}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
