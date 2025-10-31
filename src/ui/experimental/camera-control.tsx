import * as React from 'react';
import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

interface CameraControlProps {
    className?: string;
    cameraSource: string; // URL of the camera feed or image
    onMousePositionChange?: (pos: { x: number, y: number, intensity: number } | null) => void;
    onClick?: (pos: { x: number, y: number, intensity: number }) => void;
    showIntensity?: boolean; // Whether to show pixel intensity or RGBA value
    
}

function CameraControl({ className, cameraSource, onMousePositionChange, onClick, showIntensity = false }: CameraControlProps & { cursorPosition?: { x: number, y: number } | null }) {
    const [popupPos, setPopupPos] = useState<{ x: number, y: number } | null>(null);
    const [pixelValue, setPixelValue] = useState<string | null>(null);
    const imgRef = React.useRef<HTMLImageElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [cursorPosition, setCursorPosition] = useState<{ x: number, y: number } | null>(null);

    // Draw image to canvas when loaded
    const handleImageLoad = () => {
        const img = imgRef.current;
        const canvas = canvasRef.current;
        if (img && canvas) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
            }
        }
    };

    // Get mouse position and intensity
    const getMousePixelInfo = (e: React.MouseEvent<HTMLImageElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const xDisplay = e.clientX - rect.left;
        const yDisplay = e.clientY - rect.top;
        const img = imgRef.current;
        let x = Math.floor(xDisplay);
        let y = Math.floor(yDisplay);
        if (img) {
            const scaleX = img.naturalWidth / img.width;
            const scaleY = img.naturalHeight / img.height;
            x = Math.floor(xDisplay * scaleX);
            y = Math.floor(yDisplay * scaleY);
        }
        let intensity = 0;
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const pixel = ctx.getImageData(x, y, 1, 1).data;
                intensity = Math.round((pixel[0] + pixel[1] + pixel[2]) / 3);
                return { x, y, intensity, pixel };
            }
        }
        return { x, y, intensity, pixel: [0, 0, 0, 0] };
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
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

    const handleMouseClick = (e: React.MouseEvent<HTMLImageElement>) => {
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
            <img
                ref={imgRef}
                src={cameraSource}
                onLoad={handleImageLoad}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleMouseClick}
                style={{ cursor: 'crosshair', display: 'block' }}
                alt="camera"
            />
            {/* Overlay cursor */}
            {cursorPosition && imgRef.current && (
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: imgRef.current.width,
                        height: imgRef.current.height,
                        pointerEvents: 'none',
                        zIndex: 10,
                    }}
                >
                    {/* Vertical line */}
                    <div
                        style={{
                            position: 'absolute',
                            left: cursorPosition.x / imgRef.current.naturalWidth * imgRef.current.width,
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
                            top: cursorPosition.y / imgRef.current.naturalHeight * imgRef.current.height,
                            width: '100%',
                            height: 1,
                            background: 'red',
                        }}
                    />
                </div>
            )}
            {/* Hidden canvas for pixel reading */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
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

export { CameraControl }
