"use client";

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
    <div className="fixed top-1/2 left-20 w-[800px] -translate-y-1/2 space-y-12">
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
      </div>
    </div>
  );
};
