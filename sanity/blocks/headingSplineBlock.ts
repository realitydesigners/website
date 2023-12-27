import { defineField } from "sanity";
import categoryType from "../schemas/category";
import teamType from "../schemas/team";

export default {
	type: "object",
	name: "headingSplineBlock",
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
				],
			},
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
			type: "url",
			name: "url",
			title: "URL",
			validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
		}),

		defineField({
			type: "image",
			name: "image",
			title: "Image",
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: "alt",
					title: "Alt Text",
					type: "string",
				},
			],
		}),
		defineField({
			name: "team",
			title: "Team",
			type: "reference",
			to: [{ type: teamType.name }],
		}),
		defineField({
			name: "tags",
			title: "Tags",
			type: "array",
			of: [{ type: "string" }],
			options: {
				layout: "tags",
			},
		}),
		defineField({
			name: "category",
			title: "Category",
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
