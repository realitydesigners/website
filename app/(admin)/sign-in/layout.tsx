import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
import "tailwindcss/tailwind.css";

export default async function SignInLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
			<div className="flex justify-center items-center h-screen min-h-screen flex-col bg-gray-200">
				{children}
			</div>
			<Footer />
		</>
	);
}
