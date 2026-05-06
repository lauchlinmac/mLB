const BASE_URL = "https://statsapi.mlb.com/api/v1";

// ✅ Get today's games first
export async function fetchTodayGames() {
  try {
    const res = await fetch(
      `${BASE_URL}/schedule?sportId=1`
    );
    const data = await res.json();

    const games = data?.dates?.[0]?.games || [];

    return games;
  } catch (err) {
    console.error("Schedule fetch error:", err);
    return [];
  }
}

// ✅ Then get live game data
export async function fetchGameData(gamePk) {
  try {
    const res = await fetch(
      `${BASE_URL}/game/${gamePk}/feed/live`
    );

    if (!res.ok) throw new Error("Bad response");

    return await res.json();
  } catch (err) {
    console.error("Game fetch error:", err);
    return null;
  }
}
