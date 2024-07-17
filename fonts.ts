import { Play, Roboto, Space_Grotesk, Russo_One } from "next/font/google";

export const roboto = Roboto({
	weight: ["400", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
});
export const play = Play({
	weight: ["400", "700"],
	subsets: ["latin"],
	display: "swap",
});
export const space = Space_Grotesk({
	weight: ["400", "600", "700", "500"],
	style: ["normal"],
	subsets: ["latin"],
	display: "swap",
});
export const russo = Russo_One({
	weight: ["400"],
	subsets: ["latin"],
	display: "swap",
});
