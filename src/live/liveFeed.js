import { applyPitchEvent, getLiveState } from "./pitchEngine";

export function connectLiveFeed(setState) {
  let ws;
  let interval;

  const pushState = () => {
    setState(getLiveState());
  };

  // 🔥 Try WebSocket
  try {
    ws = new WebSocket("wss://your-api/live");

    ws.onmessage = (msg) => {
      try {
        const event = JSON.parse(msg.data);
        applyPitchEvent(event);
        pushState();
      } catch (e) {
        console.error("Bad event:", e);
      }
    };

    ws.onerror = () => {
      console.warn("WebSocket failed → switching to polling");
      ws.close();
      startPolling();
    };
  } catch (e) {
    startPolling();
  }

  // 🔥 fallback polling
  function startPolling() {
    interval = setInterval(async () => {
      try {
        const res = await fetch("/api/live-pitches");

        if (!res.ok) return;

        const events = await res.json();

        if (Array.isArray(events)) {
          events.forEach(applyPitchEvent);
          pushState();
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 2500);
  }

  return {
    close: () => {
      ws?.close();
      clearInterval(interval);
    }
  };
}
