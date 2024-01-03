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
					Hey <strong>{firstName}</strong>
				</Heading>
				<Text className="text-black text-[16px] leading-[24px]">
					This is just the beginning. You are now becoming a Reality Designer.
					We're an online community and space sharing resources on spirituality
					and self development in the modern age. We believe the future is both
					practical and assisted with technology.
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
					</Button>
				</Section>
				<Text className="text-black text-[16px] leading-[24px]">
					Stay tuned! Would love to have you active in the discord community.
					Introduce yourself!
				</Text>
			</Body>
		</Tailwind>
	</Html>
);
