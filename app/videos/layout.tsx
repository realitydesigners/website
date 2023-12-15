import "tailwindcss/tailwind.css";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import { Suspense } from "react";
import Loading from "./loading";

export default async function PostsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="w-screen h-auto flex flex-col bg-gray-200">
			<Navbar pageBackground="light" />
			<Suspense fallback={<Loading />}>{children}</Suspense>
			<Footer />
		</div>
	);
}
