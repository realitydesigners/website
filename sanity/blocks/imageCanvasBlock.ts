import { defineField } from "sanity";
import teamType from "../schemas/team";

export default {
	type: "object",
	name: "imageCanvasBlock",
	title: "Image Canvas",
	fields: [
		defineField({
			name: "layout",
			title: "Layout",
			type: "string",
			options: {
				list: [
					{ title: "Dark", value: "dark" },
					{ title: "Light", value: "light" },
				],
			},
		}),

		defineField({
			name: "image",
			title: "Image",
			type: "reference",
			to: [{ type: "img" }],
		}),
		defineField({
			name: "team",
			title: "Team",
			type: "reference",
			to: [{ type: teamType.name }],
		}),
	],
	preview: {
		select: {
			title: "layout",
			media: "block.0.img.image",
		},
		prepare(selection) {
			const { title, media } = selection;

			return {
				title: title || "No Title",
				media: media, // This uses the selected image for the preview
			};
		},
	},
};
