import { forwardRef } from "react";
import Header from "./Header";
import HeroBg from "/hero-bg.png";
import { motion } from "framer-motion";

const Hero = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div id="hero" ref={ref} className="max-width relative flex items-center">
      <Header />
      <div className="flex justify-between font-bold leading-loose relative tracking-wider flex-col uppercase w-full h-72 text-3xl xl:text-8xl p-4 gap-6 ">
        <motion.h3
          initial={{ x: -200, opacity: 0.2, scale: 0.6 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="font-arenq"
        >
          Creativity
        </motion.h3>

        <motion.h3
          initial={{ x: -100, opacity: 0.2, scale: 0.6 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className=" text-center z-10"

        >
          &
        </motion.h3>

        <motion.h3
          initial={{ x: 200, opacity: 0.2, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-right z-10 font-beckman"
        >
          Functionality
        </motion.h3>
      </div>

      <motion.img
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.25 }}
        className="absolute object-cover min-h-[50%] xs: sm:min-h-[80%] top-50"
        src={HeroBg}
      />
    </div>
  );
});

export default Hero;
