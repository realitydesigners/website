"use client";
import TeamBlock from "@/components/blockstyles/TeamBlock";
import { PortableText } from "@portabletext/react";
import PropTypes from "prop-types";
import {
	DarkTemplate,
	LightTemplate,
	TeamTemplate,
	VideoTemplate,
} from "../blocks/Templates";
import HeadingBlock from "../blockstyles/HeadingBlock";
import HeadingSplineBlock from "../blockstyles/HeadingSplineBlock";
import ImageCanvasBlock from "../blockstyles/ImageCanvasBlock";

const Blocks = ({ block }) => {
	const { _type, layout } = block;

	console.log(block);
	let template;
	let classes;
	switch (layout) {
		case "dark":
			template = DarkTemplate;
			classes = "bg-black w-full";
			break;
		case "light":
			template = LightTemplate;
			classes = "bg-gray-200 w-full";
			break;
		case "team":
			template = TeamTemplate;
			classes = "bg-black w-full";
			break;
		case "video":
			template = VideoTemplate;
			classes = "bg-black w-full";
			break;
		default:
			template = LightTemplate;
	}

	const renderBlock = () => {
		switch (_type) {
			case "headingBlock":
				return (
					<div>
						<HeadingBlock block={{ ...block, className: layout }} />
					</div>
				);
			case "headingSplineBlock":
				return (
					<div>
						<HeadingSplineBlock block={{ ...block, className: layout }} />
					</div>
				);
			case "contentBlock":
				return (
					<div className={`h-auto ${classes}`}>
						<PortableText value={block.content} components={template} />
					</div>
				);
			case "teamBlock":
				return (
					<div>
						<TeamBlock block={block} />
					</div>
				);
			case "imageCanvasBlock":
				return (
					<div>
						<ImageCanvasBlock block={{ ...block, className: layout }} />
					</div>
				);
			default:
				return null;
		}
	};

	return <>{renderBlock()}</>;
};

Blocks.propTypes = {
	block: PropTypes.object.isRequired,
};

export default Blocks;
