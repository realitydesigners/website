import Footer from "@/components/global/Footer";
import Navbar from "@/components/global/Navbar";

import "tailwindcss/tailwind.css";

export default async function TeamLayout({
	children,
}: { children: React.ReactNode }) {
	<script
		type="module"
		src="https://unpkg.com/@splinetool/viewer@0.9.506/build/spline-viewer.js"
	/>;
	return (
		<div className="flex min-h-screen flex-col bg-gray-200">
			<Navbar pageBackground="light" />
			{children}
			<Footer />
		</div>
	);
}
