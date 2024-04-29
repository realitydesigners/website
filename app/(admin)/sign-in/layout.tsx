import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
import "tailwindcss/tailwind.css";

export default async function SignInLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			<div className="flex h-screen min-h-screen flex-col items-center justify-center ">
				{children}
			</div>
			<Footer />
		</>
	);
}
