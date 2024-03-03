import {
    Body,
    Button,
    Font,
    Head,
    Heading,
    Html,
    Img,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
    heading: string;
    subheading: string;
    image: any;
    slug: string;
}

export const NewPost: React.FC<Readonly<EmailTemplateProps>> = ({
    heading,
    subheading,
    image,
    slug,
}) => (
    <Html>
        <Head>
            <Font
                fontFamily="Space Grotesk"
                fallbackFontFamily="Verdana"
                webFont={{
                    url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
                    format: "woff2",
                }}
                fontWeight={400}
                fontStyle="normal"
            />
        </Head>
        <Tailwind>
            <Body className="mx-auto my-auto font-sans">
                <Section className="py-6 text-center">
                    <Heading className="text-[36px] font-bold capitalize text-black">
                        {heading}
                    </Heading>
                    <Heading className="mt-4 text-[16px] text-black">
                        {subheading}
                    </Heading>
                </Section>
                <Img src={image} width="300" height="300" />
                <Section className="py-6 text-center">
                    <Button
                        href={`https://www.reality-designers.com/posts/${slug}`}
                        className="bg-black p-4"
                    >
                        Read the Full Post
                    </Button>
                </Section>
                <Section className="py-6 text-center">
                    <Text className="text-[16px] leading-[24px] text-black">
                        Stay engaged with our latest content and updates. Follow
                        us on all platforms for more insights and discussions.
                    </Text>
                    <Button
                        href="https://www.youtube.com/@realitydesigners"
                        className="bg-black p-4 text-white"
                    >
                        YouTube
                    </Button>
                    <Button
                        href="https://www.instagram.com/realitydesignerstv/"
                        className="bg-black p-4 text-white"
                    >
                        Instagram
                    </Button>
                    <Button
                        href="https://www.twitter.com/realitydesignrs/"
                        className="bg-black p-4 text-white"
                    >
                        Twitter
                    </Button>
                </Section>
            </Body>
        </Tailwind>
    </Html>
);
