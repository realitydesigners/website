import {
	Body,
	Button,
	Column,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
	firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	firstName,
}) => (
	<Html>
		<Head />
		<Tailwind>
			<Body className="my-auto mx-auto font-sans">
				<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
					Welcome <strong>{firstName}</strong>
				</Heading>
				<Text className="text-black text-[16px] leading-[24px]">
					This is just the beginning. You are now becoming a Reality Designer.
					Do you feel it?
				</Text>
				<Section>
					<Button
						href="https://www.youtube.com/@realitydesigners"
						style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
					>
						YouTube
					</Button>
					<Button
						href="https://www.instagram.com/realitydesignerstv/"
						style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
					>
						Instagram
					</Button>
					<Button
						href="https://www.twitter.com/realitydesignrs/"
						style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
					>
						Twitter
					</Button>{" "}
					<Button
						href="https://www.tiktok.com/@realitydesigners"
						style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
					>
						TikTok
					</Button>
				</Section>
				<Text className="text-black text-[16px] leading-[24px]">
					We are so excited to have you here. We have a very important mission.
					Please stay up to date with what we are doing, and engage whenever you
					feel called.
				</Text>
			</Body>
		</Tailwind>
	</Html>
);
