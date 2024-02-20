import {
	Body,
	Button,
	Head,
	Heading,
	Html,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
	heading: string;
	subheading: string;
	slug: string;
}

export const NewPost: React.FC<Readonly<EmailTemplateProps>> = ({
	heading,
	subheading,
	slug,
}) => (
	<Html>
		<Head />
		<Tailwind>
			<Body className="my-auto mx-auto font-sans">
				<Section className="text-center py-6">
					<Heading className="text-black text-[24px] font-bold">
						{heading}
					</Heading>
					<Text className="text-black text-[16px] mt-4">{subheading}</Text>
				</Section>
				<Section className="text-center py-6">
					<Button
						href={`https://www.reality-designers.com/posts/${slug}`}
						style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
					>
						Read the Full Post
					</Button>
				</Section>
				<Section className="text-center py-6">
					<Text className="text-black text-[16px] leading-[24px]">
						Stay engaged with our latest content and updates. Follow us on
						Instagram for more insights and discussions.
					</Text>
					<Button
						href="https://www.instagram.com/realitydesignerstv/"
						style={{
							background: "#000",
							color: "#fff",
							padding: "12px 20px",
							marginTop: "20px",
						}}
					>
						Follow on Instagram
					</Button>
				</Section>
			</Body>
		</Tailwind>
	</Html>
);
