import { useEffect } from "react";

export const useSuppressSplineError = () => {
  useEffect(() => {
    const originalError = console.error;

    console.error = (...args) => {
      if (args[0]?.includes?.("Missing property")) {
        return;
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);
};
