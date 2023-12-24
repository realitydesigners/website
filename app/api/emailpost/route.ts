import { NewPost } from "@/components/email/new-post";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
	try {
		// Check if the incoming request has the expected "application/json" content type
		if (request.headers.get("content-type") !== "application/json") {
			throw new Error("Invalid Content-Type. Expected application/json");
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

		const recipients = ["raymond.luke.spartz@gmail.com"]; // Replace with subscriber list

		// Send the email with email-specific headers
		const { data, error } = await resend.emails.send({
			from: "Reality Designers <info@realitydesigners.tv>",
			to: recipients,
			subject: `New Blog Post: ${heading}`,
			react: emailContent as React.ReactElement,
			headers: {
				"X-Entity-Ref-ID": "Sh7Vh29H87sad",
			},
		});

		if (error) {
			return Response.json({ error });
		}

		return Response.json({ data });
	} catch (error) {
		return Response.json({ error });
	}
}
