import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
import { Suspense } from "react";
import "tailwindcss/tailwind.css";

export default async function PostsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="w-screen h-auto flex flex-col bg-gray-200">
			<Navbar />
			{children}
			<Footer />
		</div>
	);
}
