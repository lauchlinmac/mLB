export function startLiveFeed(dispatch) {
  let ws;

  const send = (event) =>
    dispatch({ type: "PITCH_EVENT", payload: event });

  try {
    ws = new WebSocket("wss://your-api/live");

    ws.onmessage = (msg) => {
      const e = JSON.parse(msg.data);

      send({
        batterId: e.batterId,
        batterName: e.batterName,
        batterTeam: e.batterTeam,
        result: e.result,
        rbi: e.rbi,

        // 🎯 NEW ESPN DATA
        x: e.x,   // 0–100 strike zone horizontal
        y: e.y,   // 0–100 vertical location
        inning: e.inning,
        homeScore: e.homeScore,
        awayScore: e.awayScore
      });
    };

  } catch {
    console.warn("WS failed");
  }

  return {
    close: () => ws?.close()
  };
}
