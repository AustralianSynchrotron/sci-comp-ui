import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';

import { ImageContext } from './image-context';

import { type H264Api, DefaultResolution } from './h264-api';

export interface WebsocketH264ProviderProps {
    children: React.ReactNode;
    sessionId?: string;
    onSessionCreated?: (sessionId: string) => void;
    api: H264Api;
}

/**
 * A provider to be used with the CameraControl Webcomponent. This provider
 * receives streams from the h264-websocket-stream server and maps camera control
 * controls to approriate endpoints to control the stream.
 * @param api - An API the satisfies the H264Api Interface for
 *              communicating with h264 websocket stream server.
 * @returns
 */
export const WebsocketH264Provider: React.FC<WebsocketH264ProviderProps> = ({
    children,
    sessionId = null,
    onSessionCreated = null,
    api,
}) => {
    // ==================
    // State
    // ==================
    const [imageBitmap, setImageBitmap] = useState<ImageBitmap | null>(null);
    const [sourceWidth, setSourceWidth] = useState<number>(DefaultResolution.width);
    const [sourceHeight, setSourceHeight] = useState<number>(DefaultResolution.height);
    const [currentWidth, setCurrentWidth] = useState<number>(DefaultResolution.width);
    const [currentHeight, setCurrentHeight] = useState<number>(DefaultResolution.height);
    const [currentCropHeight, setCurrentCropHeight] = useState<number>(DefaultResolution.height);
    const [currentCropWidth, setCurrentCropWidth] = useState<number>(DefaultResolution.width);
    const [currentCropStartX, setCurrentCropStartX] = useState<number>(0);
    const [currentCropStartY, setCurrentCropStartY] = useState<number>(0);
    const [paddingWidth, setPaddingWidth] = useState<number>(0);
    const [paddingHeight, setPaddingHeight] = useState<number>(0);

    // ==================
    // Refs
    // ==================
    const wsRef = useRef<WebSocket | null>(null);
    const dimsRef = useRef<{ width: number; height: number }>({
        width: DefaultResolution.width,
        height: DefaultResolution.height,
    });
    const abortedRef = useRef<boolean>(false);
    const configuringRef = useRef<boolean>(false);
    const configuredRef = useRef<boolean>(false);
    const decoderRef = useRef<VideoDecoder | null>(null);
    const reconnectTimerRef = useRef<number | null>(null);
    const spsRef = useRef<Uint8Array | null>(null);
    const ppsRef = useRef<Uint8Array | null>(null);
    const nextTsRef = useRef<number>(0);
    const sidRef = useRef<string | null>(sessionId ?? null);
    const lastConfigRef = useRef<{ width: number; height: number } | null>(null);

    // Internal resolved session ID. We mirror the prop; if null, we create and then set it here.
    const [resolvedSessionId, setResolvedSessionId] = useState<string | null>(sessionId);

    useEffect(() => {
        setResolvedSessionId(sessionId ?? null);
    }, [sessionId]);

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
            (i + 4 < b.length && b[i] === 0 && b[i + 1] === 0 && b[i + 2] === 0 && b[i + 3] === 1);
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
        const hex = (n: number) => n.toString(16).toUpperCase().padStart(2, '0');
        return `avc1.${hex(spsNal[1])}${hex(spsNal[2])}${hex(spsNal[3])}`;
    };

    const ensureDecoder = () => {
        if (decoderRef.current && decoderRef.current.state !== 'closed') return;

        decoderRef.current = new VideoDecoder({
            output: async (frame) => {
                const bitmap = await createImageBitmap(frame);
                setImageBitmap(bitmap);
                frame.close();
            },
            error: (e) => console.error('Decoder error:', e),
        });
    };

    const tryConfigure = async (): Promise<boolean> => {
        if (abortedRef.current) return false;
        if (configuringRef.current) return false;
        if (configuredRef.current || !spsRef.current || !ppsRef.current) return false;

        configuringRef.current = true;
        try {
            ensureDecoder();

            const description = buildAvcC(spsRef.current, ppsRef.current);
            const codec = codecFromSps(spsRef.current);
            const { width: codedWidth, height: codedHeight } = dimsRef.current;

            const config: VideoDecoderConfig = {
                codec,
                codedWidth: codedWidth,
                codedHeight: codedHeight,
                description: description,
            };

            const support = await VideoDecoder.isConfigSupported(config).catch(() => null);
            if (!support?.supported) {
                console.warn('Unsupported config:', config);
                return false;
            }

            if (abortedRef.current) return false;

            const dec = decoderRef.current;
            if (!dec || dec.state === 'closed') return false;

            if (dec.state === 'configured') dec.reset();
            dec.configure(config);
            configuredRef.current = true;
            return true;
        } catch (e) {
            console.warn('tryConfigure failed:', e);
            return false;
        } finally {
            configuringRef.current = false;
        }
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
            type: isKeyframe(nals) ? 'key' : 'delta',
            timestamp: nextTsRef.current,
            data: payload,
        });
        nextTsRef.current += frameDurationUs;

        const dec = decoderRef.current;
        if (!dec || dec.state === 'closed') return;
        try {
            dec.decode(chunk);
        } catch {
            /**/
        }
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
            console.log('Reconfigure');
            void tryConfigure().then((ok) => {
                if (ok) feedChunk(nals);
            });
        } else if (configuredRef.current) feedChunk(nals);
    };

    useEffect(() => {
        if (!('VideoDecoder' in window)) {
            console.error('WebCodecs VideoDecoder is not supported in this browser.');
            return;
        }

        const aborter = new AbortController();
        abortedRef.current = false;

        let ws: WebSocket;
        spsRef.current = null;
        ppsRef.current = null;
        nextTsRef.current = 0;

        const connect = (sid: string) => {
            ws = api.wsFactory(sid);

            wsRef.current = ws;
            ws.binaryType = 'arraybuffer';

            ws.onopen = () => {
                console.log('Connected');
                configuredRef.current = false;
            };

            ws.onmessage = (ev) => {
                if (typeof ev.data === 'string') {
                    try {
                        const meta = JSON.parse(ev.data);
                        if (meta.type === 'config') {
                            console.log(meta);
                            setCurrentWidth(meta.width);
                            setCurrentHeight(meta.height);
                            setSourceWidth(meta.source_width);
                            setSourceHeight(meta.source_height);
                            setPaddingWidth(meta.padding_width);
                            setPaddingHeight(meta.padding_height);
                            setCurrentCropWidth(meta.crop_width);
                            setCurrentCropHeight(meta.crop_height);
                            setCurrentCropStartX(meta.crop_x);
                            setCurrentCropStartY(meta.crop_y);

                            const last = lastConfigRef.current;
                            const changed = !last || last.width !== meta.width || last.height !== meta.height;

                            if (changed) {
                                lastConfigRef.current = {
                                    width: meta.width,
                                    height: meta.height,
                                };
                                dimsRef.current = { width: meta.width, height: meta.height };
                                configuredRef.current = false; // force reconfigure
                                void tryConfigure();
                            }
                        }
                    } catch (e) {
                        console.warn('Failed to parse metadata:', e);
                    }
                } else {
                    onAccessUnit(ev.data);
                }
            };

            ws.onclose = () => {
                configuredRef.current = false;
                try {
                    decoderRef.current?.flush().catch(() => {});
                } catch {
                    /**/
                }
                if (!abortedRef.current && sidRef.current) {
                    reconnectTimerRef.current = window.setTimeout(() => connect(sidRef.current!), 3000);
                }
            };

            ws.onerror = (e) => {
                console.error('WebSocket error:', e);
                try {
                    ws.close();
                } catch {
                    /**/
                }
            };
        };

        const ensureSessionId = async (): Promise<string> => {
            if (sidRef.current) return sidRef.current;
            if (resolvedSessionId) {
                sidRef.current = resolvedSessionId;
                return resolvedSessionId;
            }

            const sid = await api.createSession(aborter.signal);
            if (!sid) throw new Error('Server did not return session_id');

            // Inform parent so it can persist/store as it sees fit
            onSessionCreated?.(sid);

            // Keep our internal view so we can connect immediately
            setResolvedSessionId(sid);
            sidRef.current = sid;
            return sid;
        };

        (async () => {
            try {
                const sid = await ensureSessionId();
                if (!abortedRef.current) connect(sid);
            } catch (e) {
                if (!abortedRef.current && !(e instanceof DOMException && e.name === 'AbortError')) {
                    console.error(e);
                }
            }
        })();

        return () => {
            abortedRef.current = true;
            aborter.abort();

            if (reconnectTimerRef.current !== null) {
                clearTimeout(reconnectTimerRef.current);
                reconnectTimerRef.current = null;
            }
            try {
                wsRef.current?.close();
            } catch {
                /**/
            }
            try {
                decoderRef.current?.close();
            } catch {
                /**/
            }
        };

        // `tryConfigure` and `onAccessUnit` read only from refs and are intentionally stable.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [api]);

    const reportSize = useCallback(
        async (width: number, height: number) => {
            const sid = sidRef.current;
            if (!sid) return;
            api.setResolution(sid, width, height);
        },
        [api],
    );

    const reportZoom = useCallback(
        async (startX: number, startY: number, width: number, height: number) => {
            const native_aspect = sourceWidth / sourceHeight;
            const aspect = currentWidth / currentHeight;

            let x_pad = currentCropStartX;
            let y_pad = currentCropStartY;
            let scale = 0;

            if (native_aspect >= aspect) {
                scale = currentWidth / currentCropWidth;
                x_pad = currentCropStartX;
                y_pad = currentCropStartY - Math.floor(paddingHeight / (2 * scale));
            } else if (native_aspect < aspect) {
                scale = currentHeight / currentCropHeight;
                x_pad = currentCropStartX - Math.floor(paddingWidth / (2 * scale));
                y_pad = currentCropStartY;
            }

            if (width < 0) {
                startX = startX + width;
                width = -1 * width;
            }
            if (height < 0) {
                startY = startY + height;
                height = -1 * height;
            }

            let x = 0,
                y = 0;

            let cropWidth = 0,
                cropHeight = 0;

            x = x_pad + Math.floor(startX / scale);
            y = y_pad + Math.floor(startY / scale);
            x = Math.max(x, 0);
            y = Math.max(y, 0);

            cropWidth = Math.floor(width / scale);
            cropHeight = Math.floor(height / scale);

            if (cropWidth == 0 || cropHeight == 0) {
                return;
            }

            const sid = sidRef.current;
            if (!sid) return;
            await api.setCrop(sid, {
                x,
                y,
                width: cropWidth,
                height: cropHeight,
            });
        },
        [
            api,
            sourceWidth,
            sourceHeight,
            currentWidth,
            currentHeight,
            paddingWidth,
            paddingHeight,
            currentCropHeight,
            currentCropWidth,
            currentCropStartX,
            currentCropStartY,
        ],
    );

    const reportDrag = useCallback(
        async (totalX: number, totalY: number, deltaX: number, deltaY: number, active: boolean) => {
            if (!active) {
                const sid = sidRef.current;
                if (!sid) return;

                const crop_response = await api.getCrop(sid);

                const {
                    x: currentCropX,
                    y: currentCropY,
                    width: currentCropWidth,
                    height: currentCropHeight,
                } = crop_response ?? {
                    x: 0,
                    y: 0,
                    width: sourceWidth,
                    height: sourceHeight,
                };

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

                await api.setCrop(sid, {
                    x,
                    y,
                    width: currentCropWidth,
                    height: currentCropHeight,
                });
            }
        },
        [api, sourceWidth, sourceHeight, currentWidth, currentHeight],
    );

    const clearZoom = useCallback(async () => {
        const sid = sidRef.current;
        if (!sid) return;
        api.clearCrop(sid);
    }, [api]);

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

    return <ImageContext.Provider value={contextValue}>{children}</ImageContext.Provider>;
};
