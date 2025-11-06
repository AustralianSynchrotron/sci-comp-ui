import * as React from 'react';
import { useEffect, useRef, useState, useContext } from "react";
import { cn } from "../../lib/utils";
import { ImageContext } from './image-context';


interface CameraControlProps {
    className?: string;
    onMousePositionChange?: (pos: { x: number, y: number, intensity: number } | null) => void;
    onClick?: (pos: { x: number, y: number, intensity: number }) => void;
    showIntensity?: boolean; // Whether to show pixel intensity or RGBA value

}

export const CameraControl: React.FC<CameraControlProps> = ({
    className,
    onMousePositionChange,
    onClick,
    showIntensity = false }) => {

    const image = useContext(ImageContext);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [popupPos, setPopupPos] = useState<{ x: number, y: number } | null>(null);
    const [pixelValue, setPixelValue] = useState<string | null>(null);
    const [cursorPosition, setCursorPosition] = useState<{ x: number, y: number } | null>(null);
    const [frameCount, setFrameCount] = useState<number>(0);
    const [startTime, setStartTime] = useState<number>(performance.now());


    // Draw image to canvas when loaded
    useEffect(() => {
        if (image && canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = image.width;
            canvas.height = image.height;
            canvas.style.width = `${image.width}px`;
            canvas.style.height = `${image.height}px`;

            setFrameCount(frameCount + 1);
            const now = performance.now();
            if (now - startTime >= 1000) {
              console.log(`FPS: ${frameCount}`);
              setFrameCount(0);
              setStartTime(now);
            }

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(image, 0, 0);
            }
        }
    }, [image])

    // Get mouse position and intensity
    const getMousePixelInfo = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0, intensity: 0, pixel: [0, 0, 0, 0] };

        const rect = canvas.getBoundingClientRect();
        const x = Math.floor(e.clientX - rect.left);
        const y = Math.floor(e.clientY - rect.top);

        const ctx = canvas.getContext('2d');
        if (ctx) {
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            const intensity = Math.round((pixel[0] + pixel[1] + pixel[2]) / 3);
            return { x, y, intensity, pixel };
        }
        return { x: 0, y: 0, intensity: 0, pixel: [0, 0, 0, 0] };
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const info = getMousePixelInfo(e);
        setPopupPos({ x: e.clientX, y: e.clientY });
        if (showIntensity) {
            setPixelValue(`intensity: ${info.intensity}`);
        } else {
            setPixelValue(`rgba(${info.pixel[0]}, ${info.pixel[1]}, ${info.pixel[2]}, ${info.pixel[3] / 255})`);
        }
        if (onMousePositionChange) {
            onMousePositionChange({ x: info.x, y: info.y, intensity: info.intensity });
        }
    };

    const handleMouseLeave = () => {
        setPopupPos(null);
        setPixelValue(null);
        if (onMousePositionChange) {
            onMousePositionChange(null);
        }
    };

    const handleMouseClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const info = getMousePixelInfo(e);
        if (onClick) {
            onClick({ x: info.x, y: info.y, intensity: info.intensity });
        }
        if (e.ctrlKey) {
            setCursorPosition({ x: info.x, y: info.y });
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return (
        <div className={cn("space-y-4", className)} style={{ position: 'relative', display: 'inline-block' }}>
            <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleMouseClick}
                style={{
                    cursor: 'crosshair',
                    display: 'block',
                    border: '1px solid red', // temporary for debugging
                    width: `${image?.width}px`,
                    height: `${image?.height}px`,
                }}
            />
            {/* Overlay cursor */}
            {cursorPosition && canvasRef.current && (
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: canvasRef.current.width,
                        height: canvasRef.current.height,
                        pointerEvents: 'none',
                        zIndex: 10,
                    }}
                >
                    {/* Vertical line */}
                    <div
                        style={{
                            position: 'absolute',
                            left: cursorPosition.x,
                            top: 0,
                            width: 1,
                            height: '100%',
                            background: 'red',
                        }}
                    />
                    {/* Horizontal line */}
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: cursorPosition.y,
                            width: '100%',
                            height: 1,
                            background: 'red',
                        }}
                    />
                </div>
            )}
            {popupPos && (
                <div
                    style={{
                        position: 'fixed',
                        left: popupPos.x + 10,
                        top: popupPos.y + 10,
                        background: 'rgba(0,0,0,0.8)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        pointerEvents: 'none',
                        fontSize: '12px',
                        zIndex: 9999,
                    }}
                >
                    {pixelValue}
                </div>
            )}
        </div>
    );
}
