"use client";
import { bebe, monomaniac, staatliches } from "@/fonts";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";

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
	const handleBackdropClick = () => {
		closeNav();
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
		<>
			{isNavOpen && (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<div
					className="fixed inset-0 bg-black/10 backdrop-blur-[.1em] z-40"
					onClick={handleBackdropClick}
				/>
			)}

			<nav
				id="navbar"
				className="flex  bg-gray-200  shadow-lg items-center h-12 p-2 justify-between fixed w-full z-50 "
			>
				<div className="pl-6 w-full justify-center relative flex items-center z-10">
					<Link
						href="/"
						className={`${monomaniac.className} text-black items-center pt-2 pb-2  flex flex-row`}
						onClick={closeNav}
					>
						<div className=" left-2 absolute ">{getIcon("logo")}</div>
						<div className="w-full   justify-center items-center flex h-auto flex-col">
							<span className="text-lg font-bold tracking-wide leading-none">
								REALITY
							</span>
							<span className="text-sm -mt-[1px] font-bold tracking-wide leading-none">
								DESIGNERS
							</span>
						</div>
					</Link>
				</div>

				<div className="relative ">
					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button
						id="nav-toggle"
						className="flex items-center h-10 w-10  justify-center relative  z-20 "
						aria-label="Toggle Menu"
						onClick={toggleNav}
					>
						{getIcon("menu")}
					</button>
				</div>

				<div
					id="nav-content"
					role="menu"
					className={`absolute  top-0 right-0 w-full lg:w-1/3 bg-gray-200  right-0 rounded-[0em] lg:rounded-[1em]  h-[95vh] lg:h-[90vh] mt-12 lg:mt-16  overflow-y-auto shadow-lg  transition-transform duration-300 ease-in-out ${
						isNavOpen ? "translate-x-0 right-0 lg:right-4" : "translate-x-full"
					}  flex flex-col justify-start p-3 `}
				>
					<div className="w-full mb-2 rounded-lg block   bg-black h-[250px]">
						<Link href="/" onClick={closeNav}>
							<spline-viewer url="https://prod.spline.design/HeD0BAam-X2SBMf3/scene.splinecode" />
						</Link>
					</div>
					<ul className="flex justify-center uppercase items-center gap-4 flex-col  mt-4">
						<li>
							<Link
								href="/feed"
								className={`${monomaniac.className} text-black text-5xl  font-bold hover:bg-gray-600/30  p-2 rounded-lg transition-all duration-200 ease-in-out`}
								onClick={closeNav}
							>
								Feed
							</Link>
						</li>
						<li>
							<Link
								href="/library"
								className={`${monomaniac.className} text-black text-5xl  font-bold hover:bg-gray-600/30  p-2 rounded-lg transition-all duration-200 ease-in-out`}
								onClick={closeNav}
							>
								Library
							</Link>
						</li>
						<li>
							<Link
								href="/posts"
								className={`${monomaniac.className} text-black text-5xl  font-bold hover:bg-gray-600/30  p-2 rounded-lg transition-all duration-200 ease-in-out`}
								onClick={closeNav}
							>
								Posts
							</Link>
						</li>
						<li>
							<Link
								href="/videos"
								className={`${monomaniac.className} text-black text-5xl font-bold hover:bg-gray-600/30 p-2 rounded-lg transition-all duration-200 ease-in-out`}
								onClick={closeNav}
							>
								Videos
							</Link>
						</li>
						<li>
							<Link
								href="/story"
								className={`${monomaniac.className} text-black  text-5xl font-bold hover:bg-gray-600/30  p-2 rounded-lg transition-all duration-200 ease-in-out`}
								onClick={closeNav}
							>
								Story
							</Link>
						</li>
					</ul>
					<SignedOut>
						<div className="flex mt-4  mr-0 justify-center">
							<SignInButton>
								{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
								<button className="relative justify-center text-[1.3em] ml-4 mr-2 p-2 pl-3 pr-3 items-center flex text-gray-200 rounded-full transition-all duration-200 ease-in-out bg-black">
									<span
										className={`${staatliches.className}  whitespace-nowrap`}
									>
										Sign-In
									</span>
								</button>
							</SignInButton>
						</div>
					</SignedOut>

					<SignedIn>
						<div className=" relative mt-4 justify-center   flex ">
							<UserButton afterSignOutUrl="/" />
						</div>
					</SignedIn>
				</div>
			</nav>
		</>
	);
}
