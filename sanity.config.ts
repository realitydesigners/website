import { theme } from "https://themer.sanity.build/api/hues?default=darkest:000000&primary=59595f;600;lightest:e3e3e3&transparent=7d838c";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import {
	contentBlock,
	headingBlock,
	headingSplineBlock,
	imageCanvasBlock,
	teamBlock,
} from "@/sanity/blocks/index";
import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import {
	audio,
	category,
	img,
	library,
	model,
	posts,
	quote,
	team,
	video,
} from "@/sanity/schemas";

import CustomItem from "@/sanity/ui/CustomItem";
import { contentGraphView } from "sanity-plugin-graph-view";
import { media } from "sanity-plugin-media";
import CustomField from "./sanity/ui/CustomField";

import { vercelDeployTool } from "sanity-plugin-vercel-deploy";

const title =
	process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "Reality Designers";

export default defineConfig({
	basePath: studioUrl,
	projectId: projectId || "",
	dataset: dataset || "",
	title,
	theme,
	schema: {
		types: [
			posts,
			img,
			audio,
			video,
			quote,
			team,
			category,
			library,
			model,
			headingBlock,
			headingSplineBlock,
			contentBlock,
			teamBlock,
			imageCanvasBlock,
		],
	},
	form: {
		components: {
			item: CustomItem,
			field: CustomField,
		},
	},
	plugins: [
		deskTool({}),

		visionTool({ defaultApiVersion: apiVersion }),

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		media() as any,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		vercelDeployTool() as any,
	],
});
