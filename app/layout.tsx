import "tailwindcss/tailwind.css";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { staatliches, jura } from "@/fonts";

export default async function Layout({
	children,
}: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en" className={`${jura.className} `}>
				<body>
					{children}
					<Analytics />
				</body>
			</html>
		</ClerkProvider>
	);
}
