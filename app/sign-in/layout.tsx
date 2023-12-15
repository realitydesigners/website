import "tailwindcss/tailwind.css";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";

export default async function SignInLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<Navbar pageBackground="light" />
			<div className="flex justify-center items-center h-screen min-h-screen flex-col bg-gray-200">
				{children}
			</div>
			<Footer />
		</>
	);
}
