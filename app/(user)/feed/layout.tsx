import Navbar from "@/components/navigation/Navbar";
import "tailwindcss/tailwind.css";

export default async function PostsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="w-screen min-h-screen black">
			<Navbar />
			{children}
		</div>
	);
}
