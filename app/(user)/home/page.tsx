"use client";
import { useSceneConfig } from "../home/config";
import Spline from "@splinetool/react-spline";
import { NavigationDots } from "../home/components/NavigationDots";
import { useNavigation } from "@/components/providers/NavigationProvider";

export default function HomeClient() {
  const {
    setSplineInstance,
    visibilityStates,
    currentSection,
    handleButtonClick,
    splineRef,
  } = useNavigation();

  const finalSceneObjects = useSceneConfig(splineRef, visibilityStates);

  const url = "https://prod.spline.design/NuDwxTLapGXyOHT1/scene.splinecode";

  return (
    <main className="fixed inset-0 flex h-screen w-screen overflow-hidden">
      <div className="relative z-[1000] w-full h-full">
        <Spline
          scene={url}
          onLoad={(spline) => {
            setSplineInstance(spline);
          }}
        />
      </div>

      <NavigationDots
        currentSection={currentSection}
        onButtonClick={handleButtonClick}
      />

      {finalSceneObjects.map((obj) => (
        <div key={obj.id}>{obj.component}</div>
      ))}
    </main>
  );
}
