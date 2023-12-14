import "tailwindcss/tailwind.css";
import { IBM_Plex_Mono, Inter, PT_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import { Suspense } from "react";
import Loading from "./loading";

const serif = PT_Serif({
	variable: "--font-serif",
	style: ["normal", "italic"],
	subsets: ["latin"],
	weight: ["400", "700"],
});
const sans = Inter({
	variable: "--font-sans",
	subsets: ["latin"],
});
const mono = IBM_Plex_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
	weight: ["500", "700"],
});

export default async function RootLayout({
	children,
}: { children: React.ReactNode }) {
	<script
		type="module"
		src="https://unpkg.com/@splinetool/viewer@0.9.506/build/spline-viewer.js"
	/>;
	return (
		<ClerkProvider>
			<html
				lang="en"
				className={`${mono.variable} ${sans.variable} ${serif.variable} bg-gray-200`}
			>
				<body>
					<Navbar pageBackground="light" />
					<Suspense fallback={<Loading />}>{children}</Suspense>
					<Footer />
					<Analytics />
				</body>
			</html>
		</ClerkProvider>
	);
}
