"use client";
import React, { useEffect, useState } from "react";
import { sanityFetch } from "@/sanity/lib/client";
import { feedQuery, postsQuery, getVideosQuery } from "@/sanity/lib/queries";
import { PostsPayload, VideoPayload } from "@/types";
import PostItem from "@/components/feed/PostItem";
import VideoItem from "@/components/feed/VideoItem";

type FeedItem = PostsPayload | VideoPayload;

export default function FeedPage() {
	const [items, setItems] = useState<FeedItem[]>([]);

	useEffect(() => {
		async function fetchData() {
			const feedItems: FeedItem[] = await sanityFetch({
				query: feedQuery,
				tags: ["post"],
			});

			setItems(feedItems);
		}

		fetchData();
	}, []);

	return (
		<div className="w-full p-2">
			{items.map((feedItem, index) => {
				const block =
					feedItem.block && feedItem.block.length > 0
						? feedItem.block[0]
						: null;

				if (!block) {
					return null;
				}

				if (feedItem._type === "posts") {
					return (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={index}>
							<PostItem
								key={feedItem.slug?.current}
								block={block}
								slug={feedItem.slug}
							/>
						</div>
					);
				}
				if (feedItem._type === "video") {
					return (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={index}>
							<VideoItem
								key={feedItem.slug?.current}
								videos={feedItem as VideoPayload}
							/>
						</div>
					);
				}

				return null;
			})}
		</div>
	);
}
