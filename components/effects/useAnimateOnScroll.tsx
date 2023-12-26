"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

interface AnimateOnScrollOptions {
	duration?: number;
	opacity?: number;
	y?: number;
	ease?: gsap.EaseFunction;
	scrollTrigger?: {
		trigger: string;
		markers?: boolean;
	};
}

export const useAnimateOnScroll = (
	selector: string,
	options: AnimateOnScrollOptions = {},
	debug = false,
) => {
	useEffect(() => {
		const elements = document.querySelectorAll(selector);

		if (elements.length === 0) return;

		for (const element of elements) {
			((el, opts) => {
				const animation = gsap.from(el, {
					duration: opts.duration || 1.5,
					opacity: opts.opacity || 0,
					y: opts.y || 50,
					ease: opts.ease || "expo.out",
					scrollTrigger: {
						trigger: el,
						start: "top bottom-=100",
						end: "bottom top+=100",
						scrub: 1.5,
						...opts.scrollTrigger,
						markers: debug ? true : false,
					},
				});

				return () => animation.kill();
			})(element, options);
		}

		return () => {
			// biome-ignore lint/complexity/noForEach: <explanation>
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, [selector, options, debug]);
};
