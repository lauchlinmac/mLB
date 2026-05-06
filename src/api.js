const BASE_URL = "https://statsapi.mlb.com/api/v1";

export async function fetchGameData(gamePk) {
  try {
    const res = await fetch(
      `${BASE_URL}/game/${gamePk}/feed/live`
    );

    if (!res.ok) {
      throw new Error("API failed");
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.error("API error:", err);
    return null;
  }
}
