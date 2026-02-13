import React, { useEffect, useRef, useState, useContext } from "react";
import { cn } from "../../lib/utils";
import { ImageContext } from "./image-context";

export interface CameraControlProps {
  className?: string;
  onMousePositionChange?: (pos: { x: number; y: number; intensity: number } | null) => void;
  onClick?: (pos: { x: number; y: number; intensity: number }) => void;
  showIntensity?: boolean;
  onZoom?: (box: { startX: number; startY: number, width: number, height: number }) => void;
}

export const CameraControl: React.FC<CameraControlProps> = ({
  className,
  onMousePositionChange,
  onClick,
  showIntensity = false,
  onZoom
}) => {
  const { image, reportSize, reportZoom, reportDrag, clearZoom } = useContext(ImageContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [popupPos, setPopupPos] = useState<{ x: number; y: number } | null>(null);
  const [pixelValue, setPixelValue] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
  const [zoomBox, setZoomBox] = useState<{ startX: number; startY: number; width: number; height: number } | null>(null);
  const [dragStart, setDragStart] = useState<{ startX: number; startY: number; lastX: number, lastY: number } | null>(null);
  const [frameCount, setFrameCount] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(performance.now());

  // Helper to get dimensions safely
  const getDimensions = () => {
    if (!image) return { w: 0, h: 0 };
    if (typeof image === "object" && "video" in image && image.video) {
      return { w: image.video.videoWidth, h: image.video.videoHeight };
    }
    if (image instanceof ImageBitmap) {
      return { w: image.width, h: image.height };
    }
    return { w: 0, h: 0 };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !reportSize) return;

    // TODO: This should be debounced
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      // Set canvas to size of canvas?
      canvas.width = width;
      canvas.height = height;

      // Report the size back to the provider
      reportSize(Math.floor(width), Math.floor(height));
    });

    observer.observe(canvas);
    return () => observer.disconnect();
  }, [reportSize]);

  // Draw source when updated
  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // const { w, h } = getDimensions();
    // if (w === 0 || h === 0) return;


    // canvas.width = w;
    // canvas.height = h;

    try {
      if (typeof image === "object" && "video" in image && image.video) {
        ctx.drawImage(image.video, 0, 0);
      } else if (image instanceof ImageBitmap) {
        ctx.drawImage(image, 0, 0);
      }
      if (zoomBox) {
        ctx.strokeStyle = 'yellow'; // Set bounding box color
        ctx.lineWidth = 2; // Set line width
        ctx.strokeRect(zoomBox.startX, zoomBox.startY, zoomBox.width, zoomBox.height);
      }
    } catch (err) {
      console.warn("Draw failed:", err);
      return;
    }

    // FPS tracking
    setFrameCount((prev) => prev + 1);
    const now = performance.now();
    if (now - startTime >= 1000) {
      // console.log(`FPS: ${frameCount}`);
      setFrameCount(0);
      setStartTime(now);
    }
  }, [image instanceof ImageBitmap ? image : (image as any)?.frameId]);

  // Throttle mouse move
  let lastMove = 0;
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (dragStart) {

      console.log(e.clientX);

      let deltaX = e.clientX - dragStart.lastX;
      let deltaY = e.clientY - dragStart.lastY;
      setDragStart({ ...dragStart, lastX: e.clientX, lastY: e.clientY });
      reportDrag(e.clientX - dragStart.startX, e.clientY - dragStart.startY, deltaX, deltaY, true);
      return
    }

    const now = performance.now();
    if (now - lastMove < 50) return;
    lastMove = now;



    const info = getMousePixelInfo(e);
    setPopupPos({ x: e.clientX, y: e.clientY });
    setPixelValue(showIntensity ? `intensity: ${info.intensity}` : `rgba(${info.pixel[0]}, ${info.pixel[1]}, ${info.pixel[2]}, ${info.pixel[3] / 255})`);
    onMousePositionChange?.({ x: info.x, y: info.y, intensity: info.intensity });
  };

  const getMousePixelInfo = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || canvas.width === 0 || canvas.height === 0) return { x: 0, y: 0, intensity: 0, pixel: [0, 0, 0, 0] };

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    const ctx = canvas.getContext("2d");

    if (zoomBox) {
      setZoomBox({ startX: zoomBox.startX, startY: zoomBox.startY, width: x - zoomBox.startX, height: y - zoomBox.startY })
    }

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

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.shiftKey) {
      setDragStart({ startX: e.clientX, startY: e.clientY, lastX: e.clientX, lastY: e.clientY });
    } else {
      const info = getMousePixelInfo(e);
      setZoomBox({ startX: info.x, startY: info.y, width: 0, height: 0 });
    }
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (dragStart) {
      console.log(dragStart);
      reportDrag(e.clientX - dragStart.startX, e.clientY - dragStart.startY, 0, 0, false)
      setDragStart(null);
    }
    if (zoomBox) {
      onZoom?.(zoomBox);
      reportZoom(zoomBox.startX, zoomBox.startY, zoomBox.width, zoomBox.height);
    }
    setZoomBox(null);
  }

  const handleDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    clearZoom()
  }
  // const { w, h } = getDimensions();

  return (
    <div className={cn("space-y-4", className)} style={{ position: "relative", display: "inline-block", width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleMouseClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onDoubleClick={handleDoubleClick}
        style={{
          cursor: "crosshair",
          display: "block",
          border: "1px solid red",
          width: "100%",
          height: "100%"
          // width: `${w}px`,
          // height: `${h}px`,
        }}
      />
      {/* Crosshair */}
      {cursorPosition && canvasRef.current && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: canvasRef.current.getBoundingClientRect().width,
            height: canvasRef.current.getBoundingClientRect().height,
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <div style={{ position: "absolute", left: cursorPosition.x, top: 0, width: 1, height: "100%", background: "red" }} />
          <div style={{ position: "absolute", left: 0, top: cursorPosition.y, width: "100%", height: 1, background: "red" }} />
        </div>
      )}
      {/* Popup */}
      {popupPos && (
        <div
          style={{
            position: "fixed",
            left: popupPos.x + 10,
            top: popupPos.y + 10,
            background: "rgba(0,0,0,0.8)",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            pointerEvents: "none",
            fontSize: "12px",
            zIndex: 9999,
          }}
        >
          {pixelValue}
        </div>
      )}
    </div>
  );
};