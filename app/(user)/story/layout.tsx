import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";

import "tailwindcss/tailwind.css";

export default async function StoryLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col bg-black">
			<Navbar />
			{children}
			<Footer />
		</div>
	);
}
