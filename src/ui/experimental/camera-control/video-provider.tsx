import React, { useEffect, useRef, useState } from "react";
import { ImageContext } from "./image-context";

export interface VideoProviderProps {
  children: React.ReactNode;
  videoUrl: string;
  loop?: boolean;
}

export const VideoProvider: React.FC<VideoProviderProps> = ({ children, videoUrl, loop = true }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [frameId, setFrameId] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    console.log(`Attempting to load video: ${videoUrl}`);

    video.onloadeddata = async () => {
      console.log(`Video loaded successfully: ${videoUrl}`);
      try {
        await video.play();
        console.log("Video playback started");
      } catch (err) {
        console.error("Video playback failed:", err);
      }
    };

    video.onerror = () => {
      console.error(`Failed to load video: ${videoUrl}`);
    };

    const updateFrame = () => {
      setFrameId((id) => id + 1);
      video.requestVideoFrameCallback(updateFrame);
    };

    video.requestVideoFrameCallback(updateFrame);
  }, [videoUrl]);

  return (
    <>
      <video ref={videoRef} src={videoUrl} autoPlay loop={loop} muted style={{ display: "none" }} />
      <ImageContext.Provider value={{ video: videoRef.current, frameId }}>{children}</ImageContext.Provider>
    </>
  );
};