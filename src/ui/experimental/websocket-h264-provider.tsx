import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";

import { ImageContext } from "./image-context";

export interface WebsocketH264ProviderProps {
  children: React.ReactNode;
  url: string;
}

export const WebsocketH264Provider: React.FC<WebsocketH264ProviderProps> = ({
  children,
  url,
}) => {
  // ==================
  // State
  // ==================
  const [sessionID, setSessionID] = useState<string | null>(
    "019c6ef1-821e-7b7b-a28b-085f73d0a248",
  );
  const [imageBitmap, setImageBitmap] = useState<ImageBitmap | null>(null);
  const [sourceWidth, setSourceWidth] = useState<number>(1024);
  const [sourceHeight, setSourceHeight] = useState<number>(1024);
  const [currentWidth, setCurrentWidth] = useState<number>(1024);
  const [currentHeight, setCurrentHeight] = useState<number>(1024);

  // ==================
  // Refs
  // ==================
  const wsRef = useRef<WebSocket | null>(null);
  const dimsRef = useRef<{ width: number; height: number }>({
    width: 1024,
    height: 1024,
  });
  const abortedRef = useRef<boolean>(false);
  const configuredRef = useRef<boolean>(false);
  const decoderRef = useRef<VideoDecoder | null>(null);
  const reconnectTimerRef = useRef<number | null>(null);
  const spsRef = useRef<Uint8Array | null>(null);
  const ppsRef = useRef<Uint8Array | null>(null);
  const nextTsRef = useRef<number>(0);

  // ==================
  // Helper Functions
  // ==================

  const frameDurationUs = Math.round(1_000_000 / 50);

  const splitAnnexB = (buf: ArrayBuffer): Uint8Array[] => {
    const b = new Uint8Array(buf),
      out: Uint8Array[] = [];
    let i = 0;
    const isStart = (i: number) =>
      (i + 3 < b.length && b[i] === 0 && b[i + 1] === 0 && b[i + 2] === 1) ||
      (i + 4 < b.length &&
        b[i] === 0 &&
        b[i + 1] === 0 &&
        b[i + 2] === 0 &&
        b[i + 3] === 1);
    const consumeStart = (i: number) => (b[i + 2] === 1 ? i + 3 : i + 4);

    while (i < b.length - 3 && !isStart(i)) i++;
    if (i >= b.length - 3) return out;
    i = consumeStart(i);
    let start = i;
    while (i < b.length) {
      if (isStart(i)) {
        out.push(b.subarray(start, i));
        i = consumeStart(i);
        start = i;
      } else i++;
    }
    if (start < b.length) out.push(b.subarray(start));
    return out;
  };

  const nalType = (nal: Uint8Array) => nal[0] & 0x1f;
  const isKeyframe = (nals: Uint8Array[]) => nals.some((n) => nalType(n) === 5);

  const buildAvcC = (spsNal: Uint8Array, ppsNal: Uint8Array): Uint8Array => {
    const spsLen = spsNal.length,
      ppsLen = ppsNal.length;
    const avcc = new Uint8Array(7 + 2 + spsLen + 1 + 2 + ppsLen);
    let o = 0;
    avcc[o++] = 1;
    avcc[o++] = spsNal[1];
    avcc[o++] = spsNal[2];
    avcc[o++] = spsNal[3];
    avcc[o++] = 0xff;
    avcc[o++] = 0xe1;
    avcc[o++] = (spsLen >>> 8) & 0xff;
    avcc[o++] = spsLen & 0xff;
    avcc.set(spsNal, o);
    o += spsLen;
    avcc[o++] = 1;
    avcc[o++] = (ppsLen >>> 8) & 0xff;
    avcc[o++] = ppsLen & 0xff;
    avcc.set(ppsNal, o);
    o += ppsLen;
    return avcc;
  };

  const codecFromSps = (spsNal: Uint8Array): string => {
    const hex = (n: number) => n.toString(16).toUpperCase().padStart(2, "0");
    return `avc1.${hex(spsNal[1])}${hex(spsNal[2])}${hex(spsNal[3])}`;
  };

  const ensureDecoder = () => {
    if (decoderRef.current) return;

    decoderRef.current = new VideoDecoder({
      output: async (frame) => {
        const bitmap = await createImageBitmap(frame);
        setImageBitmap(bitmap);
        frame.close();
      },
      error: (e) => console.error("Decoder error:", e),
    });
  };

  const tryConfigure = async (): Promise<boolean> => {
    if (configuredRef.current || !spsRef.current || !ppsRef.current)
      return false;
    ensureDecoder();

    const description = buildAvcC(spsRef.current, ppsRef.current);
    const codec = codecFromSps(spsRef.current);

    const { width: codedWidth, height: codedHeight } = dimsRef.current;

    const config: VideoDecoderConfig = {
      codec,
      codedWidth: codedWidth,
      codedHeight: codedHeight,
      description: description.buffer,
    };

    const support = await VideoDecoder.isConfigSupported(config).catch(
      () => null,
    );
    if (!support?.supported) {
      console.warn("Unsupported config:", config);
      return false;
    }

    if (decoderRef.current!.state === "configured") decoderRef.current!.reset();
    decoderRef.current!.configure(config);
    configuredRef.current = true;
    return true;
  };

  const feedChunk = (nals: Uint8Array[]) => {
    let total = 0;
    for (const n of nals) total += 4 + n.length;
    const payload = new Uint8Array(total);
    let o = 0;
    for (const n of nals) {
      const L = n.length;
      payload[o++] = (L >>> 24) & 0xff;
      payload[o++] = (L >>> 16) & 0xff;
      payload[o++] = (L >>> 8) & 0xff;
      payload[o++] = L & 0xff;
      payload.set(n, o);
      o += L;
    }

    const chunk = new EncodedVideoChunk({
      type: isKeyframe(nals) ? "key" : "delta",
      timestamp: nextTsRef.current,
      data: payload,
    });
    nextTsRef.current += frameDurationUs;
    decoderRef.current!.decode(chunk);
  };

  const onAccessUnit = (buf: ArrayBuffer) => {
    const nals = splitAnnexB(buf);
    if (!nals.length) return;

    for (const n of nals) {
      const t = nalType(n);
      if (t === 7) spsRef.current = n.slice();
      else if (t === 8) ppsRef.current = n.slice();
    }

    if (!configuredRef.current && spsRef.current && ppsRef.current) {
      console.log("Reconfigure");
      void tryConfigure().then((ok) => {
        if (ok) feedChunk(nals);
      });
    } else if (configuredRef.current) feedChunk(nals);
  };

  useEffect(() => {
    if (!("VideoDecoder" in window)) {
      console.error("WebCodecs VideoDecoder is not supported in this browser.");
      return;
    }

    let ws: WebSocket;
    spsRef.current = null;
    ppsRef.current = null;
    nextTsRef.current = 0;

    const connect = () => {
      ws = new WebSocket("ws://" + url + "/ws?session_id=" + sessionID);
      wsRef.current = ws;
      ws.binaryType = "arraybuffer";

      ws.onopen = () => {
        console.log("Connected");
        configuredRef.current = false;
      };

      ws.onmessage = (ev) => {
        if (typeof ev.data === "string") {
          try {
            const meta = JSON.parse(ev.data);
            if (meta.type === "config") {
              console.log(meta);
              setCurrentWidth(meta.width);
              setCurrentHeight(meta.height);
              setSourceWidth(meta.source_width);
              setSourceHeight(meta.source_height);

              dimsRef.current = { width: meta.width, height: meta.height };
              configuredRef.current = false; // force reconfigure
              void tryConfigure();
            }
          } catch (e) {
            console.warn("Failed to parse metadata:", e);
          }
        } else {
          onAccessUnit(ev.data);
        }
      };

      ws.onclose = () => {
        configuredRef.current = false;
        try {
          decoderRef.current?.flush().catch(() => {});
        } catch {/**/}
        if (!abortedRef.current) {
          reconnectTimerRef.current = window.setTimeout(connect, 3000);
        }
      };

      ws.onerror = (e) => {
        console.error("WebSocket error:", e);
        try {
          ws.close();
        } catch {/**/}
      };
    };

    connect();

    return () => {
      abortedRef.current = true;
      if (reconnectTimerRef.current !== null) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
      try {
        wsRef.current?.close();
      } catch {/**/}
      try {
        decoderRef.current?.close();
      } catch {/**/}
    };
    
    // `tryConfigure` and `onAccessUnit` read only from refs and are intentionally stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionID, url]);

  const reportSize = useCallback(async (width: number, height: number) => {
    const response = await fetch(
      "http://" + url + "/api/sessions/" + sessionID + "/resolution",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ width, height }),
      },
    );
  }, [url, sessionID]);

  const reportZoom = useCallback(
    async (startX: number, startY: number, width: number, height: number) => {
      const crop_response = await fetch(
        "http://" + url + "/api/sessions/" + sessionID + "/crop",
        {
          method: "GET",
        },
      );

      const {
        x: currentCropX,
        y: currentCropY,
        width: currentCropWidth,
        height: currentCropHeight,
      } = (await crop_response.json()) ?? {
        x: 0,
        y: 0,
        width: sourceWidth,
        height: sourceHeight,
      };

      const xScale = currentCropWidth / currentWidth;
      const yScale = currentCropHeight / currentHeight;

      if (width < 0) {
        startX = startX + width;
        width = -1 * width;
      }
      if (height < 0) {
        startY = startY + height;
        height = -1 * height;
      }

      const x = currentCropX + Math.floor(startX * xScale);
      const y = currentCropY + Math.floor(startY * yScale);

      const cropWidth = Math.floor(width * xScale);
      const cropHeight = Math.floor(height * yScale);

      if (cropWidth == 0 || cropHeight == 0) {
        return;
      }

      console.log(x, y, cropWidth, cropHeight);

      const response = await fetch(
        "http://" + url + "/api/sessions/" + sessionID + "/crop",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ x, y, width: cropWidth, height: cropHeight }),
        },
      );
    },
    [url, sessionID, sourceWidth, sourceHeight, currentWidth, currentHeight],
  );

  const reportDrag = useCallback(
    async (
      totalX: number,
      totalY: number,
      deltaX: number,
      deltaY: number,
      active: boolean,
    ) => {
      if (!active) {
        const crop_response = await fetch(
          "http://" + url + "/api/sessions/" + sessionID + "/crop",
          {
            method: "GET",
          },
        );
        const {
          x: currentCropX,
          y: currentCropY,
          width: currentCropWidth,
          height: currentCropHeight,
        } = await crop_response.json();

        const xScale = currentCropWidth / currentWidth;
        const yScale = currentCropHeight / currentHeight;

        const scale = Math.max(xScale, yScale);

        const x = currentCropX - Math.floor(totalX * scale);
        const y = currentCropY - Math.floor(totalY * scale);

        console.log({
          currentCropX,
          currentCropWidth,
          currentWidth,
          xScale,
          totalX,
          shiftX: Math.floor(totalX * xScale),
          x,
        });

        const response = await fetch(
          "http://" + url + "/api/sessions/" + sessionID + "/crop",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              x,
              y,
              width: currentCropWidth,
              height: currentCropHeight,
            }),
          },
        );
      }
    },
    [url, sessionID, currentWidth, currentHeight],
  );

  const clearZoom = useCallback(async () => {
    const response = await fetch(
      "http://" + url + "/api/sessions/" + sessionID + "/crop",
      {
        method: "DELETE",
      },
    );
  }, [url, sessionID]);

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
