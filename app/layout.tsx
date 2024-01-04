import { cairo, monomaniac } from "@/fonts";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import "tailwindcss/tailwind.css";

export const metadata: Metadata = {
	title: "Reality Designers",
	description:
		"Reality Designers is a collective of artists, designers, and engineers who are building the next generation of immersive experiences.",
};

export default async function ROotLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en" className={`${cairo.className} `}>
				<head>
					<link rel="icon" href="/favicon.ico" sizes="any" />
					<script
						type="module"
						src="https://unpkg.com/@splinetool/viewer@1.0.17/build/spline-viewer.js"
					/>
				</head>
				<body>
					{children}
					<Analytics />
				</body>
			</html>
		</ClerkProvider>
	);
}
