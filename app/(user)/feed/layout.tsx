import Navbar from "@/components/navigation/Navbar";
import "tailwindcss/tailwind.css";

export default async function PostsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="black min-h-screen w-screen">
			<Navbar />
			{children}
		</div>
	);
}
