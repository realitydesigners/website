"use client";

interface AutoBoxModuleProps {
  visibility?: {
    isVisible: boolean;
    distance: number;
  };
}

export const DataStream: React.FC<AutoBoxModuleProps> = ({ visibility }) => {
  return (
    <div className="absolute top-1/2 left-1/2 z-10 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 px-4">
      <div className="relative">
        <div className="space-y-8 text-center">
          <div>
            <h2 className="font-outfit text-[2.5em] leading-[1em] font-bold text-white lg:text-[6em]">
              The First Smart
              <br />
              Pattern Recognition
              <br />
              Tool For Trading
            </h2>
          </div>

          <div>
            <p className="font-outfit text-gray-400 lg:text-2xl">
              The first universal pattern recognition toolkit
              <br />
              designed for trading
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 h-48 w-96 -translate-x-1/2 -translate-y-1/2 bg-blue-500/5 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-2xl" />
        </div>
      </div>
    </div>
  );
};
