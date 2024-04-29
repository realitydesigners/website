import { defineField } from "sanity";
import categoryType from "../schemas/category";
import imgType from "../schemas/img";
import teamType from "../schemas/team";

export default {
	type: "object",
	name: "headingBlock",
	title: "Heading",
	fields: [
		defineField({
			name: "layout",
			title: "Layout",
			type: "string",
			options: {
				list: [
					{ title: "Dark", value: "dark" },
					{ title: "Light", value: "light" },
					{ title: "Transparent", value: "transparent" },
				],
			},
		}),
		defineField({
			name: "imageRef",
			title: "ImageRef",
			type: "reference",
			to: [{ type: imgType.name }],
		}),

		{
			name: "heading",
			title: "Heading",
			type: "string",
		},
		{
			name: "subheading",
			title: "Subheading",
			type: "text",
		},
		defineField({
			name: "publicationDate",
			title: "Publication Date",
			type: "date",
			options: {
				dateFormat: "DD-MM-YYYY",
			},
		}),

		defineField({
			name: "team",
			title: "Team",
			type: "reference",
			to: [{ type: teamType.name }],
		}),

		defineField({
			name: "category",
			title: "Meta Category",
			type: "reference",
			to: [{ type: categoryType.name }],
		}),
	],
	preview: {
		select: {
			title: "heading",
			subtitle: "subheading",
			media: "image",
		},
	},
};
