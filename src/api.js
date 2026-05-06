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

export async function fetchGameData(gamePk) {
  try {
    const res = await fetch(
      `${BASE_URL}/game/${gamePk}/feed/live`
    );

    if (!res.ok) {
      console.error("Bad response:", res.status);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}
