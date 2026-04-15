import React, { useEffect, useRef, useState, useMemo, useContext, useCallback } from 'react';

import { cn } from '@/lib/utils';

import { ImageContext, type VideoFrame, type ImageSource } from './image-context';

function debounceResize(fn: (entry: ResizeObserverEntry) => void, delay: number = 100) {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const debounced = (entry: ResizeObserverEntry) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn(entry), delay);
    };

    debounced.cancel = () => {
        if (timer) clearTimeout(timer);
        timer = undefined;
    };

    return debounced;
}

type BoundingBox = {
    startX: number;
    startY: number;
    width: number;
    height: number;
};

export type CameraMousePosition = {
    x: number;
    y: number;
    intensity: number;
};

export interface CameraControlProps {
    className?: string;
    onMousePositionChange?: (pos: CameraMousePosition | null) => void;
    onClick?: (pos: CameraMousePosition) => void;
    showIntensity?: boolean;
    onZoom?: (box: BoundingBox) => void;
    sizeFollowsImage?: boolean;
    debugFPS?: boolean;
}

/**
 * Returns a webcomponent that provides a container (canvas) for various video or image
 * producers, and implements various controls and annotations.
 * @param onMousePositionChange - Callback called on mouse movement inside canvas.
 * @param onClick - Callback called on a mouse click within canvas.
 * @param showIntensity - Whether to show the pixel intensity at mouse position as a tooltip.
 * @param onZoom - Callback called after a bounding box is drawn.
 * @param sizeFollowsImage - Resize the canvas if the image size changes
 * @param debugFPS - Whether to calculate and display FPS in console log, for debug purposes
 * @returns
 */
export const CameraControl: React.FC<CameraControlProps> = ({
    className,
    onMousePositionChange,
    onClick,
    showIntensity = false,
    onZoom,
    sizeFollowsImage = false,
    debugFPS = false,
}) => {
    const { image, reportSize, reportZoom, reportDrag, clearZoom }: ImageSource = useContext(ImageContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [popupPos, setPopupPos] = useState<{ x: number; y: number } | null>(null);
    const [pixelValue, setPixelValue] = useState<string | null>(null);
    const [cursorPosition, setCursorPosition] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const [zoomBox, setZoomBox] = useState<BoundingBox | null>(null);
    const [dragStart, setDragStart] = useState<{
        startX: number;
        startY: number;
        lastX: number;
        lastY: number;
    } | null>(null);
    const [spaceHeld, setSpaceHeld] = useState<boolean>(false);
    const [cursorDisplay, setCursorDisplay] = useState<string>('crosshair');

    // FPS debug tools
    const [frameCount, setFrameCount] = useState<number>(0);
    const [startTime, setStartTime] = useState<number>(performance.now());

    // Get image dimensions depending on type
    const imageDimensions = useMemo(() => {
        const DEFAULT_DIMENSIONS = { w: 0, h: 0 };

        if (!image) return DEFAULT_DIMENSIONS;
        if (image instanceof VideoFrame) {
            const video = (image as VideoFrame).video;
            return { w: video.videoWidth, h: video.videoHeight };
        }
        if (image instanceof ImageBitmap) return { w: image.width, h: image.height };
        return DEFAULT_DIMENSIONS;
    }, [image]);

    // Canvas resize listener and reporter
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !reportSize) return;

        const handler = debounceResize((entry) => {
            const { width, height } = entry.contentRect;
            // Set canvas to size of canvas?
            canvas.width = width;
            canvas.height = height;

            // Report the size back to the provider
            reportSize(Math.floor(width), Math.floor(height));
        });

        const observer = new ResizeObserver((entries) => handler(entries[0]));

        observer.observe(canvas);
        return () => observer.disconnect();
    }, [reportSize]);

    // Draw source when updated
    useEffect(() => {
        if (!image || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (sizeFollowsImage) {
            const { w, h } = imageDimensions;
            if (w === 0 || h === 0) return;
            canvas.width = w;
            canvas.height = h;
        }

        try {
            if (image instanceof VideoFrame) {
                ctx.drawImage((image as VideoFrame).video, 0, 0);
            } else if (image instanceof ImageBitmap) {
                ctx.drawImage(image, 0, 0);
            }
            if (zoomBox) {
                ctx.strokeStyle = 'yellow'; // Set bounding box color
                ctx.lineWidth = 2; // Set line width
                ctx.strokeRect(zoomBox.startX, zoomBox.startY, zoomBox.width, zoomBox.height);
            }
        } catch (err) {
            console.warn('Draw failed:', err);
            return;
        }
    }, [image, imageDimensions, sizeFollowsImage, zoomBox, startTime]);

    // FPS tracking
    useEffect(() => {
        if (!image || !canvasRef.current || !debugFPS) return;

        setFrameCount((prev) => prev + 1);
        const now = performance.now();
        if (now - startTime >= 1000) {
            console.log(`FPS: ${frameCount}`);
            setFrameCount(0);
            setStartTime(now);
        }
    }, [image, startTime, debugFPS]);

    // Throttle mouse move
    let lastMove = 0;
    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (dragStart) {
            const deltaX = e.clientX - dragStart.lastX;
            const deltaY = e.clientY - dragStart.lastY;
            setDragStart({ ...dragStart, lastX: e.clientX, lastY: e.clientY });
            reportDrag(e.clientX - dragStart.startX, e.clientY - dragStart.startY, deltaX, deltaY, true);
            return;
        }

        const now = performance.now();
        if (now - lastMove < 50) return;
        lastMove = now;

        const info = getMousePixelInfo(e);

        if (zoomBox) {
            setZoomBox({
                ...zoomBox,
                width: info.x - zoomBox.startX,
                height: info.y - zoomBox.startY,
            });
        }

        setPopupPos({ x: e.clientX, y: e.clientY });
        setPixelValue(
            showIntensity
                ? `intensity: ${info.intensity}`
                : `rgba(${info.pixel[0]}, ${info.pixel[1]}, ${info.pixel[2]}, ${info.pixel[3] / 255})`,
        );
        onMousePositionChange?.({
            x: info.x,
            y: info.y,
            intensity: info.intensity,
        });
    };

    const getMousePixelInfo = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas || canvas.width === 0 || canvas.height === 0)
            return { x: 0, y: 0, intensity: 0, pixel: [0, 0, 0, 0] };

        const rect = canvas.getBoundingClientRect();
        const x = Math.floor(e.clientX - rect.left);
        const y = Math.floor(e.clientY - rect.top);

        const ctx = canvas.getContext('2d');

        if (!ctx) return { x, y, intensity: 0, pixel: [0, 0, 0, 0] };

        try {
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            const intensity = Math.round((pixel[0] + pixel[1] + pixel[2]) / 3);
            return { x, y, intensity, pixel };
        } catch {
            return { x, y, intensity: 0, pixel: [0, 0, 0, 0] };
        }
    };

    const handleMouseLeave = () => {
        setPopupPos(null);
        setPixelValue(null);
        onMousePositionChange?.(null);
    };

    const handleMouseClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const info = getMousePixelInfo(e);

        onClick?.({ x: info.x, y: info.y, intensity: info.intensity });
        if (e.ctrlKey) {
            setCursorPosition({ x: info.x, y: info.y });
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const handleMouseDown = useCallback(
        (e: React.MouseEvent<HTMLCanvasElement>) => {
            if (spaceHeld) {
                setCursorDisplay('grabbing');
                setDragStart({
                    startX: e.clientX,
                    startY: e.clientY,
                    lastX: e.clientX,
                    lastY: e.clientY,
                });
            } else {
                const info = getMousePixelInfo(e);
                setZoomBox({ startX: info.x, startY: info.y, width: 0, height: 0 });
            }
        },
        [spaceHeld],
    );

    const handleMouseUp = useCallback(
        (e: React.MouseEvent<HTMLCanvasElement>) => {
            if (dragStart) {
                if (spaceHeld) {
                    setCursorDisplay('grab');
                } else {
                    setCursorDisplay('crosshair');
                }
                reportDrag(e.clientX - dragStart.startX, e.clientY - dragStart.startY, 0, 0, false);
                setDragStart(null);
            }
            if (zoomBox) {
                onZoom?.(zoomBox);
                reportZoom(zoomBox.startX, zoomBox.startY, zoomBox.width, zoomBox.height);
            }
            setZoomBox(null);
        },
        [dragStart, spaceHeld, zoomBox, onZoom, reportDrag, reportZoom],
    );

    const handleDoubleClick = (_e: React.MouseEvent<HTMLCanvasElement>) => {
        clearZoom();
    };

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLCanvasElement>) => {
            if (e.code === 'Space') {
                if (!spaceHeld) {
                    setCursorDisplay('grab');
                    setSpaceHeld(true);
                }
                e.preventDefault();
            }
        },
        [spaceHeld],
    );

    const handleKeyUp = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
        if (e.code === 'Space') {
            setSpaceHeld(false);
            if (!dragStart) {
                setCursorDisplay('crosshair');
            }
            e.preventDefault();
        }
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLCanvasElement>) => {
        e.currentTarget.focus();
    };

    return (
        <div className={cn('space-y-4 relative inline-block w-full h-full', className)}>
            <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleMouseClick}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onDoubleClick={handleDoubleClick}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                tabIndex={0}
                className="block w-full h-full border border-red-600"
                style={{
                    cursor: cursorDisplay,
                }}
            />
            {/* Crosshair */}
            {cursorPosition && canvasRef.current && (
                <div
                    className="absolute left-0 top-0 z-10 pointer-events-none"
                    style={{
                        width: canvasRef.current.getBoundingClientRect().width,
                        height: canvasRef.current.getBoundingClientRect().height,
                    }}
                >
                    <div
                        className="absolute top-0 w-px h-full bg-red-600"
                        style={{
                            left: cursorPosition.x,
                        }}
                    />
                    <div
                        className="absolute left-0 h-px width-full bg-red-600"
                        style={{
                            top: cursorPosition.y,
                        }}
                    />
                </div>
            )}
            {/* Popup */}
            {popupPos && (
                <div
                    className="fixed z-9999 pointer-events-none text-xs text-white py-1 px-2 rounded-sm bg-black/80"
                    style={{
                        left: popupPos.x + 10,
                        top: popupPos.y + 10,
                    }}
                >
                    {pixelValue}
                </div>
            )}
        </div>
    );
};
