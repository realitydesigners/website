import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	try {
		if (request.headers.get("content-type") !== "application/json") {
			throw new Error("Invalid Content-Type. Expected application/json");
		}

		const postData = await request.json();
		const heading = postData.heading || "No Heading";
		const slug = postData.slug || "no-slug";

		const messageContent = `**New Blog Post**: *${heading}*\n[Read More](https://www.realitydesigners.tv/posts/${slug})`;

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

		return new Response(
			JSON.stringify({ success: true, message: "Post sent to Discord" }),
			{
				status: 200,
				headers: { "Content-Type": "application/json" },
			},
		);
	} catch (error) {
		console.error("Discord POST Error:", error);
		return new Response(
			JSON.stringify({ success: false, error: error.message }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
}
