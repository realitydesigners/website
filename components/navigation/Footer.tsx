"use client";
import Newsletter from "@/app/(admin)/api/email/Newsletter";
import { monomaniac } from "@/fonts";
import Link from "next/link";

export default function Footer() {
	return (
		<div className="grid w-full grid-cols-1 flex-wrap items-start gap-4 bg-black p-4 lg:grid-cols-3 lg:p-6">
			<div className="w-full rounded-lg  border border-gray-600/50 p-4  ">
				<div className="flex h-full w-full flex-col items-center justify-center p-4">
					<p
						className={`${monomaniac.className} bold text-center text-5xl uppercase leading-10 text-gray-200`}
					>
						Design
						<br />
						Your
						<br /> Reality
					</p>
				</div>
			</div>
			<Newsletter />
			<div className="w-full  rounded-lg border border-gray-600/50 p-4 ">
				<ul className={`${monomaniac.className} w-1/2 text-2xl text-gray-200`}>
					<li>
						<Link href="https://www.youtube.com/@realitydesigners">
							YouTube
						</Link>
					</li>
					<li>
						<Link href="https://www.instagram.com/realitydesignerstv/">
							Instagram
						</Link>
					</li>
					<li>
						<Link href="https://www.twitter.com/realitydesignrs/">Twitter</Link>
					</li>
					<li>
						<Link href="https://www.tiktok.com/@realitydesigners">TikTok</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
