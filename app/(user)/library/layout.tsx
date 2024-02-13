import BottomNavbar from "@/components/navigation/BottomNavbar";
import Navbar from "@/components/navigation/Navbar";
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
