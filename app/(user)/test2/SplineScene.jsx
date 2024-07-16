import Spline from "@splinetool/react-spline";
import React from "react";

const SplineScene = ({ onSplineMouseDown, onLoad }) => {
	return (
		<main className="w-screen h-screen">
			<Spline
				scene="https://prod.spline.design/5WKJ-IPI7t2kj2c2/scene.splinecode" // Replace with your actual scene URL
				
				onLoad={onLoad}
			/>
		</main>
	);
};

export default SplineScene;
