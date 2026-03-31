import { type Crop, type H264Api } from "./h264-api";

export function h264FetchApi(url: string): H264Api {
  return {
    async createSession(signal) {
      const res = await fetch("http://" + url + "/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: signal,
        body: JSON.stringify({
          colour_mapping: "none",
          crop: null,
          resolution: {
            width: 1024,
            height: 1024,
          },
        }),
      });
      if (!res.ok)
        throw new Error(
          `Failed to create session: ${res.status} ${res.statusText}`,
        );

      const body = await res.json();
      const sid = body.id as string;
      if (!sid) throw new Error("Server did not return session_id");
      return String(sid);
    },
    async getSourceResolution(signal?: AbortSignal) {
      const res = await fetch("http://" + url + "/api/resolution", {
        method: "GET",
        signal: signal,
      });
      if (!res.ok)
        throw new Error(
          `Failed to get resolution. Is there an encoder running?`,
        );
      const data = await res.json();
      return {
        width: data.source_width,
        height: data.source_height,
      };
    },
    async getSessionResolution(sessionId: string, signal?: AbortSignal) {
      const res = await fetch("http://" + url + "/api/sessions/" + sessionId + "/resolution", {
        method: "GET",
        signal: signal,
      });
      if (!res.ok)
        throw new Error(
          `Failed to get resolution.`,
        );
      const data = await res.json();
      return {
        width: data.source_width,
        height: data.source_height,
        paddingWidth: data.padding_width,
        paddingHeight: data.padding_height,
      };
    },
    async setResolution(
      sessionId: string,
      width: number,
      height: number,
      signal?: AbortSignal,
    ) {
      const res = await fetch(
        "http://" + url + "/api/sessions/" + sessionId + "/resolution",
        {
          method: "POST",
          signal: signal,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ width, height }),
        },
      );
      if (!res.ok)
        throw new Error(
          `Failed to set resolution: ${res.status} ${res.statusText}`,
        );
      return;
    },
    async getCrop(sessionId: string, signal?: AbortSignal) {
      const crop_response = await fetch(
        "http://" + url + "/api/sessions/" + sessionId + "/crop",
        {
          method: "GET",
          signal: signal,
        },
      );
      if (!crop_response.ok)
        throw new Error(
          `Failed to get current crop: ${crop_response.status} ${crop_response.statusText}`,
        );
      const crop: Crop = await crop_response.json();
      return crop;
    },
    async setCrop(sessionID: string, crop: Crop, signal?: AbortSignal) {
      const res = await fetch(
        "http://" + url + "/api/sessions/" + sessionID + "/crop",
        {
          method: "POST",
          signal: signal,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(crop),
        },
      );
      if (!res.ok)
        throw new Error(`Failed to set crop: ${res.status} ${res.statusText}`);
      return;
    },
    async clearCrop(sessionId: string, signal?: AbortSignal) {
      const res = await fetch(
        "http://" + url + "/api/sessions/" + sessionId + "/crop",
        {
          method: "DELETE",
          signal: signal,
        },
      );
      if (!res.ok)
        throw new Error(
          `Failed to clear crop: ${res.status} ${res.statusText}`,
        );
    },
    wsFactory(sessionId) {
      return new WebSocket("ws://" + url + "/ws?session_id=" + sessionId);
    },
  };
}
