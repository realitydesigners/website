"use client";
import { useState } from "react";
import { Buttons } from "../config";

interface NavigationDotsProps {
  currentSection: string;
  onButtonClick: (sectionId: string, setHash: boolean) => void;
}

export const NavigationDots: React.FC<NavigationDotsProps> = ({
  currentSection,
  onButtonClick,
}) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const handleClick = (sectionId: string) => {
    setClickedButton(sectionId);
    onButtonClick(sectionId, sectionId === "" ? false : true);
    if (sectionId === "" && window.location.hash) {
      history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search
      );
    }
    setTimeout(() => setClickedButton(null), 300);
  };

  return (
    <div className="fixed bottom-8 left-1/2 z-[1000] flex -translate-x-1/2 flex-row items-center gap-4">
      {Buttons.map((button) => (
        <div key={button.sectionId} className="group relative">
          <button
            onClick={() => handleClick(button.sectionId)}
            onMouseEnter={() => setHoveredButton(button.sectionId)}
            onMouseLeave={() => setHoveredButton(null)}
            className="relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
            aria-label={`Navigate to ${button.name}`}
          >
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-tr from-white/5 to-white/10 backdrop-blur-sm transition-opacity duration-300 ${
                currentSection === button.sectionId
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />

            <div
              className={`relative h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentSection === button.sectionId
                  ? "bg-gradient-to-tr from-white/20 to-white/5 backdrop-blur-sm shadow-lg"
                  : "bg-gradient-to-tr from-white/20 to-white/5 ackdrop-blur-sm shadow-lg"
              } before:absolute before:inset-[-4px] before:rounded-full before:ring-2 before:ring-white/10 before:transition-all before:duration-300 group-hover:before:ring-4 group-hover:before:ring-white/20`}
            >
              {button.icon && (
                <div>
                  <button.icon
                    size={22}
                    className={`transition-all duration-300 ${
                      currentSection === button.sectionId ||
                      clickedButton === button.sectionId
                        ? "text-white"
                        : "text-white/40"
                    }`}
                  />
                </div>
              )}
              {currentSection === button.sectionId && (
                <div className="absolute inset-[-8px] rounded-full bg-gradient-to-tr from-white/10 to-white/5" />
              )}
            </div>
          </button>

          {/* <div
            className={`absolute bottom-full left-1/2 mb-3 -translate-x-1/2 rounded-lg px-3 py-1.5 backdrop-blur-sm transition-all duration-200 ${
              hoveredButton === button.sectionId
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-1 opacity-0"
            } before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-gray-900/90`}
          >
            <span className="text-sm font-medium whitespace-nowrap text-white">
              {button.name}
            </span>
          </div> */}
        </div>
      ))}
    </div>
  );
};
