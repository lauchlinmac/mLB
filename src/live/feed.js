import { normalizePitchEvent } from "./normalize";

export function startLiveFeed(dispatch) {
  let ws;
  let interval;

  const emit = (event) => {
    dispatch({ type: "PITCH_EVENT", payload: event });
  };

  // --- WebSocket attempt ---
  try {
    ws = new WebSocket("wss://your-api/live");

    ws.onmessage = (msg) => {
      try {
        const raw = JSON.parse(msg.data);
        emit(normalizePitchEvent(raw));
      } catch (e) {
        console.error("Bad WS event", e);
      }
    };

    ws.onerror = () => {
      console.warn("WS failed → switching to polling");
      ws.close();
      startPolling();
    };
  } catch {
    startPolling();
  }

  // --- fallback polling ---
  function startPolling() {
    interval = setInterval(async () => {
      try {
        const res = await fetch("/api/live-pitches");
        const data = await res.json();

        if (Array.isArray(data)) {
          data.forEach(e => emit(normalizePitchEvent(e)));
        }
      } catch (err) {
        console.error("Polling error", err);
      }
    }, 2000);
  }

  return {
    close: () => {
      ws?.close();
      clearInterval(interval);
    }
  };
}
