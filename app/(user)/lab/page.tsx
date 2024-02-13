"use client";
import { monomaniac, play } from "@/fonts";
import Spline from "@splinetool/react-spline";

export default function LabPage() {
	return (
		<div className="flex flex-col flex-wrap items-center w-screen h-auto justify-center bg-black">
			<div className="w-full block h-screen  overflow-hidden">
				<Spline scene="https://prod.spline.design/iKmFxJxXHvp6KcMb/scene.splinecode" />
			</div>

			<div className="lg:w-1/2 w-11/12 pt-32 pb-20">
				<div className={`${play.className} text-xl font-bold text-gray-400 `}>
					<h1
						className={`${monomaniac.className} text-gray-200 text-6xl lg:text-7xl font-bold text-center mb-6`}
					>
						Your Everything Design Partner
					</h1>

					<p className="mb-6 ">
						We do everything, that's why we're Reality Designers
					</p>
				</div>
			</div>
		</div>
	);
}
