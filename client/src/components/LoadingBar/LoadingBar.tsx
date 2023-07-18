import React, { useEffect } from "react";
import "./LoadingBar.css";

interface TLoadingBarProps {
  isLoading: boolean;
}

export const LoadingBar = ({ isLoading }: TLoadingBarProps) => {
  const [progress, setProgress] = React.useState(10);

  useEffect(() => {
    if (!isLoading) return;

    const initialInterval = setInterval(() => {
      if (progress < 85) {
        setProgress((prevProgress) => prevProgress + 1);
      } else {
        clearInterval(initialInterval);
      }
    }, 50);
    const finalInterval = setInterval(() => {
      if (progress >= 85 && progress < 95) {
        setProgress((prevProgress) => prevProgress + 1);
      } else {
        clearInterval(finalInterval);
      }
    }, 200);

    return () => {
      clearInterval(initialInterval);
      clearInterval(finalInterval);
    };
  }, [progress, isLoading]);

  const loadingBarWidth = {
    width: `${progress}%`,
  };

  return isLoading ? (
    <div className="loading-bar-container">
      <div className="loading-bar-fill" style={loadingBarWidth}></div>
    </div>
  ) : (
    <></>
  );
};
