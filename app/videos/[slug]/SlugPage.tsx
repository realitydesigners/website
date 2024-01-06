import Blocks from "@/components/blocks/Blocks";
import { BlockProps } from "@/components/blocks/types";
import { monomaniac } from "@/fonts";
import type { PostsPayload, VideoPayload } from "@/types";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader/rsc";

import { fileUrlFor } from "@/sanity/lib/utils";
import { useMemo } from "react";

export interface PageProps {
	data: VideoPayload | null;
	encodeDataAttribute?: EncodeDataAttributeCallback;
}

const SlugPage: React.FC<PageProps> = ({ data, encodeDataAttribute }) => {
	const { title, video, content } = data ?? {};

	const videoUrl = video ? fileUrlFor(video.asset._ref) : "";
	const blocks = useMemo(() => {
		return data?.block;
	}, [data]);

	if (!data || !data.block) {
		return <div>Loading...</div>;
	}

	return (
		<div className="bg-black h-auto  w-full flex lg:flex-cols flex-row flex-wrap items-start justify-center pt-24">
			<div className="w-full lg:w-1/6  h-24 lg:h-screen p-2 hidden lg:block " />
			<div className="w-full lg:w-4/6 h-auto flex flex-col justify-center  ">
				{videoUrl && (
					// biome-ignore lint/a11y/useMediaCaption: <explanation>
					<video
						controls
						autoPlay={true}
						className="w-full h-[50vw] lg:h-[33vw] border-gray-600 border rounded-lg overflow-hidden"
					>
						<source src={videoUrl} type="video/mp4" />
						Your browser does not support this video player
					</video>
				)}
				<p
					className={`${monomaniac.className}  uppercase text-4xl my-4 tracking-wide pt-4 text-gray-200 font-bold`}
				>
					{title}
				</p>
				{blocks?.map((block) => (
					<Blocks block={block as BlockProps} />
				))}
			</div>

			<div className="w-full lg:w-1/6 h-screen  p-2" />
		</div>
	);
};

export default SlugPage;
