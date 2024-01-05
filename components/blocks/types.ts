import type { PortableTextBlock } from "@portabletext/types";

export type LayoutTheme = "dark" | "light" | "team" | "video";

export type TemplateTheme = "dark" | "light";

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
}
