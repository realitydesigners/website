"use client";

import { motion } from "framer-motion";

import { FaCode, FaCube, FaChartLine, FaBrain } from "react-icons/fa";

interface AutoBoxModuleProps {
  visibility?: {
    isVisible: boolean;
    distance: number;
  };
}

const FEATURES = [
  {
    icon: FaCube,
    title: "Market Geometry",
    description: "Learn to see the market as a geometric object",
  },
  {
    icon: FaCode,
    title: "Trading States",
    description:
      "Prices move up and down, but the market is always in one state or another",
  },
  {
    icon: FaChartLine,
    title: "Pattern Recognition",
    description:
      "Visualize complex market patterns through geometric relationships",
  },
  {
    icon: FaBrain,
    title: "Algorithmic Analysis",
    description: "Advanced mathematics driving pattern detection",
  },
];

export const BoxInfo: React.FC<AutoBoxModuleProps> = ({ visibility }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: visibility?.isVisible ? 1 : 0,
        x: visibility?.isVisible ? 0 : -20,
      }}
      transition={{ duration: 0.5 }}
      className="fixed top-1/2 left-20 w-[800px] -translate-y-1/2 space-y-12"
    >
      {/* Main Content */}
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-gray-gradient font-outfit relative z-10 text-[3em] leading-[1em] font-bold tracking-tight lg:text-[6em] lg:leading-[1em]">
            The Future of
            <br />
            Market Analysis
          </h2>
          <p className="text-dark-gray font-kodemono w-11/12 text-lg lg:text-xl">
            The universal pattern recognition toolkit designed for trading.
          </p>
        </div>

        {/* Features Grid */}
        {/* <div className="grid grid-cols-2 gap-3">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/90 p-4 backdrop-blur-lg"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_50%)]" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.03),transparent_50%)]" />
              </div>

              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-b from-blue-500/10 to-blue-500/5">
                    <feature.icon className="h-4 w-4 text-blue-400" />
                  </div>
                  <h3 className="font-outfit text-sm font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="font-kodemono text-xs leading-relaxed text-white/60">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div> */}
      </div>
    </motion.div>
  );
};
