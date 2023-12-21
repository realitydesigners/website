"use client";
import React, { useEffect, useState } from "react";
import { PostsList } from "@/components/global/PostsList";
import { sanityFetch } from "@/sanity/lib/client";
import { postsQuery, getVideosQuery } from "@/sanity/lib/queries";
import { PostsPayload, VideoPayload } from "@/types";
import PostItem from "@/components/feed/PostItem";
import VideoItem from "@/components/feed/VideoItem";

type FeedItem = PostsPayload | VideoPayload; // Adjust based on actual structure

export default function FeedPage() {
	const [items, setItems] = useState<FeedItem[]>([]);

	useEffect(() => {
		async function fetchData() {
			const posts: PostsPayload[] = await sanityFetch({
				query: postsQuery,
				tags: ["post"],
			});
			console.log("posts", posts);
			const videos: VideoPayload[] = await sanityFetch({
				query: getVideosQuery,
				tags: ["video"],
			});

			const combinedItems: FeedItem[] = [...posts, ...videos].sort(
				(a, b) =>
					new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime(),
			);

			setItems(combinedItems);
		}

		fetchData();
	}, []);

	return (
		<div>
			{items.map((post) => {
				const block =
					post.block && post.block.length > 0 ? post.block[0] : null;
				if (!block) {
					return null;
				}
				return (
					<PostItem key={post.slug?.current} block={block} slug={post.slug} />
				);
			})}
		</div>
	);
}
