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
			lock: (
				// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
				<svg
					width="20"
					height="20"
					viewBox="0 0 18 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1 11C1 9.11438 1 8.17157 1.58579 7.58579C2.17157 7 3.11438 7 5 7H13C14.8856 7 15.8284 7 16.4142 7.58579C17 8.17157 17 9.11438 17 11V13C17 15.8284 17 17.2426 16.1213 18.1213C15.2426 19 13.8284 19 11 19H7C4.17157 19 2.75736 19 1.87868 18.1213C1 17.2426 1 15.8284 1 13V11Z"
						stroke="#444"
						strokeWidth="2"
					/>
					<path
						d="M13 6V5C13 2.79086 11.2091 1 9 1V1C6.79086 1 5 2.79086 5 5V6"
						stroke="#444"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<circle cx="9" cy="13" r="2" fill="#444" />
				</svg>
			),
			story: (
				// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
				<svg
					width="20"
					height="16"
					viewBox="0 0 20 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M19 12.6953V1.66466C19 1.34631 18.6785 1.12861 18.3829 1.24685L14.1351 2.94596C14.0473 2.98109 13.9506 2.98765 13.8588 2.96471L6.14116 1.03529C6.04939 1.01235 5.95273 1.01891 5.8649 1.05404L1.28287 2.88685C1.11203 2.95519 1 3.12066 1 3.30466V14.3353C1 14.6537 1.32154 14.8714 1.61713 14.7531L5.8649 13.054C5.95273 13.0189 6.04939 13.0123 6.14117 13.0353L13.8588 14.9647C13.9506 14.9877 14.0473 14.9811 14.1351 14.946L18.7171 13.1131C18.888 13.0448 19 12.8793 19 12.6953Z"
						stroke="#999"
						strokeWidth="2"
						strokeLinejoin="round"
					/>
					<path d="M14 15V3" stroke="#999" strokeWidth="2" />
					<path d="M6 13L6 1" stroke="#999" strokeWidth="2" />
				</svg>
			),
			video: (
				// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
				<svg
					width="20"
					height="16"
					viewBox="0 0 20 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M19 12.6953V1.66466C19 1.34631 18.6785 1.12861 18.3829 1.24685L14.1351 2.94596C14.0473 2.98109 13.9506 2.98765 13.8588 2.96471L6.14116 1.03529C6.04939 1.01235 5.95273 1.01891 5.8649 1.05404L1.28287 2.88685C1.11203 2.95519 1 3.12066 1 3.30466V14.3353C1 14.6537 1.32154 14.8714 1.61713 14.7531L5.8649 13.054C5.95273 13.0189 6.04939 13.0123 6.14117 13.0353L13.8588 14.9647C13.9506 14.9877 14.0473 14.9811 14.1351 14.946L18.7171 13.1131C18.888 13.0448 19 12.8793 19 12.6953Z"
						stroke="#999"
						strokeWidth="2"
						strokeLinejoin="round"
					/>
					<path d="M14 15V3" stroke="#999" strokeWidth="2" />
					<path d="M6 13L6 1" stroke="#999" strokeWidth="2" />
				</svg>
			),
		};
		return icons[name] || <path />;
	};

	const navLinks = [
		{ href: "#", label: "Feed", icon: "lock" },
		{ href: "#", label: "Videos", icon: "video" },
		{ href: "#", label: "Library", icon: "lock" },
		{ href: "#", label: "Portal", icon: "lock" },
		{ href: "/story", label: "Story", icon: "story" },
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
						<div className="min-w-10 min-h-10">{getIcon("logo")}</div>
					</button>
				</div>

				<div
					id="nav-content"
					role="menu"
					className={`absolute  bottom-6 right-0 w-full lg:w-1/3 bg-black/80 items-center justify-end pb-6 lg:pb-0 lg:justify-center flex right-0 rounded-[0em] lg:rounded-[1em]  h-[95vh] lg:h-[70vh] mt-12 lg:mt-16  overflow-y-auto shadow-lg  transition-transform duration-0 ease-in-out ${
						isNavOpen
							? "translate-x-0 right-0 lg:right-4 lg:border lg:border-gray-600/25 lg:shadow-lg"
							: "translate-x-full"
					}  flex flex-col justify-start p-3 `}
				>
					<div className="w-full  rounded-lg  h-[125px]">
						<Link href="/" onClick={closeNav}>
							<Spline scene="https://prod.spline.design/a1UK0U9EA2vi6a-h/scene.splinecode" />
						</Link>
					</div>
					<div>
						<SignedOut>
							<div className="flex mt-6 justify-center">
								<SignInButton>
									<button
										type="button"
										className="relative uppercase text-black border border-gray-600/50 justify-center text-md ml-4 mr-2 p-1 pl-2 pr-2 items-center flex text-black rounded-[.2em] transition-all duration-200 ease-in-out bg-white hover:bg-gray-200 hover:text-black"
									>
										<span
											className={`${monomaniac.className} whitespace-nowrap`}
										>
											Log In / Sign Up
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
					<ul className="grid grid-cols-2 lg:grid-cols-3 gap-2 mt-4  flex flex-wrap">
						{navLinks.map(({ href, label, icon }) => (
							<li key={label}>
								<Link
									href={href}
									className={`${monomaniac.className} flex flex-col items-center justify-center text-center text-gray-200 text-2xl backdrop-blur-[20px] bg-black/10 uppercase font-bold p-4 transition-all duration-200 ease-in-out border border-gray-600/25 block hover:bg-white hover:text-black`}
									onClick={closeNav}
								>
									<div className="min-w-10 min-h-10 mb-2 flex items-center justify-center">
										{getIcon(icon)}
									</div>
									<span>{label}</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</nav>
		</>
	);
}
