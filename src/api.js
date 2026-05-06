const BASE_URL = "https://statsapi.mlb.com/api/v1";

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

// ✅ Try fetching a game safely
export async function tryFetchGame(gamePk) {
  try {
    const res = await fetch(
      `${BASE_URL}/game/${gamePk}/feed/live`
    );

    if (!res.ok) return null;

    const data = await res.json();

    // must have liveData to be valid
    if (!data?.liveData) return null;

    return data;
  } catch {
    return null;
  }
}
