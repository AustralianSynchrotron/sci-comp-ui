import { createContext } from 'react';

export interface VideoFrame {
    video: HTMLVideoElement;
    frameId: number;
}

export type ImageSource = {
    image: VideoFrame | ImageBitmap | null;
    timestamp: Date | undefined;
    reportSize: (width: number, height: number) => void;
    reportZoom: (startX: number, startY: number, width: number, height: number) => void;
    reportDrag: (totalX: number, totalY: number, active: boolean) => void;
    clearZoom: () => void;
    plotData: PlotDataset | null;
};

export const ImageContext = createContext<ImageSource>({
    image: null,
    timestamp: undefined,
    reportSize: () => {},
    reportZoom: () => {},
    reportDrag: () => {},
    clearZoom: () => {},
    plotData: null
});

export interface PlotDataset {
    x: number[],
    y: number[],
    e: number[]
}