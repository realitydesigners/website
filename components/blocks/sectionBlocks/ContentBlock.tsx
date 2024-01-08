"use client";
import {
	DarkTemplate,
	LightTemplate,
	TeamTemplate,
	VideoTemplate,
} from "@/components/blocks/templates/Templates";
import {
	ContentBlockProps,
	LayoutTheme,
	TemplateTheme,
} from "@/components/blocks/types";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import React from "react";

const templateStyles: Record<TemplateTheme, string> = {
	dark: " w-11/12 bg-black",
	light: "w-11/12 bg-gray-200",
};

const templateComponents: Record<LayoutTheme, PortableTextComponents> = {
	dark: DarkTemplate as PortableTextComponents,
	light: LightTemplate as PortableTextComponents,
	team: TeamTemplate as PortableTextComponents,
	video: VideoTemplate as PortableTextComponents,
};

const ContentBlock: React.FC<ContentBlockProps> = ({ block }) => {
	const { content, layout } = block;
	const theme = layout || "light";
	const styles = templateStyles[theme];

	return (
		<div className={`h-auto ${styles} w-full`}>
			<PortableText
				value={content}
				components={templateComponents[theme] || templateComponents.light}
			/>
		</div>
	);
};

export default React.memo(ContentBlock);
