import BottomNavbar from "@/components/global/BottomNavbar";
import Navbar from "@/components/global/Navbar";
import "tailwindcss/tailwind.css";

export default async function LibraryLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="w-screen h-screen bg-black">
			<Navbar />
			{children}
			{/* <BottomNavbar /> */}
		</div>
	);
}
