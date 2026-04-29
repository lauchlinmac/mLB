import { applyPitchEvent, getLiveState } from "./pitchEngine";

export function connectLiveFeed(setState) {
  const ws = new WebSocket("wss://your-api/live");

  ws.onmessage = (msg) => {
    try {
      const event = JSON.parse(msg.data);

      applyPitchEvent(event);

      setState({ ...getLiveState() });
    } catch (err) {
      console.error("Live feed error:", err);
    }
  };

  ws.onerror = (err) => {
    console.error("WebSocket error:", err);
  };

  return ws;
}
