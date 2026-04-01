import { createContext } from "react";

export type ImageSource = {
    image: { video: HTMLVideoElement | null; frameId: number } | ImageBitmap | null;
    reportSize: (width: number, height: number) => void;
    reportZoom: (startX: number, startY: number, width: number, height: number) => void;
    reportDrag: (totalX: number, totalY: number, deltaX: number, deltaY: number, active: boolean) => void;
    clearZoom: () => void;
}
export const ImageContext = createContext<ImageSource>({
    image: null,
    reportSize: () => { },
    reportZoom: () => { },
    reportDrag: () => { },
    clearZoom: () => { }
});

export type VideoFrame = { video: HTMLVideoElement; frameId: number };  
export const isVideo = (image: unknown): image is VideoFrame => 
    typeof image === "object" && 
    image !== null && 
    "video" in image && 
    !!(image as Record<string, unknown>).video;