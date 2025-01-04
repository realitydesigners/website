"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Buttons } from "@/app/(user)/home/config";
import { useNavigation } from "@/components/providers/NavigationProvider";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { currentSection, handleButtonClick } = useNavigation();
  const pathname = usePathname();

  if (pathname === "/create") return null;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);
    handleButtonClick("", false);
    if (window.location.hash) {
      history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search
      );
    }
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <>
      <nav
        id="navbar"
        className="fixed top-0 z-50 flex h-12 w-full items-center justify-between p-2"
      >
        <svg
          width="35"
          height="35"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M47.1279 70.8731L33.5967 55.3087M43.4729 23.3416L10.6978 28.9689L33.5967 55.3087M43.4729 23.3416L33.5967 55.3087M43.4729 23.3416L68.3831 51.4708L33.5967 55.3087M43.4729 23.3416L30.6805 9.58502"
            stroke="#fff"
            strokeWidth="6"
          />
        </svg>
        <div className="relative z-10 flex w-full items-center justify-center pl-[2.3em]">
          <Link
            href="/"
            className={`flex flex-row items-center pb-2 pt-2 text-gray-200`}
          >
            <div className="flex font-russo h-auto w-full flex-col items-center justify-center">
              <span className="text-[1.1rem] leading-none tracking-wide">
                REALITY
              </span>
              <span className="text-[.8rem] leading-none tracking-wide">
                DESIGNERS
              </span>
            </div>
          </Link>
        </div>

        <div className="relative flex items-center pt-1 pr-1 ">
          {Buttons.filter((button) => button.sectionId === "").map((button) => (
            <div key={button.sectionId || "home"} className="group relative">
              <button
                onClick={handleClick}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-white/20 to-white/5 backdrop-blur-sm transition-all duration-300"
                aria-label="Navigate to home"
              >
                <div className="relative text-white">
                  {button.icon && (
                    <motion.div
                      animate={{
                        scale: isClicked ? [1, 0.8, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                    >
                      <button.icon size={22} className="text-white" />
                    </motion.div>
                  )}
                  {currentSection === button.sectionId && (
                    <motion.div
                      className="absolute inset-[-12px] rounded-xl border border-white/10 bg-gradient-to-tr from-white/5 to-transparent"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0, 0.2],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </div>
              </button>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};
