"use client";
import {
	DarkTemplate,
	LightTemplate,
	TeamTemplate,
	TransparentTemplate,
	VideoTemplate,
} from "@/components/blocks/templates/Templates";
import {
	ContentBlockProps,
	LayoutTheme,
	TemplateTheme,
} from "@/components/blocks/Blocks";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import React from "react";

const templateStyles: Record<TemplateTheme, string> = {
	dark: "w-full bg-black/90 backdrop-blur-sm",
	light: "w-full bg-white/90 backdrop-blur-sm",
	transparent: "w-full bg-transparent",
};

const containerStyles: Record<TemplateTheme, string> = {
	dark: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white/90",
	light: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-black/90",
	transparent: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white/90",
};

const templateComponents: Record<LayoutTheme, PortableTextComponents> = {
	dark: DarkTemplate as PortableTextComponents,
	light: LightTemplate as PortableTextComponents,
	transparent: TransparentTemplate as PortableTextComponents,
	team: TeamTemplate as PortableTextComponents,
	video: VideoTemplate as PortableTextComponents,
};

const ContentBlock: React.FC<ContentBlockProps> = ({ block }) => {
	const { content, layout } = block;
	const theme = layout || "light";
	const styles = templateStyles[theme];
	const containerStyle = containerStyles[theme];

	return (
		<div className={`min-h-[50vh] w-full ${styles} relative transition-colors duration-300`}>
			<div className={containerStyle}>
				<div className="prose prose-lg max-w-none">
					<PortableText
						value={content}
						components={templateComponents[theme] || templateComponents.light}
					/>
				</div>
			</div>
		</div>
	);
};

export default React.memo(ContentBlock);
