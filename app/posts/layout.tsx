import BottomNavbar from "@/components/global/BottomNavbar";
import Footer from "@/components/global/Footer";
import Navbar from "@/components/global/Navbar";

import "tailwindcss/tailwind.css";

export default async function PostsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="w-screen h-auto">
			{children}
			<Navbar />
		</div>
	);
}
