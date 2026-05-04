export type Crop = { x: number; y: number; width: number; height: number };

export type Resolution = { width: number; height: number };

export type SessionResolution = Resolution & {
    paddingWidth: number;
    paddingHeight: number;
};

export const DEFAULT_RESOLUTION: Resolution = {
    width: 1024,
    height: 1024,
};

export const COLOUR_MAPPING_OPTIONS: string[] = [
    'magma',
    'inferno',
    'plasma',
    'viridis',
    'turbo',
    'range1',
    'range2',
    'shadows',
    'highlights',
    'solar',
    'nominal',
    'preferred',
    'total',
    'spectral',
    'cool',
    'heat',
    'fiery',
    'blues',
    'green',
    'helix',
];

export type ColourMappingOptionsKey = (typeof COLOUR_MAPPING_OPTIONS)[number];

export interface H264Api {
    /** Create a session if needed. Return the session ID. */
    createSession: (signal?: AbortSignal) => Promise<string>;

    /** Get source resolution - this only works if there is an active encoder */
    getSourceResolution: () => Promise<Resolution>;

    /** Get session resolution */
    getSessionResolution: (sessionId: string, signal?: AbortSignal) => Promise<SessionResolution>;

    /** Resolution of the view (stream == display by design). */
    setResolution: (sessionId: string, width: number, height: number, signal?: AbortSignal) => Promise<void>;

    /** Get current crop box. */
    getCrop: (sessionId: string, signal?: AbortSignal) => Promise<Crop>;

    /** Set crop box. */
    setCrop: (sessionId: string, crop: Crop, signal?: AbortSignal) => Promise<void>;

    /** Clear crop. */
    clearCrop: (sessionId: string, signal?: AbortSignal) => Promise<void>;

    /** Get current colour mapping. */
    getColourMapping: (sessionId: string, signal?: AbortSignal) => Promise<ColourMappingOptionsKey>;

    /** Set colour mapping. */
    setColourMapping: (sessionId: string, colour: ColourMappingOptionsKey, signal?: AbortSignal) => Promise<void>;

    /** Clear colour mapping. */
    clearColourMapping: (sessionId: string, signal?: AbortSignal) => Promise<void>;

    /** Optional: customize WebSocket construction (auth headers, subprotocols, polyfills). */
    wsFactory: (sessionId: string) => WebSocket;
}
