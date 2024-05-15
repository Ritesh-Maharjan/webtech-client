import Header from "./Header";
import HeroBg from "/hero-bg.png";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="min-h-screen relative flex items-center max-w-5xl mx-auto overflow-hidden">
      <Header />
      <div className="flex justify-between font-bold leading-loose relative tracking-wider flex-col uppercase w-full h-72 text-3xl xl:text-6xl p-4 ">
        <motion.h3
          initial={{ x: -200, opacity: 0.2, scale: 0.6 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          Creativity
        </motion.h3>
        <motion.h3
          initial={{ x: 200, opacity: 0.2, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className=" text-right z-10"
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
}
