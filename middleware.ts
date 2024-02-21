import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/story",
		"/team",
		"/feed",
		"/videos",
		"/posts",
		"/glossary",
		"/studio",
		"/lab",
		"/api/send",
		"api/emailpost",
		"api/revalidate",
		"api/sanityWebhook",
		"/api/discord",
		"/library",
		"/library/:slug*",
		"/posts/:slug*",
		"/videos/:slug*",
		"/team/:slug*",
	],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
