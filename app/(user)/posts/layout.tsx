import BottomNavbar from "@/components/navigation/BottomNavbar";
import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";

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
