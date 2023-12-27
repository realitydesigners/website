import Footer from "@/components/global/Footer";
import Navbar from "@/components/global/Navbar";
import { Suspense } from "react";
import "tailwindcss/tailwind.css";
import Loading from "./loading";

export default async function StoryLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col bg-gray-200">
			<Navbar pageBackground="light" />
			<Suspense fallback={<Loading />}>{children}</Suspense>
			<Footer />
		</div>
	);
}
