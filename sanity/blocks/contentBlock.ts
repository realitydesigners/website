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
					preview: {
						select: {
							imageUrl: "image.image",
							title: "image.title",
							className: "className",
						},
						prepare(selection) {
							const { title, imageUrl, className } = selection;
							const subtitle = className
								? `Classname: ${className}`
								: "No class selected";

							return {
								title: title || "Untitled",
								subtitle,
								media: imageUrl,
							};
						},
					},

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
									{ title: "Image | Team Inset", value: "image-inset" },
								],
							},
						},
					],
				}),

				defineField({
					type: "object",
					name: "videoRef",
					title: "Video",
					preview: {
						select: {
							imageUrl: "video.image.asset.url",
							title: "video.title",
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
									{ title: "Card 1", value: "card-1" },
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
					preview: {
						select: {
							title: "quote.quote",
							imageUrl: "quote.mediaRef.image.image",
							className: "className",
						},
						prepare(selection) {
							const { title, imageUrl, className } = selection;
							const subtitle = className
								? `Classname: ${className}`
								: "No class";

							return {
								title: title || "Untitled",
								subtitle,
								media: imageUrl,
								className,
							};
						},
					},
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
									// Add more class options if needed
								],
							},
						},
					],
				}),

				defineField({
					type: "object",
					name: "audioRef",
					icon: PlayIcon,
					title: "Audio",
					preview: {
						select: {
							title: "audio.title",
						},
					},
					fields: [
						defineField({
							type: "reference",
							name: "audio",
							title: "Audio File",
							to: [{ type: "audio" }],
							// This references the 'audio' schema
						}),
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
					preview: {
						select: {
							media: "asset",
							title: "alt",
						},
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
									{
										title: "img-light",
										value: "img-light",
									},
									// Add more class options if needed
								],
							},
						},
					],
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
