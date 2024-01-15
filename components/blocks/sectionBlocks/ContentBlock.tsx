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
} from "@/components/blocks/types";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Spline from "@splinetool/react-spline";
import React from "react";

const templateStyles: Record<TemplateTheme, string> = {
	dark: " w-11/12 bg-black",
	light: "w-11/12 bg-gray-200",
	transparent: "w-11/12 bg-transparent",
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

	return (
		<div className={` h-auto w-screen min-h-screen ${styles} w-full relative`}>
			<Spline
				scene="https://prod.spline.design/3aeg01UBBMLQTJxZ/scene.splinecode"
				className="fixed top-0 w-screen max-h-screen z-[-10]"
			/>

			<PortableText
				value={content}
				components={templateComponents[theme] || templateComponents.light}
			/>
		</div>
	);
};

export default React.memo(ContentBlock);
