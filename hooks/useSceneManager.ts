import { useRef, useEffect, useState, useCallback } from "react";
import { useSuppressSplineError } from "./useSuppressSplineError";

export const useSceneManager = (
  splineRef: any,
  objects: {
    id: string;
    name: string;
    scaleIn: number;
    scaleOut: number;
    fadeIn: number;
    fadeOut: number;
  }[],
  sceneStates?: {
    [key: string]: { object: string; sectionId: string; name: string };
  }
) => {
  useSuppressSplineError();

  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const originalScales = useRef<any>({});
  const [visibilityStates, setVisibilityStates] = useState({});
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>("");

  const handleButtonClick = useCallback(
    (stateId: string) => {
      const state = sceneStates?.[stateId];
      if (!state || !splineRef.current) return;

      try {
        const button = splineRef.current.findObjectByName(state.object);
        button?.emitEvent("mouseDown");
        window.location.hash = state.sectionId;
        setCurrentSection(state.sectionId);
      } catch (error) {
        console.warn("Failed to emit event:", error);
      }
    },
    [sceneStates]
  );

  // Original distance and scaling logic...
  const initializeObject = (name: string, object: any) => {
    if (!originalScales.current[name]) {
      originalScales.current[name] = {
        x: object.scale.x,
        y: object.scale.y,
        z: object.scale.z,
      };
    }
  };

  const calculateDistance = (pos1: any, pos2: any) => {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    const dz = pos1.z - pos2.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  };

  const checkObjectDistances = (spline: any) => {
    const camera = spline.findObjectByName("Camera");
    const newStates = {};

    objects.forEach(({ id, name, scaleIn, scaleOut, fadeIn, fadeOut }) => {
      const object = spline.findObjectByName(name);
      if (!object || !camera?.position || !object?.position) {
        newStates[id] = {
          isVisible: false,
          distance: Infinity,
          isScaled: false,
        };
        return;
      }

      initializeObject(name, object);
      const originalScale = originalScales.current[name];
      const distance = calculateDistance(camera.position, object.position);

      if (distance > scaleOut) {
        object.scale.set(0, 0, 0);
      } else {
        object.scale.set(originalScale.x, originalScale.y, originalScale.z);
      }

      newStates[id] = {
        isVisible: distance >= fadeIn && distance < fadeOut,
        distance,
        isScaled: distance < scaleOut,
      };
    });

    setVisibilityStates(newStates);
  };

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (splineRef.current) {
        checkObjectDistances(splineRef.current);
      }
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [objects]);

  const triggerSceneTransition = useCallback(() => {
    const hash = window.location.hash.slice(1);
    if (hash && sceneStates && Object.keys(sceneStates).includes(hash)) {
      setTimeout(() => {
        const button = splineRef.current?.findObjectByName(
          sceneStates[hash].object
        );
        if (button) {
          button.emitEvent("mouseDown");
        }
      }, 500);
    }
  }, [sceneStates]);

  return {
    visibilityStates,
    handleButtonClick,
    isSceneLoaded,
    triggerSceneTransition,
    currentSection,
  };
};
