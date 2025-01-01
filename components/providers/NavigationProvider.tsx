"use client";
import { createContext, useContext, useRef, useState } from "react";
import { useSceneConfig, ButtonsMap } from "@/app/(user)/home/config";
import { useSceneManager } from "@/hooks/useSceneManager";

interface NavigationContextType {
  currentSection: string;
  handleButtonClick: (sectionId: string) => void;
  visibilityStates: {
    [key: string]: { isVisible: boolean; distance: number; isScaled: boolean };
  };
  triggerSceneTransition: () => void;
  splineRef: any;
  setSplineInstance: (spline: any) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const splineRef = useRef<any>(null);
  const sceneObjects = useSceneConfig(splineRef);

  const setSplineInstance = (spline: any) => {
    splineRef.current = spline;
    triggerSceneTransition();
  };

  const {
    visibilityStates,
    handleButtonClick,
    triggerSceneTransition,
    currentSection,
  } = useSceneManager(splineRef, sceneObjects, ButtonsMap);

  return (
    <NavigationContext.Provider
      value={{
        currentSection,
        handleButtonClick,
        visibilityStates,
        triggerSceneTransition,
        splineRef,
        setSplineInstance,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
