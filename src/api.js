const BASE_URL = "https://statsapi.mlb.com/api/v1";

// Get today's schedule
export async function fetchTodayGames() {
  try {
    const res = await fetch(`${BASE_URL}/schedule?sportId=1`);
    const data = await res.json();
    return data?.dates?.[0]?.games || [];
  } catch (err) {
    console.error("Schedule error:", err);
    return [];
  }
}

// Validate a game feed (avoids 404)
export async function fetchValidGameFeed(gamePk) {
  try {
    const res = await fetch(
      `${BASE_URL}/game/${gamePk}/feed/live`
    );

    if (!res.ok) return null;

    const data = await res.json();

    // Must have core fields
    if (!data?.gameData || !data?.liveData) return null;

    return data;
  } catch {
    return null;
  }
}
