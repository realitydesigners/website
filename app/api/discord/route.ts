// app/api/discord.ts
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const postData = await request.json();

		// Check if block array exists and has at least one item
		const heading =
			postData.block && postData.block.length > 0
				? postData.block[0].heading
				: "No Heading";
		const slug = postData.slug.current; // Assuming slug is an object with a 'current' property

		// Other fields like title, excerpt, etc.
		const title = postData.title;
		const excerpt = postData.excerpt;

		// Construct the message to post on Discord
		const messageContent = `New blog post: ${title}\nHeading: ${heading}\nExcerpt: ${excerpt}\nLink: https://www.realitydesigners.tv/posts/${slug}`;

		const discordWebhookUrl =
			"https://discord.com/api/webhooks/1188395854185386016/jln9i7US53mkJWEgWzu_v0LxiYYodBsgZHY8fbx5-GJ3ka6NWRAHsZXtE-Okz_HRfagb";

		const discordResponse = await fetch(discordWebhookUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content: messageContent }),
		});

		if (!discordResponse.ok) {
			throw new Error(
				`Error posting to Discord: ${discordResponse.statusText}`,
			);
		}

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
