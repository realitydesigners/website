"use client";
import React, { useEffect, useState } from "react";

const sequences: any[] = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, -1],
  [1, 1, 1, 1, 1, 1, -1, -1],
  [1, 1, 1, 1, 1, -1, -1, -1],
  [1, 1, 1, 1, -1, -1, -1, -1],
  [1, 1, 1, 1, -1, -1, -1, 1],
  [1, 1, 1, 1, -1, -1, 1, 1],
  [1, 1, 1, 1, -1, 1, 1, -1],
  [1, 1, 1, 1, -1, 1, -1, -1],
  [1, 1, 1, 1, -1, -1, -1, -1],
  [1, 1, 1, -1, -1, -1, -1, -1],
  [1, 1, 1, -1, -1, -1, -1, 1],
  [1, 1, 1, -1, -1, -1, 1, 1],
  [1, 1, 1, -1, -1, 1, 1, -1],
  [1, 1, 1, -1, -1, 1, -1, -1],
  [1, 1, 1, -1, -1, 1, -1, 1],
  [1, 1, 1, -1, -1, 1, 1, 1],
  [1, 1, 1, -1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
] as any[];

// Convert sequences to ConfigState format
const CONFIGS: any[] = sequences.map((config) => ({
  config,
  label: config.map((n) => (n === 1 ? "P" : "N")).join(""), // P for Positive, N for Negative
}));

interface AutoBoxModuleProps {
  splineRef: any;
  visibility?: {
    isVisible: boolean;
    distance: number;
    isScaled: boolean;
  };
}

export const BoxSection: React.FC<AutoBoxModuleProps> = ({
  splineRef,
  visibility,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentConfigIndex, setCurrentConfigIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [boxStates, setBoxStates] = useState<any[]>([
    { name: "Box 1", position: 1 },
    { name: "Box 2", position: 1 },
    { name: "Box 3", position: 1 },
    { name: "Box 4", position: 1 },
    { name: "Box 5", position: 1 },
    { name: "Box 6", position: 1 },
    { name: "Box 7", position: 1 },
    { name: "Box 8", position: 1 },
  ]);

  // Constants
  const ANIMATION_DURATION = 500;
  const ANIMATION_STEPS = 30;
  const GREEN_BOXES = ["1g", "2g", "3g", "4g", "5g", "6g", "7g", "8g"];

  // Helper functions
  const calculateBoxDimensions = (
    index: number,
    baseSize: number,
    scaleFactor: number
  ): any => {
    const scale = Math.pow(1 / scaleFactor, index);
    return {
      size: baseSize * scale,
      scale,
      position: { x: 0, y: 0, z: 0 },
    };
  };

  const calculateCornerOffset = (
    currentBox: any,
    parentBox: any,
    scaleFactor: number
  ): number => {
    const cornerDistance =
      ((parentBox.size - currentBox.size) / 2 + currentBox.size / 2) *
      (1 / Math.sqrt(1.2));
    return cornerDistance;
  };

  // Box manipulation functions
  const applyBoxConfiguration = async (config: any) => {
    if (isAnimating || !splineRef.current) return;

    setIsAnimating(true);
    setBoxStates((prevStates) =>
      prevStates.map((box, index) => ({
        ...box,
        position: config[index],
      }))
    );

    try {
      const spline = splineRef.current;
      const boxes = new Map();

      let currentParentY = 0;
      for (let i = 1; i <= 7; i++) {
        const box = spline.findObjectByName(GREEN_BOXES[i]);
        const parentBox = spline.findObjectByName(GREEN_BOXES[i - 1]);

        if (box && parentBox) {
          const currentDimensions = calculateBoxDimensions(
            i,
            100,
            Math.sqrt(2)
          );
          const parentDimensions = calculateBoxDimensions(
            i - 1,
            100,
            Math.sqrt(2)
          );
          const cornerOffset = calculateCornerOffset(
            currentDimensions,
            parentDimensions,
            Math.sqrt(2)
          );

          const finalY =
            currentParentY + (config[i] === 1 ? cornerOffset : -cornerOffset);
          currentParentY = finalY;

          boxes.set(i, {
            box,
            startY: box.position.y,
            cornerOffset,
            finalY,
          });
        }
      }

      // Animate
      for (let step = 0; step <= ANIMATION_STEPS; step++) {
        const progress = step / ANIMATION_STEPS;
        for (let i = 7; i >= 1; i--) {
          const data = boxes.get(i);
          if (data) {
            const { box, startY, finalY } = data;
            const newY = startY + (finalY - startY) * progress;
            box.position.y = newY;
          }
        }
        await new Promise((resolve) =>
          setTimeout(resolve, ANIMATION_DURATION / ANIMATION_STEPS)
        );
      }

      // Set final positions
      boxes.forEach((data) => {
        data.box.position.y = data.finalY;
      });
    } finally {
      setIsAnimating(false);
    }
  };

  // Initial box setup
  useEffect(() => {
    const spline = splineRef.current;
    if (!spline) return;

    const positionNestedBoxes = (boxNames: string[]) => {
      boxNames.forEach((name, index) => {
        const currentBox = spline.findObjectByName(name);

        if (currentBox) {
          try {
            const currentDimensions = calculateBoxDimensions(
              index,
              100,
              Math.sqrt(2)
            );

            currentBox.scale.x = currentDimensions.scale;
            currentBox.scale.y = currentDimensions.scale;
            currentBox.scale.z = currentDimensions.scale;

            if (index > 0) {
              const parentName = GREEN_BOXES[index - 1];
              const parentBox = spline.findObjectByName(parentName);

              if (parentBox) {
                const parentDimensions = calculateBoxDimensions(
                  index - 1,
                  100,
                  Math.sqrt(2)
                );

                const cornerOffset = calculateCornerOffset(
                  currentDimensions,
                  parentDimensions,
                  Math.sqrt(2)
                );

                currentBox.position.x = parentBox.position.x + cornerOffset;
                currentBox.position.y = parentBox.position.y + cornerOffset;
                currentBox.position.z = parentBox.position.z - cornerOffset;
              }
            } else {
              currentBox.position.x = 0;
              currentBox.position.y = 0;
              currentBox.position.z = 0;
            }
          } catch (error) {
            console.error(`Error manipulating box ${name}:`, error);
          }
        }
      });
    };

    // Position the boxes and start auto-play
    positionNestedBoxes(GREEN_BOXES);
    setIsInitialized(true);
  }, [splineRef.current]);

  // Auto-play effect
  useEffect(() => {
    if (!isInitialized) return;

    const playNextConfig = async () => {
      if (isAnimating) return;

      await applyBoxConfiguration(CONFIGS[currentConfigIndex].config);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentConfigIndex((prev) => (prev + 1) % CONFIGS.length);
    };

    playNextConfig();
  }, [currentConfigIndex, isAnimating, isInitialized]);

  return (
    <div className="fixed right-8 bottom-8 w-[320px]">
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/90 shadow-2xl backdrop-blur-lg">
        {/* Enhanced Glow Effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_50%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.03),transparent_50%)]" />
        </div>

        {/* Ultra Compact Header */}
        <div className="flex h-8 items-center justify-between px-3">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center gap-1">
              <div className="h-1 w-1 rounded-full bg-blue-400" />
              <div className="h-1 w-1 rounded-full bg-blue-400/50" />
              <div className="h-1 w-1 rounded-full bg-blue-400/20" />
            </div>
            <span className="font-kodemono text-[10px] tracking-wider text-white/40">
              {currentConfigIndex + 1}/{CONFIGS.length}
            </span>
          </div>
        </div>

        {/* Pattern Display */}
        <div className="space-y-3 p-3">
          {/* Sequence Visualization */}
          <div className="relative h-14 w-full overflow-hidden rounded-lg bg-gradient-to-b from-black/60 to-black/40">
            <div className="absolute inset-0 flex items-center justify-center gap-0.5">
              {sequences[currentConfigIndex].map((value, idx) => (
                <div
                  key={idx}
                  className={`w-[3px] rounded-full ${
                    value === 1
                      ? "bg-gradient-to-t from-blue-400/10 via-blue-400/30 to-blue-400/50"
                      : "bg-gradient-to-b from-blue-300/5 via-blue-300/10 to-blue-300/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Compact Box Grid */}
          <div className="grid grid-cols-8 gap-[2px]">
            {boxStates.map((box, index) => (
              <div key={box.name} className="group relative">
                <div
                  className={`relative flex h-8 w-full flex-col items-center justify-center rounded border transition-all duration-300 ${
                    box.position === 1
                      ? "border-blue-400/20 bg-gradient-to-b from-blue-500/10 to-blue-500/5 hover:border-blue-400/40"
                      : "border-blue-300/10 bg-gradient-to-b from-blue-300/5 to-transparent hover:border-blue-300/20"
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] font-bold ${box.position === 1 ? "text-blue-400" : "text-blue-300/50"}`}
                  >
                    {box.position === 1 ? "1" : "0"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sleek Progress Bar */}
        <div className="px-3 pb-2">
          <div className="relative h-[2px] w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div
              className="absolute h-full bg-gradient-to-r from-blue-400/40 to-blue-400/60 transition-all duration-500"
              style={{
                width: `${(currentConfigIndex / (CONFIGS.length - 1)) * 100}%`,
                boxShadow: "0 0 20px rgba(59,130,246,0.3)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
