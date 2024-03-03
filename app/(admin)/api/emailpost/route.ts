import { NewPost } from "@/app/(admin)/api/email/new-post";
import * as React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
	if (request.headers.get("content-type") !== "application/json") {
		return new Response(null, { status: 400 });
	}

	const postData = await request.json();
	const heading = postData.heading || "New Blog Post";
	const subheading = postData.subheading || "No Subheading";
	const slug = postData.slug || "no-slug";

	const emailContent = NewPost({
		heading,
		slug,
		subheading,
	});

	await resend.emails.send({
		from: "Reality Designers <hey@reality-designers.com>",
		to: "raymond.luke.spartz@gmail.com",
		subject: `New Blog Post: ${heading}`,
		react: emailContent as React.ReactElement,
		headers: {
			"X-Entity-Ref-ID": "Sh7Vh29H87sad",
		},
	});
}
