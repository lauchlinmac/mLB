const BASE_URL = "https://statsapi.mlb.com/api/v1";

// 🔥 Use a proxy fallback if direct fails
async function safeFetch(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error("Direct failed");

    return await res.json();
  } catch (err) {
    console.warn("Direct fetch failed, using proxy...");

    // fallback proxy
    const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

    const res = await fetch(proxy);

    if (!res.ok) {
      throw new Error("Proxy also failed");
    }

    return await res.json();
  }
}

export async function fetchTodayGames() {
  try {
    const data = await safeFetch(
      `${BASE_URL}/schedule?sportId=1`
    );

    return data?.dates?.[0]?.games || [];
  } catch (err) {
    console.error("Schedule error:", err);
    return [];
  }
}

export async function fetchGameData(gamePk) {
  try {
    return await safeFetch(
      `${BASE_URL}/game/${gamePk}/feed/live`
    );
  } catch (err) {
    console.error("Game fetch error:", err);
    return null;
  }
}
