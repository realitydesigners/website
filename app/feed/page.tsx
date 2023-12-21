"use client";
import React, { useEffect, useState } from "react";
import { sanityFetch } from "@/sanity/lib/client";
import { feedQuery, postsQuery, getVideosQuery } from "@/sanity/lib/queries";
import { PostsPayload, VideoPayload, Image } from "@/types";
import PostItem from "@/components/feed/PostItem";
import VideoItem from "@/components/feed/VideoItem";
import ImageItem from "@/components/feed/ImageItem";

type FeedItem = PostsPayload | VideoPayload | Image;

export default function FeedPage() {
	const [items, setItems] = useState<FeedItem[]>([]);

	useEffect(() => {
		async function fetchData() {
			const feedItems: FeedItem[] = await sanityFetch({
				query: feedQuery,
				tags: ["post"],
			});
			console.log(feedItems);

			setItems(feedItems);
		}

		fetchData();
	}, []);

	return (
		<div className="w-full p-2 grid grid-cols-1 lg:grid-cols-3 gap-4">
			{items.map((feedItem, index) => {
				if (feedItem._type === "posts") {
					const block =
						feedItem.block && feedItem.block.length > 0
							? feedItem.block[0]
							: null;
					if (!block) return null;
					return (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={index}>
							<PostItem block={block} slug={feedItem.slug} />
						</div>
					);
				}
				if (feedItem._type === "video") {
					return (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={index}>
							<VideoItem videos={feedItem as VideoPayload} />
						</div>
					);
				}
				if (feedItem._type === "img") {
					return (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={index}>
							<ImageItem image={feedItem as Image} />
						</div>
					);
				}

				return null;
			})}
		</div>
	);
}
