import type { NextRequest } from "next/server";

// Send a post, with the heading and slug, to Discord
export async function POST(request: NextRequest) {
	if (request.headers.get("content-type") !== "application/json") {
		return new Response(null, { status: 400 });
	}

	const postData = await request.json();
	if (postData._type !== "posts") {
		return new Response(null, { status: 400 });
	}

	const heading = postData.heading || "No Heading";
	const slug = postData.slug || "no-slug";
	const messageContent = `**New Post**: *${heading}*\n[Read More](https://www.realitydesigners.tv/posts/${slug})`;

	const discordWebhookUrl =
		"https://discord.com/api/webhooks/1208644941673136138/S8e6byIDZg7ub-3W4d76gi8TLOChC38KfQzOZhuLxOVuRitMEJRheELqeg7AODLvVE93";

	await fetch(discordWebhookUrl, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ content: messageContent }),
	});

	return new Response(
		JSON.stringify({ success: true, message: "Post sent to Discord" }),
		{
			status: 200,
			headers: { "Content-Type": "application/json" },
		},
	);
}
