import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import React from "react";

type ContentBlockProps = {
	content: PortableTextBlock[];
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
