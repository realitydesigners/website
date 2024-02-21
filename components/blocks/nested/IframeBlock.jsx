import React from "react";
const iFrame = ({ value }) => {
	const { url, width, height } = value;

	return (
		<div className="iframe-container">
			<iframe
				title="iframe"
				src={url}
				width={width}
				height={height}
				allowFullScreen
			/>
		</div>
	);
};

export default React.memo(iFrame);
