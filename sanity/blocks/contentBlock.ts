import {
	BookIcon,
	ImageIcon,
	LinkIcon,
	PlayIcon,
	UserIcon,
} from "@sanity/icons";
import { defineField } from "sanity";

export default {
	type: "object",
	name: "contentBlock",
	title: "Content",
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
			name: "content",
			title: "Content",
			type: "array",
			of: [
				// Paragraphs
				{
					type: "block",
					lists: [
						{ title: "Bullet", value: "bullet" },
						{ title: "Numbered", value: "number" },
					],

					styles: [
						{ title: "Normal", value: "normal" },
						{ title: "Quote", value: "blockquote" },
						{ title: "H1", value: "h1" },
						{ title: "H2", value: "h2" },
						{ title: "H3", value: "h3" },
						{ title: "H4", value: "h4" },
						{ title: "H5", value: "h5" },
						{ title: "H6", value: "h6" },
					],
					marks: {
						annotations: [
							{
								name: "internalLink",
								type: "object",
								title: "Internal link",
								icon: UserIcon,
								fields: [
									{
										name: "reference",
										type: "reference",
										title: "Reference",
										to: [{ type: "posts" }],
									},
								],
							},
						],
					},
				},
				defineField({
					type: "object",
					name: "postsRef",
					title: "Post",
					preview: {
						select: {
							title: "posts.block.0.heading",
							excerpt: "posts.block.0.subheading",
							publicationDate: "posts.block.0.publicationDate",
							media: "posts.block.0.image",
						},
						prepare(selection) {
							const { title, excerpt, publicationDate, media } = selection;
							const formattedDate = publicationDate
								? new Date(publicationDate).toLocaleDateString()
								: "No date";

							const subtitle = `${
								excerpt ? excerpt : "No excerpt"
							} | ${formattedDate}`;
							return {
								title: title || "Untitled",
								subtitle: subtitle,
								media: media,
							};
						},
					},
					fields: [
						defineField({
							type: "reference",
							name: "posts",
							title: "Referenced Post",
							to: [{ type: "posts" }],
						}),
					],
				}),
				defineField({
					type: "object",
					name: "imageRef",
					title: "Image",
					fields: [
						defineField({
							type: "reference",
							icon: ImageIcon,
							name: "image",
							title: "Image Item",
							to: [{ type: "img" }],
						}),
						{
							name: "className",
							title: "CSS Class",
							type: "string",
							options: {
								list: [
									{ title: "Image | Team Name Below", value: "image-standard" },
									{
										title: "Image | Team Name Below",
										value: "image-standard-dark",
									},
									{ title: "Image | Team Inset", value: "image-inset" },
								],
							},
						},
					],
					preview: {
						select: {
							imageUrl: "image.image",
							title: "image.title",
							className: "className",
						},
						prepare(selection) {
							const { title, imageUrl, className } = selection;
							const classNameTitles = {
								"image-standard": "Image | Team Name Below",
								"image-inset": "Image | Team Inset",
							};
							const classNameTitle =
								classNameTitles[className] || "No class selected";

							return {
								title: title || "Untitled",
								subtitle: classNameTitle,
								media: imageUrl,
							};
						},
					},
				}),
				defineField({
					type: "object",
					name: "videoRef",
					title: "Video",
					preview: {
						select: {
							imageUrl: "video.image",
							title: "video.title",
							className: "className", // Select the className field
						},
						prepare(selection) {
							const { title, imageUrl, className } = selection;
							const classNameTitles = {
								"card-1": "Video | Dark ",
								"card-2": "Card 2",
								// Add other class mappings as needed
							};
							const classNameTitle =
								classNameTitles[className] || "No class selected";

							return {
								title: title || "Untitled",
								subtitle: classNameTitle, // Use the corresponding title as the subtitle
								media: imageUrl, // Assuming imageUrl is a direct URL to the image
							};
						},
					},
					fields: [
						defineField({
							type: "reference",
							icon: ImageIcon,
							name: "video",
							title: "Video Item",
							to: [{ type: "video" }],
						}),
						{
							name: "className",
							title: "CSS Class",
							type: "string",
							options: {
								list: [
									{ title: "Video | Dark ", value: "card-1" },
									{ title: "Card 2", value: "card-2" },
									// Add more class options if needed
								],
							},
						},
					],
				}),
				defineField({
					type: "object",
					name: "quoteRef",
					title: "Quote",
					icon: BookIcon,
					fields: [
						defineField({
							type: "reference",
							icon: ImageIcon,
							name: "quote",
							title: "Quote Item",
							to: [{ type: "quote" }],
						}),
						{
							name: "className",
							title: "CSS Class",
							type: "string",
							options: {
								list: [
									{ title: "Card 1", value: "card-1" },
									{ title: "Card 2", value: "card-2" },
								],
							},
						},
					],
					preview: {
						select: {
							title: "quote.quote",
							imageUrl: "quote.mediaRef.image.image",
							className: "className",
						},
						prepare(selection) {
							const { title, imageUrl, className } = selection;
							const classNameTitles = {
								"card-1": "Card 1",
								"card-2": "Card 2",
							};
							const classNameTitle =
								classNameTitles[className] || "No class selected";

							return {
								title: title || "Untitled",
								subtitle: classNameTitle,
								media: imageUrl,
							};
						},
					},
				}),

				defineField({
					type: "object",
					name: "audioRef",
					icon: PlayIcon,
					title: "Audio",
					preview: {
						select: {
							title: "audio.title",
							className: "className",
						},
						prepare(selection) {
							const { title, className } = selection;
							const classNameTitles = {
								"class-1": "Audio | Style 1",
								"class-2": "Audio | Style 2",
							};
							const classNameTitle =
								classNameTitles[className] || "No class selected";

							return {
								title: title || "Untitled",
								subtitle: classNameTitle,
							};
						},
					},
					fields: [
						defineField({
							type: "reference",
							name: "audio",
							title: "Audio File",
							to: [{ type: "audio" }],
						}),
						{
							name: "className",
							title: "CSS Class",
							type: "string",
							options: {
								list: [
									{ title: "Audio | Style 1", value: "class-1" },
									{ title: "Audio | Style 2", value: "class-2" },
								],
							},
						},
					],
				}),
				defineField({
					type: "image",
					icon: ImageIcon,
					name: "image",
					title: "Image",
					options: {
						hotspot: true,
					},

					fields: [
						defineField({
							name: "alt",
							type: "string",
							title: "Alt text",
							description:
								"Alternative text for screenreaders. Falls back on caption if not set",
						}),
						{
							name: "className",
							title: "CSS Class",
							type: "string",
							options: {
								list: [
									{ title: "img-dark", value: "img-dark" },
									{ title: "img-light", value: "img-light" },
								],
							},
						},
					],
					preview: {
						select: {
							media: "asset",
							title: "alt",
							className: "className",
						},
						prepare(selection) {
							const { title, media, className } = selection;
							const classNameTitles = {
								"img-dark": "img-dark",
								"img-light": "img-light",
							};
							const classNameTitle =
								classNameTitles[className] || "No class selected";

							return {
								title: title || "Untitled",
								subtitle: classNameTitle,
								media,
							};
						},
					},
				}),
				defineField({
					type: "object",
					icon: LinkIcon,
					name: "iframe",
					title: "iFrame",
					fields: [
						defineField({
							type: "url",
							name: "url",
							title: "URL",
							validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
						}),
						defineField({
							type: "string",
							name: "width",
							title: "Width",
						}),
						defineField({
							type: "string",
							name: "height",
							title: "Height",
						}),
					],
				}),
				defineField({
					type: "object",
					icon: LinkIcon,
					name: "spline",
					title: "Spline",
					fields: [
						defineField({
							type: "url",
							name: "url",
							title: "URL",
							validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
						}),
					],
				}),
			],
		},
	],

	preview: {
		select: {
			contentArray: "content",
			layout: "layout",
			media: "block.0.image",
		},
		prepare(selection) {
			const { contentArray, layout, media } = selection;

			const firstContentType =
				contentArray?.length > 0 ? contentArray[0]._type : "Unknown";
			let firstWords = "";
			if (firstContentType === "block") {
				const blockText = contentArray[0].children
					?.map((child) => child.text)
					.join(" ");
				firstWords = blockText
					? `${blockText.split(" ").slice(0, 10).join(" ")}...`
					: "No text content...";
			}

			const contentSummary = contentArray?.reduce((acc, curr) => {
				const type = curr._type;
				if (acc[type]) {
					acc[type] += 1;
				} else {
					acc[type] = 1;
				}
				return acc;
			}, {});

			const contentDiversity = Object.entries(contentSummary || {})
				.map(([type, count]) => `${count} ${type}`)
				.join(", ");

			return {
				title: firstWords || firstContentType,
				subtitle: `${
					Object.keys(contentArray || {}).length
				} items | ${contentDiversity} | Layout: ${layout}`,
				media: media,
			};
		},
	},
};
