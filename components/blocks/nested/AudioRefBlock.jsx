"use client";
import React from "react";

const AudioPlayer = ({ audioTitle, audioFileUrl }) => {
	if (!audioFileUrl) {
		return <p>Audio file not found.</p>;
	}

	return (
		<div className="w-full py-6 flex justify-center">
			<div className="w-4/5 md:w-3/4 lg:w-1/2">
				<p className="mb-2 font-bold text-gray-200 p-2 hidden">{audioTitle}</p>
				{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
				<audio controls className="w-full" src={audioFileUrl}>
					Your browser does not support the audio element.
				</audio>
			</div>
		</div>
	);
};

const AudioRefBlock = ({ value }) => {
	const { audioRefData } = value;

	if (!audioRefData) {
		return <p>Audio file not found.</p>;
	}

	const audioTitle = audioRefData?.audioTitle;
	const audioFileUrl = audioRefData?.audioFileUrl;

	return <AudioPlayer audioTitle={audioTitle} audioFileUrl={audioFileUrl} />;
};

export default React.memo(AudioRefBlock);
