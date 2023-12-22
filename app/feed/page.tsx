"use client";
import React, { useEffect, useState, useRef } from "react";
import { sanityFetch } from "@/sanity/lib/client";
import { feedQuery } from "@/sanity/lib/queries";
import { PostsPayload, VideoPayload, Image } from "@/types";
import PostItem from "@/components/feed/PostItem";
import VideoItem from "@/components/feed/VideoItem";
import ImageItem from "@/components/feed/ImageItem";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger only once
gsap.registerPlugin(ScrollTrigger);

type FeedItem = PostsPayload | VideoPayload | Image;

const animateFeedItems = () => {
	const targets = document.querySelectorAll(".feed-item");
	for (const item of targets) {
		gsap.from(item, {
			duration: 1.5, // Duration of the animation
			opacity: 0, // Start with an opacity of 0
			y: 50, // Start 50 pixels down from the final position
			ease: "expo.out", // Use a more dramatic easing for smoother effect
			scrollTrigger: {
				trigger: item,
				start: "top bottom-=100", // Start the animation sooner
				end: "bottom top+=100", // End the animation later
				scrub: 1.5, // Increase the scrub duration for smoother effect
				// markers: true,          // Uncomment to see markers for debugging
			},
		});
	}
};

export default function FeedPage() {
	const [items, setItems] = useState<FeedItem[]>([]);
	const containerRef = useRef<HTMLDivElement | null>(null);

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

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const timeoutId = setTimeout(animateFeedItems, 500); // Set a timeout to ensure elements are rendered
		return () => clearTimeout(timeoutId); // Clear the timeout if the component unmounts
	}, [items]);

	return (
		<div
			ref={containerRef}
			className="w-full min-h-screen pt-16 p-2 grid grid-cols-1 lg:grid-cols-3 gap-4"
		>
			{items.map((feedItem, index) => {
				const key = feedItem._id || index;
				return (
					<div key={key} className="feed-item">
						{feedItem._type === "posts" && feedItem.block?.[0] && (
							<PostItem block={feedItem.block[0]} slug={feedItem.slug} />
						)}
						{feedItem._type === "video" && (
							<VideoItem videos={feedItem as VideoPayload} />
						)}
						{feedItem._type === "img" && (
							<ImageItem image={feedItem as Image} />
						)}
					</div>
				);
			})}
		</div>
	);
}
