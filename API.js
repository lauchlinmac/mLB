const SCHEDULE_URL =
  "https://statsapi.mlb.com/api/v1/schedule?sportId=1";

export async function fetchGames() {
  try {
    const res = await fetch(SCHEDULE_URL);

    if (!res.ok) {
      throw new Error("Failed schedule fetch");
    }

    const data = await res.json();

    return data?.dates?.[0]?.games || [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function fetchLiveGame(gamePk) {
  try {
    const res = await fetch(
      `https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live`
    );

    if (!res.ok) {
      throw new Error("Failed live fetch");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
