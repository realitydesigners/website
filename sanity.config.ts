import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { presentationTool } from "sanity/presentation";

import { media } from "sanity-plugin-media";
import { contentGraphView } from "sanity-plugin-graph-view";
import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { locate } from "@/sanity/plugins/locate";
import CustomField from "./sanity/ui/CustomField";
import CustomItem from "@/sanity/ui/CustomItem";
import {
	posts,
	team,
	category,
	img,
	quote,
	video,
	audio,
	model,
	library,
	headingBlock,
	contentBlock,
	teamBlock,
} from "@/sanity/schemas";

import { vercelDeployTool } from "sanity-plugin-vercel-deploy";

import { theme } from "https://themer.sanity.build/api/hues?default=darkest:000000&primary=59595f;600;lightest:e3e3e3&transparent=7d838c";

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
			headingBlock,
			contentBlock,
			teamBlock,
			model,
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
		presentationTool({
			locate,
			previewUrl: {
				origin:
					typeof location === "undefined"
						? "http://localhost:3000"
						: location.origin,
				draftMode: {
					enable: "/api/draft",
				},
			},
		}),
		visionTool({ defaultApiVersion: apiVersion }),

		media(),
		vercelDeployTool(),
	],
});
