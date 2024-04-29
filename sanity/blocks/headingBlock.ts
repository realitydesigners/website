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
			title: "Image",
			type: "reference",
			to: [{ type: imgType.name }],
		}),
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
		}),
		defineField({
			name: "subheading",
			title: "Subheading",
			type: "text",
		}),
		defineField({
			name: "publicationDate",
			title: "Date",
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
			title: "Category",
			type: "reference",
			to: [{ type: categoryType.name }],
		}),
	],
	preview: {
		select: {
			title: "heading",
			subtitle: "subheading",
			media: "imageRef.image",
		},
	},
};
