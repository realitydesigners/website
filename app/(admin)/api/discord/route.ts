import type { NextRequest } from "next/server";

type DiscordData = {
  _id: string;
  _type: "posts" | "video";
  title: string;
  slug: string;
  heading?: string;
  excerpt?: string;
  imageUrl?: string;
  videoUrl?: string;
};

type DiscordEmbed = {
  title: string;
  color: number;
  image?: { url: string };
  url?: string;
  description?: string;
};

// Send a post or video, with the heading and slug, to Discord
export async function POST(request: NextRequest) {
  if (request.headers.get("content-type") !== "application/json") {
    return new Response(null, { status: 400 });
  }

  const postData: DiscordData = await request.json();

  if (!["posts", "video"].includes(postData._type)) {
    return new Response(null, { status: 400 });
  }

  const heading = postData.heading || postData.title || "No Heading";
  const slug = postData.slug || "no-slug";
  const imageUrl = postData.imageUrl;

  // Create Discord embed object with proper typing
  const embed: DiscordEmbed = {
    title: heading,
    color: 0x0099ff, // Blue color
    image: imageUrl ? { url: imageUrl } : undefined,
  };

  let messageContent = "";
  switch (postData._type) {
    case "posts":
      messageContent = `@everyone **New Post**: ${heading}`;
      embed.url = `https://www.reality-designers.com/posts/${slug}`;
      break;
    case "video": {
      const videoUrl =
        postData.videoUrl || "https://www.youtube.com/@realitydesigners";
      messageContent = `@everyone **New Video**: ${heading}`;
      embed.url = `https://www.reality-designers.com/videos/${slug}`;
      embed.description = `[Watch on YouTube](${videoUrl})`;
      break;
    }
    default:
      return new Response(null, { status: 400 });
  }

  const discordWebhookUrl =
    "https://discord.com/api/webhooks/1208644941673136138/S8e6byIDZg7ub-3W4d76gi8TLOChC38KfQzOZhuLxOVuRitMEJRheELqeg7AODLvVE93";

  // Send message with embed
  await fetch(discordWebhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: messageContent,
      embeds: [embed],
    }),
  });

  return new Response(
    JSON.stringify({ success: true, message: "Notification sent to Discord" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
