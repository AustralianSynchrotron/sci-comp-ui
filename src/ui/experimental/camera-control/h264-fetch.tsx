import {
  type H264Api,
  type Crop,
  type DataIntensity,
  type DataScaling,
  type ColourMappingOptionsKey,
  DEFAULT_RESOLUTION,
  DEFAULT_SCALING,
  DEFAULT_COLOUR_MAPPING,
} from "./h264-api";

export function h264FetchApi(url: string): H264Api {
  let baseUrl: URL | null = null;

  try {
    baseUrl = new URL(url);
  } catch (e) {
    throw new Error(`Failed to create URL from string, ${url}: ${e}`);
  }

  const apiUrl = new URL(baseUrl.href);
  apiUrl.pathname = apiUrl.pathname.replace(/\/$/, "") + "/api";

  const generateWebsocketUrl = (url: URL): string => {
    const { host, pathname, search, hash } = url;
    const noProtocolUrl = `${host}${pathname}${search}${hash}`; // Strip http://, https:// protocol from URL
    const protocol = url.protocol === "https:" ? "wss://" : "ws://"; // Add the respective ws://, wss:// protocol
    return protocol + noProtocolUrl.replace(/\/$/, "") + "/ws";
  };

  const websocketUrl = generateWebsocketUrl(baseUrl);

  return {
    getApiUrl() {
      return apiUrl.href;
    },
    async createSession(signal) {
      const res = await fetch(apiUrl + "/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: signal,
        body: JSON.stringify({
          colour_mapping: "none",
          crop: null,
          resolution: {
            width: DEFAULT_RESOLUTION.width,
            height: DEFAULT_RESOLUTION.height,
          },
        }),
      });
      if (!res.ok)
        throw new Error(
          `Failed to create API session: ${res.status} ${res.statusText}`
        );

      const data = await res.json();
      const sid = data.id as string;
      if (!sid) throw new Error("Failed to return API session_id");
      return String(sid);
    },
    async getSourceResolution(signal?: AbortSignal) {
      const res = await fetch(apiUrl + "/resolution", {
        method: "GET",
        signal: signal,
      });
      if (!res.ok)
        throw new Error(
          `Failed to get resolution. Check if an encoder is running.`
        );

      const data = await res.json();
      return {
        width: data.source_width,
        height: data.source_height,
      };
    },
    async getSessionResolution(sessionId: string, signal?: AbortSignal) {
      const res = await fetch(
        apiUrl + "/sessions/" + sessionId + "/resolution",
        {
          method: "GET",
          signal: signal,
        }
      );
      if (!res.ok) throw new Error(`Failed to get resolution.`);

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
      signal?: AbortSignal
    ) {
      const res = await fetch(
        apiUrl + "/sessions/" + sessionId + "/resolution",
        {
          method: "POST",
          signal: signal,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ width, height }),
        }
      );
      if (!res.ok)
        throw new Error(
          `Failed to set resolution: ${res.status} ${res.statusText}`
        );
      return;
    },
    async getCrop(sessionId: string, signal?: AbortSignal) {
      const res = await fetch(apiUrl + "/sessions/" + sessionId + "/crop", {
        method: "GET",
        signal: signal,
      });
      if (!res.ok)
        throw new Error(
          `Failed to get current crop: ${res.status} ${res.statusText}`
        );
      const crop: Crop = await res.json();
      return crop;
    },
    async setCrop(sessionId: string, crop: Crop, signal?: AbortSignal) {
      const res = await fetch(apiUrl + "/sessions/" + sessionId + "/crop", {
        method: "POST",
        signal: signal,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(crop),
      });
      if (!res.ok)
        throw new Error(`Failed to set crop: ${res.status} ${res.statusText}`);
      return;
    },
    async clearCrop(sessionId: string, signal?: AbortSignal) {
      const res = await fetch(apiUrl + "/sessions/" + sessionId + "/crop", {
        method: "DELETE",
        signal: signal,
      });
      if (!res.ok)
        throw new Error(
          `Failed to clear crop: ${res.status} ${res.statusText}`
        );
    },
    async getColourMapping(sessionId: string, signal?: AbortSignal) {
      const res = await fetch(
        apiUrl + "/sessions/" + sessionId + "/colour_mapping",
        {
          method: "GET",
          signal: signal,
        }
      );
      if (!res.ok)
        throw new Error(
          `Failed to get current colour mapping: ${res.status} ${res.statusText}`
        );
      const json = await res.json();

      if (!("colour_mapping" in json))
        throw new Error(
          `Failed to get current colour mapping: ${JSON.stringify(json)}`
        );
      const colourMap: ColourMappingOptionsKey = json["colour_mapping"];
      return colourMap;
    },
    async setColourMapping(
      sessionId: string,
      colour: ColourMappingOptionsKey,
      signal?: AbortSignal
    ) {
      const res = await fetch(
        apiUrl + "/sessions/" + sessionId + "/colour_mapping",
        {
          method: "POST",
          signal: signal,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            colour_mapping: colour,
          }),
        }
      );
      if (!res.ok)
        throw new Error(
          `Failed to set colour mapping: ${res.status} ${res.statusText}`
        );
      const json = await res.json();

      if (!("colour_mapping" in json))
        throw new Error(
          `Failed to get newly set colour mapping: ${JSON.stringify(json)}`
        );
      const colourMap: ColourMappingOptionsKey = json["colour_mapping"];

      if (colourMap !== colour)
        throw new Error(
          `Failed to set colour mapping: ${JSON.stringify(json)}`
        );
      return;
    },
    async clearColourMapping(sessionId: string, signal?: AbortSignal) {
      const res = await fetch(
        apiUrl + "/sessions/" + sessionId + "/colour_mapping",
        {
          method: "POST",
          signal: signal,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            colour_mapping: DEFAULT_COLOUR_MAPPING,
          }),
        }
      );
      if (!res.ok)
        throw new Error(
          `Failed to clear colour mapping: ${res.status} ${res.statusText}`
        );
      const json = await res.json();

      if (!("colour_mapping" in json))
        throw new Error(
          `Failed to get newly cleared colour mapping: ${JSON.stringify(json)}`
        );
      const colourMap: ColourMappingOptionsKey = json["colour_mapping"];

      if (colourMap !== DEFAULT_COLOUR_MAPPING)
        throw new Error(
          `Failed to clear colour mapping: ${JSON.stringify(json)}`
        );
      return;
    },
    async getDataIntensity(sessionId: string, signal?: AbortSignal) {
      const res = await fetch(
        apiUrl + "/sessions/" + sessionId + "/data_intensity_range",
        {
          method: "GET",
          signal: signal,
        }
      );
      if (!res.ok)
        throw new Error(
          `Failed to get current data intensity range: ${res.status} ${res.statusText}`
        );
      const json = await res.json();

      if (!("min_intensity" in json) || !("max_intensity" in json))
        throw new Error(
          `Failed to get current data intensity range: ${JSON.stringify(json)}`
        );
      const range: DataIntensity = {
        min: json["min_intensity"],
        max: json["max_intensity"],
      };
      return range;
    },
    async setDataIntensity(
      sessionId: string,
      min: number,
      max: number,
      signal?: AbortSignal
    ) {
      const res = await fetch(
        apiUrl + "/sessions/" + sessionId + "/data_intensity_range",
        {
          method: "POST",
          signal: signal,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            min_intensity: min,
            max_intensity: max,
          }),
        }
      );
      if (!res.ok)
        throw new Error(
          `Failed to set data intensity range: ${res.status} ${res.statusText}`
        );
      const json = await res.json();

      if (!("min_intensity" in json) || !("max_intensity" in json))
        throw new Error(
          `Failed to get newly set data intensity range: ${JSON.stringify(json)}`
        );

      if (json["min_intensity"] !== min || json["max_intensity"] !== max)
        throw new Error(
          `Failed to set data intensity range: ${JSON.stringify(json)}`
        );
      return;
    },
    async clearDataIntensity(sessionId: string, signal?: AbortSignal) {
      const res = await fetch(
        apiUrl + "/sessions/" + sessionId + "/data_intensity_range/reset",
        {
          method: "POST",
          signal: signal,
        }
      );
      if (!res.ok)
        throw new Error(
          `Failed to clear data intensity range: ${res.status} ${res.statusText}`
        );
      const json = await res.json();

      if (!("min_intensity" in json) || !("max_intensity" in json))
        throw new Error(
          `Failed to get current data intensity range: ${JSON.stringify(json)}`
        );
      const range: DataIntensity = {
        min: json["min_intensity"],
        max: json["max_intensity"],
      };
      return range;
    },
    async getDataScaling(sessionId: string, signal?: AbortSignal) {
      const res = await fetch(
        apiUrl + "/sessions/" + sessionId + "/data_scaling_power",
        {
          method: "GET",
          signal: signal,
        }
      );
      if (!res.ok)
        throw new Error(
          `Failed to get current data scaling power ${res.status} ${res.statusText}`
        );
      const scaling: DataScaling = await res.json();
      return scaling;
    },
    async setDataScaling(
      sessionId: string,
      value: number,
      signal?: AbortSignal
    ) {
      const res = await fetch(
        apiUrl + "/sessions/" + sessionId + "/data_scaling_power",
        {
          method: "POST",
          signal: signal,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: value,
          }),
        }
      );
      if (!res.ok)
        throw new Error(
          `Failed to set data scaling power: ${res.status} ${res.statusText}`
        );
      const scaling: DataScaling = await res.json();

      if (scaling.value !== value)
        throw new Error(
          `Failed to set data scaling power ${JSON.stringify(scaling)}`
        );
      return;
    },
    async clearDataScaling(sessionId: string, signal?: AbortSignal) {
      const res = await fetch(
        apiUrl + "/sessions/" + sessionId + "/data_scaling_power",
        {
          method: "POST",
          signal: signal,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(DEFAULT_SCALING),
        }
      );
      if (!res.ok)
        throw new Error(
          `Failed to clear data scaling power ${res.status} ${res.statusText}`
        );
      const scaling: DataScaling = await res.json();

      if (scaling.value !== DEFAULT_SCALING.value)
        throw new Error(
          `Failed to clear data scaling power ${JSON.stringify(scaling)}`
        );
      return;
    },
    wsFactory(sessionId) {
      return new WebSocket(websocketUrl + "?session_id=" + sessionId);
    },
  };
}
