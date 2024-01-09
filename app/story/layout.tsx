import Footer from "@/components/global/Footer";
import Navbar from "@/components/global/Navbar";

import "tailwindcss/tailwind.css";

export default async function StoryLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col bg-black">
			<Navbar pageBackground="light" />
			{children}
			<Footer />
		</div>
	);
}
