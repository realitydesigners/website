import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/story",
		"/team",
		"/feed",
		"/videos",
		"/posts",
		"/api/send",
		"api/emailpost",
		"api/revalidate",
		"api/sanityWebhook",
		"/api/discord",
		"/posts/:slug*",
		"/videos/:slug*",
		"/team/:slug*",
	],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
