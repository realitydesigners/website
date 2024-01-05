import { PortableText, PortableTextComponents } from "@portabletext/react";
import React from "react";

type ContentBlockProps = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	content: any;
	className: string;
	components: PortableTextComponents;
};

const ContentBlock: React.FC<ContentBlockProps> = ({
	content,
	className,
	components,
}) => {
	return (
		<div className={`h-auto ${className} w-full`}>
			<PortableText value={content} components={components} />
		</div>
	);
};

export default ContentBlock;
