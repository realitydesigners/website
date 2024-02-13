"use client";
import { useInteractiveContext } from "@/components/context/InteractiveContext";
import CustomCamera from "@/components/library/CustomCamera";
import MainCategories from "@/components/library/MainCategories";
import { MainStation } from "@/public/models/MainStation";
import SciFiStation from "@/public/models/SciFiStation";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const AllStations = ({ categories }) => {
	const { cameraState } = useInteractiveContext(); // Access camera state from context

	return (
		<Canvas style={{ height: "100vh", width: "100vw", color: "black" }}>
			<CustomCamera cameraState={cameraState} />
			<Environment preset="sunset" />
			<MainStation />
			<SciFiStation />
			<MainCategories category={categories} />
		</Canvas>
	);
};

export default AllStations;
