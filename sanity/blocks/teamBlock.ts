import { defineField } from "sanity";

import teamType from "../schemas/team";

export default {
	type: "object",
	name: "teamBlock",
	title: "Team Block",
	fields: [
		defineField({
			name: "team",
			title: "Team",
			type: "reference",
			to: [{ type: teamType.name }],
		}),
	],
	preview: {
		select: {
			title: "team.name",
			subtitle: "team.role",
			media: "team.image",
		},
	},
};
