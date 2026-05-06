// src/API.js

const SCOREBOARD_URL =
  "https://statsapi.mlb.com/api/v1/schedule?sportId=1&hydrate=team,linescore";

export async function fetchGames() {
  try {
    const res = await fetch(SCOREBOARD_URL);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    return data?.dates?.[0]?.games || [];
  } catch (err) {
    console.error("API ERROR:", err);
    return [];
  }
}

export async function fetchLiveGame(gamePk) {
  try {
    const res = await fetch(
      `https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live`
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("LIVE GAME ERROR:", err);
    return null;
  }
}
