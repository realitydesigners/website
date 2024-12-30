"use client";

import { motion } from "framer-motion";

interface AutoBoxModuleProps {
  visibility?: {
    isVisible: boolean;
    distance: number;
  };
}

export const DataStream: React.FC<AutoBoxModuleProps> = ({ visibility }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: visibility?.isVisible ? 1 : 0,
        y: visibility?.isVisible ? 0 : 20,
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute top-1/2 left-1/2 z-10 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 px-4"
    >
      <div className="relative">
        <div className="space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="font-outfit text-[2.5em] leading-[1em] font-bold text-white lg:text-[6em]">
              The First Smart
              <br />
              Pattern Recognition
              <br />
              Tool For Trading
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="font-outfit text-gray-400 lg:text-2xl">
              The first universal pattern recognition toolkit
              <br />
              designed for trading
            </p>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 h-48 w-96 -translate-x-1/2 -translate-y-1/2 bg-blue-500/5 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-2xl" />
        </div>
      </div>
    </motion.div>
  );
};
