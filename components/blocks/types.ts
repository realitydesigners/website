import type { PortableTextBlock } from "@portabletext/types";

export type BlockType =
	| "headingBlock"
	| "headingSplineBlock"
	| "contentBlock"
	| "teamBlock"
	| "imageCanvasBlock";

export interface BlockProps {
	_type: BlockType;
	layout?: LayoutTheme;
	content?: PortableTextBlock[];
	className?: string;
}

export interface ContentBlockProps {
	block: {
		content: PortableTextBlock[];
		className?: string;
		layout?: LayoutTheme;
	};
	layout?: string | undefined;
	theme?: string | undefined;
}

export type LayoutTheme = "dark" | "light" | "team" | "video";
export type TemplateTheme = "dark" | "light";
export interface ThemeProps {
	textColor?: string;
	isInset?: boolean;
	containerBg?: string;
	tagBg?: string;
	tagText?: string;
	backgroundColor?: string;
	topBackgroundColor?: string;
	buttonTextColor?: string;
	buttonBackgroundColor?: string;
	containerBorder?: string;
}
