"use client";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import React, { useState } from "react";
import { BiBook, BiLock, BiVideo } from "react-icons/bi";
import { IoBookOutline } from "react-icons/io5";

export default function SiteNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    document.body.style.overflow = isNavOpen ? "auto" : "hidden";
  };
  const closeNav = () => {
    setIsNavOpen(false);
    document.body.style.overflow = "auto";
  };
  const handleBackdropClick = () => {
    closeNav();
  };

  const Links = [
    { href: "/story", label: "Story", icon: "story" },
    {
      href: "https://www.youtube.com/@realitydesigners",
      label: "Videos",
      icon: "video",
    },
    { href: "#", label: "Library", icon: "lock" },
    { href: "/lab", label: "Lab", icon: "video" },
    { href: "#", label: "Contact", icon: "lock" },
  ];

  const getIcon = (name) => {
    const icons = {
      logo: (
        // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
        <svg
          width="35"
          height="35"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M47.1279 70.8731L33.5967 55.3087M43.4729 23.3416L10.6978 28.9689L33.5967 55.3087M43.4729 23.3416L33.5967 55.3087M43.4729 23.3416L68.3831 51.4708L33.5967 55.3087M43.4729 23.3416L30.6805 9.58502"
            stroke="#fff" //{logoColor}
            strokeWidth="6"
          />
        </svg>
      ),
      menu: (
        // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
        <svg
          width="35"
          height="35"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#fff" //{logoColor}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isNavOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      ),
      library: <BiBook size={24} />,
      lock: <BiLock size={24} />,
      story: <IoBookOutline size={24} />,
      video: <BiVideo size={24} />,
    };
    return icons[name] || null;
  };

  return (
    <>
      {isNavOpen && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <div
          className="fixed inset-0 z-40 bg-black backdrop-blur-[.5em] lg:bg-black/20"
          onClick={handleBackdropClick}
        />
      )}

      <nav
        id="navbar"
        className="fixed  top-0 z-50 flex h-12 w-full items-center justify-between p-2 "
      >
        <div className="relative z-10 flex w-full items-center justify-center pl-[2.3em]">
          <Link
            href="/"
            className={`  flex flex-row items-center pb-2  pt-2 text-gray-200`}
            onClick={closeNav}
          >
            <div className=" absolute left-2 ">{getIcon("logo")}</div>
            <div className="flex font-russo   h-auto w-full flex-col items-center justify-center">
              <span className="text-[1.1rem] leading-none tracking-wide">
                REALITY
              </span>
              <span className=" text-[.8rem] leading-none tracking-wide">
                DESIGNERS
              </span>
            </div>
          </Link>
        </div>

        <div className="relative ">
          <button
            id="nav-toggle"
            className="relative z-20 flex h-10  w-10 items-center  justify-center "
            aria-label="Toggle Menu"
            onClick={toggleNav}
            type="button"
          >
            {getIcon("menu")}
          </button>
        </div>

        <div
          id="nav-content"
          role="menu"
          className={`lg:duration-600 absolute right-0 top-0 mt-12 h-[95vh] h-full w-full flex-col rounded-[0em] bg-black shadow-lg transition-transform duration-0 ease-in-out lg:mt-0  lg:h-[100vh] lg:w-full lg:rounded-[1em] lg:bg-black/80 lg:py-16 ${
            isNavOpen ? "translate-x-0 " : "translate-x-full "
          } flex h-screen w-full flex-col justify-start p-3`}
        >
          <div className="h-full overflow-y-auto lg:flex lg:justify-between">
            <div className="mb-2 block w-full border border-gray-600/25 lg:order-2 lg:mb-0 lg:h-full lg:w-2/3">
              <Link href="/" onClick={closeNav}>
                <Spline scene="https://prod.spline.design/WV4nziwJaLKBH2tE/scene.splinecode" />
              </Link>
            </div>
            <div className="h-full w-full lg:w-1/3 ">
              <ul className="grid grid-cols-1 gap-2 pr-2 lg:order-1">
                {Links.map(({ href, label, icon }) => (
                  <li key={label} className="flex items-center">
                    <Link
                      href={href}
                      className={` font-russo   block flex h-full w-full items-center justify-center border border-gray-600/25 bg-black/10 p-4 text-left text-4xl font-bold uppercase text-gray-200 backdrop-blur-[20px] transition-all duration-200 ease-in-out hover:bg-white hover:text-black lg:text-7xl`}
                      onClick={closeNav}
                    >
                      <div className="mr-6 flex min-h-10 min-w-10 items-center">
                        {getIcon(icon)}
                      </div>
                      <span className="flex-grow text-[10vw] lg:text-[5vw]">
                        {label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="text-md text-gray-200  w-full font-kodemono tracking-wide py-4 text-center ">
                hey@reality-designers.com{" "}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
