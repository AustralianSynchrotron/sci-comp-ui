import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";

import { ImageContext } from "./image-context";

const SOURCE_SIZE = 1024;

/** Draw a static + animated test pattern onto an OffscreenCanvas context.
 *  All coordinates are in source-image space (0..SOURCE_SIZE). */
function drawTestPattern(
  ctx: OffscreenCanvasRenderingContext2D,
  t: number,
): void {
  const S = SOURCE_SIZE;

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, S, S);
  bg.addColorStop(0, "#0d1b2a");
  bg.addColorStop(0.5, "#1b2838");
  bg.addColorStop(1, "#0d2218");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, S, S);

  // Fine grid every 64 px
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= S; i += 64) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, S);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(S, i);
    ctx.stroke();
  }

  // Major grid every 256 px
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 1.5;
  for (let i = 0; i <= S; i += 256) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, S);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(S, i);
    ctx.stroke();
  }

  // Coordinate labels at each major grid intersection
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "13px monospace";
  for (let xi = 0; xi <= 4; xi++) {
    for (let yi = 0; yi <= 4; yi++) {
      const lx = xi * 256;
      const ly = yi * 256;
      ctx.fillText(`${lx},${ly}`, lx + 4, ly + 15);
    }
  }

  // Concentric circles at center (colour-coded by radius)
  const cx = S / 2;
  const cy = S / 2;
  for (let r = 64; r <= 448; r += 64) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.strokeStyle = `hsla(${(r / 448) * 240}, 80%, 65%, 0.45)`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // Crosshair at centre
  ctx.strokeStyle = "rgba(255,255,255,0.6)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - 24, cy);
  ctx.lineTo(cx + 24, cy);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, cy - 24);
  ctx.lineTo(cx, cy + 24);
  ctx.stroke();

  // Animated bouncing ball
  const bx = cx + 340 * Math.sin(t / 1400);
  const by = cy + 340 * Math.cos(t / 1100);
  const br = 28;
  const ballGrad = ctx.createRadialGradient(bx - 8, by - 8, 3, bx, by, br);
  ballGrad.addColorStop(0, "rgba(255,240,160,1)");
  ballGrad.addColorStop(1, "rgba(240,80,30,0.85)");
  ctx.beginPath();
  ctx.arc(bx, by, br, 0, 2 * Math.PI);
  ctx.fillStyle = ballGrad;
  ctx.fill();

  // Rotating tick marks around the ball to emphasise animation
  const tickLen = 10;
  const angle = t / 500;
  ctx.strokeStyle = "rgba(255,200,100,0.75)";
  ctx.lineWidth = 2;
  for (let k = 0; k < 8; k++) {
    const a = angle + (k * Math.PI) / 4;
    const r0 = br + 5;
    const r1 = r0 + tickLen;
    ctx.beginPath();
    ctx.moveTo(bx + r0 * Math.cos(a), by + r0 * Math.sin(a));
    ctx.lineTo(bx + r1 * Math.cos(a), by + r1 * Math.sin(a));
    ctx.stroke();
  }

  // Corner markers so the far edges are identifiable when zoomed out
  const corners = [
    [20, 20],
    [S - 20, 20],
    [20, S - 20],
    [S - 20, S - 20],
  ] as const;
  const cornerLabels = ["TL", "TR", "BL", "BR"];
  ctx.fillStyle = "rgba(100,200,255,0.85)";
  ctx.font = "bold 15px monospace";
  corners.forEach(([x, y], i) => {
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(100,200,255,0.85)";
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillText(cornerLabels[i], x + 12, y + 5);
  });
}

export interface MockWebsocketH264Provider {
  children: React.ReactNode;
}

export const MockWebsocketH264Provider: React.FC<MockWebsocketH264Provider> = ({
  children,
}) => {
  const [imageBitmap, setImageBitmap] = useState<ImageBitmap | null>(null);

  // Crop window in source-image coordinates
  const cropRef = useRef({ x: 0, y: 0, w: SOURCE_SIZE, h: SOURCE_SIZE });
  // Display canvas size (updated via reportSize)
  const displayRef = useRef({ w: SOURCE_SIZE, h: SOURCE_SIZE });
  const rafRef = useRef<number>(0);

  // Animation loop – renders a frame into an OffscreenCanvas and
  // converts it to an ImageBitmap at the current display resolution.
  useEffect(() => {
    let active = true;

    const render = (t: number) => {
      if (!active) return;

      const { x, y, w: cw, h: ch } = cropRef.current;
      const { w: dw, h: dh } = displayRef.current;

      const canvas = new OffscreenCanvas(dw, dh);
      const ctx = canvas.getContext(
        "2d",
      ) as OffscreenCanvasRenderingContext2D | null;
      if (ctx) {
        // Map source crop window → display canvas
        ctx.save();
        ctx.scale(dw / cw, dh / ch);
        ctx.translate(-x, -y);
        drawTestPattern(ctx, t);
        ctx.restore();
      }

      createImageBitmap(canvas).then((bmp) => {
        if (active) setImageBitmap(bmp);
      });

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      active = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ==================
  // Interaction callbacks
  // ==================

  const reportSize = useCallback((width: number, height: number) => {
    displayRef.current = { w: Math.max(1, width), h: Math.max(1, height) };
  }, []);

  const reportZoom = useCallback(
    (startX: number, startY: number, width: number, height: number) => {
      const { x: cx, y: cy, w: cw, h: ch } = cropRef.current;
      const { w: dw, h: dh } = displayRef.current;

      // Normalise negative-dimension boxes (drag went left/up)
      let sx = startX,
        sy = startY,
        sw = width,
        sh = height;
      if (sw < 0) {
        sx += sw;
        sw = -sw;
      }
      if (sh < 0) {
        sy += sh;
        sh = -sh;
      }

      if (sw < 2 || sh < 2) return; // ignore accidental tiny boxes

      // Convert display-pixel coords → source coords
      const scaleX = cw / dw;
      const scaleY = ch / dh;

      const newX = Math.max(0, cx + Math.round(sx * scaleX));
      const newY = Math.max(0, cy + Math.round(sy * scaleY));
      const newW = Math.max(1, Math.round(sw * scaleX));
      const newH = Math.max(1, Math.round(sh * scaleY));

      cropRef.current = {
        x: Math.min(newX, SOURCE_SIZE - newW),
        y: Math.min(newY, SOURCE_SIZE - newH),
        w: Math.min(newW, SOURCE_SIZE),
        h: Math.min(newH, SOURCE_SIZE),
      };
    },
    [],
  );

  const reportDrag = useCallback(
    (
      totalX: number,
      totalY: number,
      _deltaX: number,
      _deltaY: number,
      active: boolean,
    ) => {
      if (!active) {
        // Drag ended – pan the crop by the total displacement
        const { x: cx, y: cy, w: cw, h: ch } = cropRef.current;
        const { w: dw, h: dh } = displayRef.current;

        const scaleX = cw / dw;
        const scaleY = ch / dh;

        const newX = cx - Math.round(totalX * scaleX);
        const newY = cy - Math.round(totalY * scaleY);

        cropRef.current = {
          x: Math.max(0, Math.min(newX, SOURCE_SIZE - cw)),
          y: Math.max(0, Math.min(newY, SOURCE_SIZE - ch)),
          w: cw,
          h: ch,
        };
      }
    },
    [],
  );

  const clearZoom = useCallback(() => {
    cropRef.current = { x: 0, y: 0, w: SOURCE_SIZE, h: SOURCE_SIZE };
  }, []);

  const contextValue = useMemo(
    () => ({
      image: imageBitmap,
      reportSize,
      reportZoom,
      reportDrag,
      clearZoom,
    }),
    [imageBitmap, reportSize, reportZoom, reportDrag, clearZoom],
  );

  return (
    <ImageContext.Provider value={contextValue}>
      {children}
    </ImageContext.Provider>
  );
};
