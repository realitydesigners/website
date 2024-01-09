"use client";
import Newsletter from "@/app/api/email/Newsletter";
import { monomaniac } from "@/fonts";
import Link from "next/link";

export default function Footer() {
	return (
		<div className="w-full grid lg:grid-cols-3 grid-cols-1 flex-wrap items-start bg-black gap-4 p-4 lg:p-6">
			<div className="w-full p-4  border-gray-600/50 border rounded-lg  ">
				<div className="w-full h-full flex flex-col justify-center items-center p-4">
					<p
						className={`${monomaniac.className} text-5xl bold text-center leading-10 text-gray-200 uppercase`}
					>
						Design
						<br />
						Your
						<br /> Reality
					</p>
				</div>
			</div>
			<Newsletter />
			<div className="w-full  border-gray-600/50 border rounded-lg p-4 ">
				<ul className={`${monomaniac.className} w-1/2 text-gray-200 text-2xl`}>
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
