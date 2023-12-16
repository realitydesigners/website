import "tailwindcss/tailwind.css";
import { Suspense } from "react";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import Loading from "./loading";

export default async function StoryLayout({
	children,
}: { children: React.ReactNode }) {
	<script
		type="module"
		src="https://unpkg.com/@splinetool/viewer@0.9.506/build/spline-viewer.js"
	/>;
	return (
		<div className="flex min-h-screen flex-col bg-gray-200">
			<Navbar pageBackground="light" />
			<Suspense fallback={<Loading />}>{children}</Suspense>
			<Footer />
		</div>
	);
}
