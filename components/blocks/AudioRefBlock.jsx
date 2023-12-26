"use client";
import AudioPlayer from "./AudioPlayer.jsx";

const AudioRefWrapper = ({ value }) => {
	const { audioRefData } = value;

	if (!audioRefData) {
		return <p>Audio file not found.</p>;
	}

	const audioTitle = audioRefData?.audioTitle;
	const audioFileUrl = audioRefData?.audioFileUrl;

	return <AudioPlayer audioTitle={audioTitle} audioFileUrl={audioFileUrl} />;
};

export default AudioRefWrapper;
