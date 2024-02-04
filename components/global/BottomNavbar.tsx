"use client";
import { bebe, monomaniac } from "@/fonts";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import React, { useState } from "react";

export default function BottomNavbar() {
	const [isNavOpen, setIsNavOpen] = useState(false);

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
					className="fixed inset-0 bg-black/20 backdrop-blur-[.2em] z-40"
					onClick={handleBackdropClick}
				/>
			)}

			<nav
				id="navbar"
				className="flex  shadow-xl items-center h-20 p-2 justify-center fixed bottom-0 w-full z-50 "
			>
				<div className=" w-full lg:w-1/5 md:w-1/3  justify-center items-center  flex">
					<button
						id="nav-toggle"
						className=" h-16 w-full flex justify-center rounded-[.5em] items-center border border-gray-600/25 bg-black/50 backdrop-blur-xl z-20 "
						aria-label="Toggle Menu"
						onClick={toggleNav}
						type="button"
					>
						{getIcon("logo")}
					</button>
				</div>

				<div
					id="nav-content"
					role="menu"
					className={`absolute  bottom-7 right-0 w-full lg:w-1/3 bg-black/80  right-0 rounded-[0em] lg:rounded-[1em]  h-[90vh] lg:h-[70vh] mt-12 lg:mt-16  overflow-y-auto shadow-lg  transition-transform duration-300 ease-in-out ${
						isNavOpen
							? "translate-x-0 right-0 lg:right-4 lg:border lg:border-gray-600/50 lg:shadow-lg"
							: "translate-x-full"
					}  flex flex-col justify-start p-3 `}
				>
					<div className="w-full mb-2 rounded-lg block border border-gray-600/50   h-[250px]">
						<Link href="/" onClick={closeNav}>
							<Spline scene="https://prod.spline.design/HB9ZzkKt9KuAM3Xf/scene.splinecode" />
						</Link>
					</div>
					<ul className="flex justify-center text-gray-200 uppercase items-center gap-4 flex-col  mt-4">
						<li>
							<Link
								href="/feed"
								className={`${monomaniac.className}  text-5xl  font-bold hover:bg-gray-600/30  p-2 rounded-lg transition-all duration-200 ease-in-out`}
								onClick={closeNav}
							>
								Feed
							</Link>
						</li>

						<li>
							<Link
								href="/videos"
								className={`${monomaniac.className}  text-5xl font-bold hover:bg-gray-600/30 p-2 rounded-lg transition-all duration-200 ease-in-out`}
								onClick={closeNav}
							>
								Videos
							</Link>
						</li>
						<li>
							<Link
								href="/library"
								className={`${monomaniac.className} text-5xl  font-bold hover:bg-gray-600/30  p-2 rounded-lg transition-all duration-200 ease-in-out`}
								onClick={closeNav}
							>
								Library
							</Link>
						</li>

						<li>
							<Link
								href="/story"
								className={`${monomaniac.className}  text-5xl font-bold hover:bg-gray-600/30  p-2 rounded-lg transition-all duration-200 ease-in-out`}
								onClick={closeNav}
							>
								Story
							</Link>
						</li>
					</ul>
					<SignedOut>
						<div className="flex mt-4  mr-0 justify-center">
							<SignInButton>
								<button
									type="button"
									className="relative justify-center text-[1.3em] ml-4 mr-2 p-2 pl-3 pr-3 items-center flex text-gray-200 rounded-full transition-all duration-200 ease-in-out bg-black"
								>
									<span
										className={`${monomaniac.className}  whitespace-nowrap`}
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
