"use client";
import { useMemo } from "react";
import { BoxSection, BoxInfo, DataStream } from "./modules";

// IMPORTANT: These are mouse down buttons in spline with built in camera transitions
export const Buttons = [
  {
    sectionId: "home",
    object: "BaseState",
    name: "Base State",
  },
  {
    sectionId: "center",
    object: "State1",
    name: "State One",
  },
  {
    sectionId: "3",
    object: "State2",
    name: "State Two",
  },
  {
    sectionId: "4",
    object: "State3",
    name: "State Three",
  },
] as const;

export const ButtonsMap = Buttons.reduce(
  (acc, button) => ({
    ...acc,
    [button.sectionId]: button,
  }),
  {} as Record<string, (typeof Buttons)[number]>
);

// IMPORTANT: This determines the visibility of the components in the scene in relation to the camera
export const useSceneConfig = (
  splineRef: any,
  visibility?: {
    [key: string]: { isVisible: boolean; distance: number; isScaled: boolean };
  }
) => {
  return useMemo(
    () => [
      {
        id: "datastream",
        name: "DataStream",
        scaleIn: 0,
        scaleOut: 6000,
        fadeIn: 0,
        fadeOut: 5800,
        component: <DataStream visibility={visibility?.["datastream"]} />,
      },
      {
        id: "boxsection-controls",
        name: "BoxSection",
        scaleIn: 1000,
        scaleOut: 1100,
        fadeIn: 800,
        fadeOut: 1000,
        component: (
          <BoxSection
            splineRef={splineRef}
            visibility={visibility?.["boxsection-controls"]}
          />
        ),
      },
      {
        id: "boxsection-info",
        name: "BoxSection",
        scaleIn: 500,
        scaleOut: 1000,
        fadeIn: 600,
        fadeOut: 850,
        component: <BoxInfo visibility={visibility?.["boxsection-info"]} />,
      },
    ],
    [splineRef, visibility]
  );
};
