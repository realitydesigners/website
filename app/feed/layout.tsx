import Footer from "@/components/global/Footer";
import Navbar from "@/components/global/Navbar";
import { Suspense } from "react";
import "tailwindcss/tailwind.css";
import Loading from "./loading";

export default async function PostsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="w-screen min-h-screen bg-gray-200">
			<Navbar pageBackground="light" />
			<Suspense fallback={<Loading />}>{children}</Suspense>
			<Footer />
		</div>
	);
}
