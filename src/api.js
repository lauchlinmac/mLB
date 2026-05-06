// src/API.js

const TODAY_URL =
  "https://statsapi.mlb.com/api/v1/schedule?sportId=1&hydrate=team,linescore";

export async function fetchGames() {
  try {
    const response = await fetch(TODAY_URL);

    if (!response.ok) {
      throw new Error(`Schedule Error ${response.status}`);
    }

    const data = await response.json();

    return data?.dates?.[0]?.games || [];
  } catch (err) {
    console.error("FETCH GAMES ERROR:", err);
    return [];
  }
}

export async function fetchLiveGame(gamePk) {
  try {
    const response = await fetch(
      `https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live`
    );

    if (!response.ok) {
      throw new Error(`Live Feed Error ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("FETCH LIVE GAME ERROR:", err);
    return null;
  }
}
