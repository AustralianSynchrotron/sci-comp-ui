import { createContext } from "react";

export type ImageSource = { video: HTMLVideoElement | null; frameId: number } | ImageBitmap | null;
export const ImageContext = createContext<ImageSource>(null);