import BottomNavbar from "@/components/global/BottomNavbar";
import "tailwindcss/tailwind.css";

export default async function LibraryLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="w-screen h-screen bg-black">
			{children}
			<BottomNavbar />
		</div>
	);
}
