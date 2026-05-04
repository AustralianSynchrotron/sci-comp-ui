import { type Crop, type H264Api, DEFAULT_RESOLUTION } from './h264-api';

export function h264FetchApi(url: string): H264Api {
    /**
     * Function to strip http://, https://, etc., protocols from a URL string.
     *
     * @param {string} url Url string to strip protocol from
     * @return {string} Url string without protocol
     */
    const stripUrlProtocol = (url: string): string => {
        try {
            const { host, pathname, search, hash } = new URL(url);
            return `${host}${pathname}${search}${hash}`;
        } catch {
            // Just return the OG full URL string if the param was unable to be turned into a React-compliant URL() object
            return url;
        }
    };

    const noProtocolUrl = stripUrlProtocol(url);

    const apiUrl = url + '/api';

    const websocketProtocol = new URL(url).protocol === 'https:' ? 'wss://' : 'ws://';
    const websocketUrl = websocketProtocol + noProtocolUrl + '/ws';

    return {
        async createSession(signal) {
            const res = await fetch(apiUrl + '/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: signal,
                body: JSON.stringify({
                    colour_mapping: 'none',
                    crop: null,
                    resolution: {
                        width: DEFAULT_RESOLUTION.width,
                        height: DEFAULT_RESOLUTION.height,
                    },
                }),
            });
            if (!res.ok) throw new Error(`Failed to create API session: ${res.status} ${res.statusText}`);

            const data = await res.json();
            const sid = data.id as string;
            if (!sid) throw new Error('Failed to return API session_id');
            return String(sid);
        },
        async getSourceResolution(signal?: AbortSignal) {
            const res = await fetch(apiUrl + '/resolution', {
                method: 'GET',
                signal: signal,
            });
            if (!res.ok) throw new Error(`Failed to get resolution. Check if an encoder is running.`);

            const data = await res.json();
            return {
                width: data.source_width,
                height: data.source_height,
            };
        },
        async getSessionResolution(sessionId: string, signal?: AbortSignal) {
            const res = await fetch(apiUrl + '/sessions/' + sessionId + '/resolution', {
                method: 'GET',
                signal: signal,
            });
            if (!res.ok) throw new Error(`Failed to get resolution.`);
            const data = await res.json();
            return {
                width: data.source_width,
                height: data.source_height,
                paddingWidth: data.padding_width,
                paddingHeight: data.padding_height,
            };
        },
        async setResolution(sessionId: string, width: number, height: number, signal?: AbortSignal) {
            const res = await fetch(apiUrl + '/sessions/' + sessionId + '/resolution', {
                method: 'POST',
                signal: signal,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ width, height }),
            });
            if (!res.ok) throw new Error(`Failed to set resolution: ${res.status} ${res.statusText}`);
            return;
        },
        async getCrop(sessionId: string, signal?: AbortSignal) {
            const crop_response = await fetch(apiUrl + '/sessions/' + sessionId + '/crop', {
                method: 'GET',
                signal: signal,
            });
            if (!crop_response.ok)
                throw new Error(`Failed to get current crop: ${crop_response.status} ${crop_response.statusText}`);
            const crop: Crop = await crop_response.json();
            return crop;
        },
        async setCrop(sessionID: string, crop: Crop, signal?: AbortSignal) {
            const res = await fetch(apiUrl + '/sessions/' + sessionID + '/crop', {
                method: 'POST',
                signal: signal,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(crop),
            });
            if (!res.ok) throw new Error(`Failed to set crop: ${res.status} ${res.statusText}`);
            return;
        },
        async clearCrop(sessionId: string, signal?: AbortSignal) {
            const res = await fetch(apiUrl + '/sessions/' + sessionId + '/crop', {
                method: 'DELETE',
                signal: signal,
            });
            if (!res.ok) throw new Error(`Failed to clear crop: ${res.status} ${res.statusText}`);
        },
        wsFactory(sessionId) {
            return new WebSocket(websocketUrl + '?session_id=' + sessionId);
        },
    };
}
