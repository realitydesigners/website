"use client";
import { monomaniac } from "@/fonts";
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
					width="30"
					height="30"
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
		};
		return icons[name] || <path />;
	};

	const navLinks = [
		{ href: "/feed", label: "Feed" },
		{ href: "/videos", label: "Videos" },
		{ href: "/library", label: "Library" },
		{ href: "/story", label: "Story" },
	];

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
				className="flex  shadow-xl items-center h-16 p-2 justify-center fixed bottom-0 w-full z-50 "
			>
				<div className=" w-full lg:w-1/5 md:w-1/3  justify-center items-center  flex">
					<button
						id="nav-toggle"
						className=" h-12 w-full flex justify-center rounded-[.5em] items-center border border-gray-600/25 bg-black/50 backdrop-blur-xl z-20 "
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
					className={`absolute  bottom-6 right-0 w-full lg:w-1/3 bg-black/80 items-center justify-center flex right-0 rounded-[0em] lg:rounded-[1em]  h-[95vh] lg:h-[70vh] mt-12 lg:mt-16  overflow-y-auto shadow-lg  transition-transform duration-0 ease-in-out ${
						isNavOpen
							? "translate-x-0 right-0 lg:right-4 lg:border lg:border-gray-600/25 lg:shadow-lg"
							: "translate-x-full"
					}  flex flex-col justify-start p-3 `}
				>
					<div className="w-full mb-2 rounded-lg block h-[250px]">
						<Link href="/" onClick={closeNav}>
							<Spline scene="https://prod.spline.design/HB9ZzkKt9KuAM3Xf/scene.splinecode" />
						</Link>
					</div>
					<ul className="grid grid-cols-2 lg:grid-cols-3 gap-1 mt-4 flex flex-wrap">
						{/* Map over navLinks and render each link dynamically */}
						{navLinks.map(({ href, label }) => (
							<li key={label}>
								<Link
									href={href}
									className={`${monomaniac.className} text-center text-gray-200 text-3xl uppercase font-bold p-4 transition-all duration-200 ease-in-out border border-gray-600/25 block hover:bg-white hover:text-black`}
									onClick={closeNav}
								>
									{label}
								</Link>
							</li>
						))}
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
