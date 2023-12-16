"use client";
import Link from "next/link";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

import { staatliches } from "@/fonts";

interface SplineViewerProps extends React.HTMLAttributes<HTMLElement> {
	url: string;
}
interface NavbarProps {
	pageBackground: "light" | "dark";
}

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"spline-viewer": SplineViewerProps;
		}
	}
}

export default function Navbar({ pageBackground }: NavbarProps) {
	const [isNavOpen, setIsNavOpen] = useState(false);

	const logoColor = pageBackground === "dark" ? "white" : "black";

	const toggleNav = () => {
		setIsNavOpen(!isNavOpen);
		document.body.style.overflow = isNavOpen ? "auto" : "hidden";
	};
	const closeNav = () => {
		setIsNavOpen(false); // Close the navigation
		document.body.style.overflow = "auto"; // Enable scrolling
	};

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
						stroke={logoColor}
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
					stroke={logoColor}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d={isNavOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
					/>
				</svg>
			),
			library: (
				// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M4 3H20V21H4V3ZM6 5V19H18V5H6Z"
						stroke="currentColor"
						strokeWidth="2"
					/>
					<path d="M9 7H15" stroke="currentColor" strokeWidth="2" />
					<path d="M9 11H15" stroke="currentColor" strokeWidth="2" />
					<path d="M9 15H15" stroke="currentColor" strokeWidth="2" />
				</svg>
			),
			story: (
				// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M4 4H14L20 10V20H4V4Z"
						stroke="currentColor"
						strokeWidth="2"
					/>
					<path d="M14 4V10H20" stroke="currentColor" strokeWidth="2" />
					<path d="M6 12H12" stroke="currentColor" strokeWidth="2" />
					<path d="M6 16H12" stroke="currentColor" strokeWidth="2" />
				</svg>
			),
		};
		return icons[name] || <path />;
	};

	return (
		<nav
			id="navbar"
			className="flex bg-gray-200 shadow-lg items-center h-12 lg:h-14 p-2 justify-between fixed w-full z-50 "
		>
			<div className="pl-6 w-full lg:w-auto justify-center relative flex items-center z-10">
				<Link
					href="/"
					className={`${staatliches.className} text-black items-center pt-2 pb-2  flex flex-row`}
					onClick={closeNav}
				>
					<div className=" left-2 absolute ">{getIcon("logo")}</div>
					<div className="w-full   justify-center items-center flex h-auto flex-col">
						<span className="text-md font-bold tracking-widest leading-none">
							REALITY
						</span>
						<span className="text-xs font-bold tracking-widest leading-none">
							DESIGNERS
						</span>
					</div>
				</Link>
			</div>

			<div className="relative lg:pl-0">
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					id="nav-toggle"
					className="flex items-center h-10 w-10  justify-center relative  z-20 lg:hidden"
					aria-label="Toggle Menu"
					onClick={toggleNav}
				>
					{getIcon("menu")}
				</button>
			</div>

			<div
				id="nav-content"
				role="menu"
				className={`absolute lg:relative top-0 left-0 w-full bg-gray-200 lg:bg-transparent lg:w-auto h-screen lg:h-auto overflow-y-auto lg:overflow-visible transition-transform duration-300 ease-in-out ${
					isNavOpen ? "translate-x-0" : "-translate-x-full"
				} lg:translate-x-0 flex flex-col lg:flex-row justify-start lg:justify-end p-3  lg:p-0`}
			>
				<div className="w-full mb-2 rounded-lg block lg:hidden mt-12 bg-black h-[250px]">
					<script
						type="module"
						src="https://unpkg.com/@splinetool/viewer@0.9.506/build/spline-viewer.js"
					/>
					<Link href="/" onClick={closeNav}>
						<spline-viewer url="https://prod.spline.design/HeD0BAam-X2SBMf3/scene.splinecode" />
					</Link>
				</div>
				<ul className="flex justify-center items-center gap-4 flex-col lg:flex-row lg:space-x-2 mt-4 lg:mt-0">
					<li>
						<Link
							href="/library"
							className={`${staatliches.className} text-black text-6xl lg:text-[1.3em] font-bold hover:bg-gray-600/30 hover:text-gray-200 p-2 rounded-lg transition-all duration-200 ease-in-out`}
							onClick={closeNav}
						>
							Library
						</Link>
					</li>
					<li>
						<Link
							href="/posts"
							className={`${staatliches.className} text-black text-6xl lg:text-[1.3em] font-bold hover:bg-gray-600/30 hover:text-gray-200 p-2 rounded-lg transition-all duration-200 ease-in-out`}
							onClick={closeNav}
						>
							Posts
						</Link>
					</li>
					<li>
						<Link
							href="/videos"
							className={`${staatliches.className} text-black text-6xl lg:text-[1.3em] font-bold hover:bg-gray-600/30 hover:text-gray-200 p-2 rounded-lg transition-all duration-200 ease-in-out`}
							onClick={closeNav}
						>
							Videos
						</Link>
					</li>
					<li>
						<Link
							href="/story"
							className={`${staatliches.className} text-black  text-6xl lg:text-[1.3em] font-bold hover:bg-gray-600/30 hover:text-gray-200 p-2 rounded-lg transition-all duration-200 ease-in-out`}
							onClick={closeNav}
						>
							Story
						</Link>
					</li>
				</ul>
				<SignedOut>
					<div className="flex mt-4 lg:h-5 lg:mr-4 mr-0 lg:mt-0 justify-center">
						<SignInButton>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button className="relative justify-center text-[1.3em] ml-4 mr-2 p-2 pl-3 pr-3 items-center flex text-gray-200 rounded-full transition-all duration-200 ease-in-out bg-black">
								<span className={`${staatliches.className}  whitespace-nowrap`}>
									Sign-In
								</span>
							</button>
						</SignInButton>
					</div>
				</SignedOut>

				<SignedIn>
					<div className=" relative lg:ml-2 ml-0  lg:mr-4 mr-0 lg:mt-0 mt-4 justify-center  lg:p-2 flex ">
						<UserButton afterSignOutUrl="/" />
					</div>
				</SignedIn>
			</div>
		</nav>
	);
}
