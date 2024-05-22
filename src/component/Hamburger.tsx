import React, { useState } from "react";

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="sticky bottom-0 left-0 lg:hidden">
        <button
          className="relative group"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
        >
          <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
            <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
              <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-x-10"></div>
              <div className="bg-white h-[2px] w-7 rounded transform transition-all duration-300 group-focus:translate-x-10 delay-75"></div>
              <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-x-10 delay-150"></div>

              <div className={`absolute items-center justify-between transform transition-all duration-500 top-2.5 ${isOpen ? "-translate-x-0" : "-translate-x-10"} group-focus:translate-x-0 flex w-0 group-focus:w-12`}>
                <div className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 ${isOpen ? "rotate-45" : "rotate-0"} delay-300 group-focus:rotate-45`}></div>
                <div className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 ${isOpen ? "-rotate-45" : "-rotate-0"} delay-300 group-focus:-rotate-45`}></div>
              </div>
            </div>
          </div>
        </button>
      </div>

      <div className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 z-50 ${isOpen ? "block" : "hidden"}`} onClick={toggleMenu}></div>

      <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50 ${isOpen ? "block" : "hidden"}`} onClick={toggleMenu}>
        <ul className="text-white">
          <li className="mb-4"><a href="#">Home</a></li>
          <li className="mb-4"><a href="#">About</a></li>
          <li className="mb-4"><a href="#">Contact</a></li>
        </ul>
      </div>
    </>
  );
}
