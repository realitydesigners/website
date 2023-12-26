import "tailwindcss/tailwind.css";
import type { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { staatliches, cairo } from "@/fonts";


export const metadata: Metadata = {
	title: 'Reality Designers',
	description: 'Reality Designers is a collective of artists, designers, and engineers who are building the next generation of immersive experiences.',
};

export default async function ROotLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en" className={`${cairo.className} `}>
				<body>
					{children}
					<Analytics />
				</body>
			</html>
		</ClerkProvider>
	);
}
