"use client";
import { monomaniac } from "@/fonts";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import React, { useState } from "react";

export default function Navbar() {
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
		{ href: "#", label: "Blog", icon: "lock" },
		{ href: "#", label: "Library", icon: "lock" },
		{ href: "#", label: "Projects", icon: "lock" },
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

	return (
		<>
			{isNavOpen && (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<div
					className="fixed inset-0 bg-black lg:bg-black/20 backdrop-blur-[.5em] z-40"
					onClick={handleBackdropClick}
				/>
			)}

			<nav
				id="navbar"
				className="flex  items-center h-12 p-2 justify-between fixed top-0 w-full z-50 "
			>
				<div className="pl-[2.3em] w-full justify-center relative flex items-center z-10">
					<Link
						href="/"
						className={`${monomaniac.className} text-gray-200 items-center pt-2 pb-2  flex flex-row`}
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
					<button
						id="nav-toggle"
						className="flex items-center h-10 w-10  justify-center relative  z-20 "
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
					className={`absolute top-0 right-0 w-full lg:w-full bg-black lg:bg-black/80 flex-col rounded-[0em] lg:rounded-[1em] h-[95vh] lg:h-[100vh] mt-12 lg:mt-0 lg:py-16 h-full  shadow-lg transition-transform duration-0 lg:duration-600 ease-in-out ${
						isNavOpen ? "translate-x-0 " : "translate-x-full "
					} flex flex-col w-full h-screen justify-start p-3`}
				>
					<div className="lg:flex lg:justify-between h-full overflow-y-auto">
						<div className="w-full lg:w-2/3 mb-2 lg:mb-0 block border border-gray-600/25 lg:h-full lg:order-2">
							<Link href="/" onClick={closeNav}>
								<Spline scene="https://prod.spline.design/WV4nziwJaLKBH2tE/scene.splinecode" />
							</Link>
						</div>
						<div className="w-full lg:w-1/3 h-full ">
							<ul className="grid gap-2 grid-cols-1 lg:order-1 pr-2">
								{Links.map(({ href, label, icon }) => (
									<li key={label} className="flex items-center">
										<Link
											href={href}
											className={`${monomaniac.className} w-full justify-center text-left h-full text-gray-200 text-4xl lg:text-7xl backdrop-blur-[20px] bg-black/10 uppercase font-bold p-4 transition-all duration-200 ease-in-out border border-gray-600/25 block hover:bg-white hover:text-black flex items-center`}
											onClick={closeNav}
										>
											<div className="min-w-10 min-h-10 mr-6 flex items-center">
												{getIcon(icon)}
											</div>
											<span className="flex-grow text-[10vw] lg:text-[5vw]">
												{label}
											</span>
										</Link>
									</li>
								))}
							</ul>
							<div className="text-md py-4 w-full text-center bg-gradient-to-r from-blue-100/60 to-blue-100/50 text-transparent bg-clip-text">
								hey@reality-designers.com{" "}
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}
