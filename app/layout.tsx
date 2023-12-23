import "tailwindcss/tailwind.css";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { staatliches, cairo } from "@/fonts";

export default async function Layout({
	children,
}: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en" className={`${cairo.className} `}>
				<body>
					{children}
					<Analytics />
				</body>
			</html>
		</ClerkProvider>
	);
}
