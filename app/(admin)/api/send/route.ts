import { EmailTemplate } from "@/app/(admin)/api/email/email-template";

import * as React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
	try {
		const { email, name } = await request.json();

		const { data, error } = await resend.emails.send({
			from: "Reality Designers <hey@reality-designers.com>",
			to: [email],
			subject: "Hey Reality Designer!",
			react: EmailTemplate({ firstName: name }) as React.ReactElement,
		});

		if (error) {
			return Response.json({ error });
		}

		return Response.json({ data });
	} catch (error) {
		return Response.json({ error });
	}
}
