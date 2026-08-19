import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';

import { ImageContext, type PlotDataset } from './image-context';

import { type H264Api, DEFAULT_RESOLUTION } from './h264-api';

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
    const [apiUrl, setApiUrl] = useState<string>('');
    const [imageBitmap, setImageBitmap] = useState<ImageBitmap | null>(null);
    const [sourceWidth, setSourceWidth] = useState<number>(DEFAULT_RESOLUTION.width);
    const [sourceHeight, setSourceHeight] = useState<number>(DEFAULT_RESOLUTION.height);
    const [currentWidth, setCurrentWidth] = useState<number>(DEFAULT_RESOLUTION.width);
    const [currentHeight, setCurrentHeight] = useState<number>(DEFAULT_RESOLUTION.height);
    const [currentCropHeight, setCurrentCropHeight] = useState<number>(DEFAULT_RESOLUTION.height);
    const [currentCropWidth, setCurrentCropWidth] = useState<number>(DEFAULT_RESOLUTION.width);
    const [currentCropStartX, setCurrentCropStartX] = useState<number>(0);
    const [currentCropStartY, setCurrentCropStartY] = useState<number>(0);
    const [paddingWidth, setPaddingWidth] = useState<number>(0);
    const [paddingHeight, setPaddingHeight] = useState<number>(0);
    const [timestamp, setTimestamp] = useState<Date | undefined>(undefined);
    const [timestampDisabled, setTimestampDisabled] = useState<boolean>(false);
    const [plotData, setPlotData] = useState<PlotDataset>({x: [], y: [], e: []});

    // ==================
    // Refs
    // ==================
    const wsRef = useRef<WebSocket | null>(null);
    const dimsRef = useRef<{ width: number; height: number }>({
        width: DEFAULT_RESOLUTION.width,
        height: DEFAULT_RESOLUTION.height,
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

    // UUIDs used by custom SEI metadata.
    const TIMESTAMP_UUID = new Uint8Array([
        0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x11, 0x22, 0x33, 0x44,
        0x55, 0x66, 0x77, 0x88,
    ]);
    const REDUCTION_UUID = new Uint8Array([
        0x88, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0xf0, 0xde, 0xbc, 0x9a,
        0x78, 0x56, 0x34, 0x12,
    ]);


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

    const parseSeiMetadataString = (metadataString: string) => {
        const metadata: Record<string, string> = {};
        const pairs = metadataString.split(/[,;\n]+/);
        for (const pair of pairs) {
            const trimmed = pair.trim();
            if (!trimmed || !trimmed.includes('=')) continue;
            const [key, ...rest] = trimmed.split('=');
            const value = rest.join('=');
            if (!key) continue;
            metadata[key.trim()] = value.trim();
        }
        return metadata;
    };

    const removeEmulationPreventionBytes = (bytes: Uint8Array) => {
    /* 0x03 bytes are inserted into sequences of bytes that might be mistaken for start codes.
        This is handled by the encoder/decoder for the video data, but has to be handled manually
        For the custom header data. This function removes these "Emulation Prevention Bytes"
    */

        const out = [];
        for (let i = 0; i < bytes.length; i++) {
            if (
            i >= 2 &&
            bytes[i] === 0x03 &&
            bytes[i - 1] === 0x00 &&
            bytes[i - 2] === 0x00
            ) {
            continue;
            }
            out.push(bytes[i]);
        }
        return new Uint8Array(out);
    };


    const uuidMatches = (actual: Uint8Array, expected: Uint8Array): boolean => {
        if (actual.length < 16) return false;
        for (let i = 0; i < 16; i++) {
            if (actual[i] !== expected[i]) {
            return false;
            }
        }
        return true;
    }


    // Decode SEI metadata from SEI NAL unit
    const decodeSeiMetadata = (nal: Uint8Array) => {
        try {

            const rbsp = removeEmulationPreventionBytes(nal.subarray(1));
            let offset = 0;

            // Parse payload_type (variable length, VLC encoding)
            let payloadType = 0;
            while (offset < rbsp.length) {
                const byte = rbsp[offset++];
                payloadType += byte;
                if (byte !== 0xff) break;
            }
            
            // Parse payload_size (variable length, VLC encoding)
            let payloadSize = 0;
            while (offset < rbsp.length) {
                const byte = rbsp[offset++];
                payloadSize += byte;
                if (byte !== 0xff) break;
            }
            
            // Check bounds
            if (offset + payloadSize > nal.length) {
                console.debug('SEI: payload size', payloadSize, 'exceeds available data');
                return;
            }
            
            // Extract payload data
            const payloadData = rbsp.subarray(offset, offset + payloadSize);
            
            if (payloadType !== 5 || payloadData.length <= 16) {
                return;
              }
            
            // Process unregistered SEI (type 5)
            
            const uuid = payloadData.subarray(0, 16);
            
            const data = payloadData.subarray(16);
              if (uuidMatches(uuid, TIMESTAMP_UUID)) {
                const metadataString = new TextDecoder().decode(data);
                // Filter out x264 encoder info
                if (!metadataString.includes('x264') && !metadataString.includes('x265')) {
                    const metadata = parseSeiMetadataString(metadataString);
                    if ('timestamp' in metadata) {
                        const parsed = new Date(metadata.timestamp);
                        if (!Number.isNaN(parsed.getTime())) {
                            setTimestamp(parsed);
                        }
                    }
                }
            } else if (uuidMatches(uuid, REDUCTION_UUID)){
                const reducedBytes = data;
                const values = new Float32Array(reducedBytes.slice().buffer);

                const n = values.length / 3;
                setPlotData({
                    x: Array.from(values.subarray(0, n)),
                    y: Array.from(values.subarray(n, 2 * n)),
                    e: Array.from(values.subarray(2 * n)),
                });
            }
        } catch (e) {
            console.warn('Failed to decode SEI metadata:', e);
        }
    };

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
            else if (t === 6 && !timestampDisabled) decodeSeiMetadata(n); // Process SEI metadata
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
                            setTimestampDisabled(meta.sei_timestamp_disabled);

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
                if (apiUrl === api.getApiUrl() && !abortedRef.current && sidRef.current) {
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
            if (apiUrl === api.getApiUrl()) {
                // Reuse session ID if requested API URL has not changed
                if (sidRef.current) return sidRef.current;
                if (resolvedSessionId) {
                    sidRef.current = resolvedSessionId;
                    return resolvedSessionId;
                }
            }

            setApiUrl(api.getApiUrl());
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
        async (totalX: number, totalY: number, active: boolean) => {
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
        timestamp: timestampDisabled ? undefined : timestamp,
        reportSize,
        reportZoom,
        reportDrag,
        clearZoom,
        plotData,
      }),
      [
        imageBitmap,
        timestamp,
        reportSize,
        reportZoom,
        reportDrag,
        clearZoom,
        timestampDisabled,
        plotData,
      ],
    );

    return <ImageContext.Provider value={contextValue}>{children}</ImageContext.Provider>;
};
