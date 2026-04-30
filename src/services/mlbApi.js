export async function fetchLiveGame() {
  const res = await fetch(
    "https://statsapi.mlb.com/api/v1.1/game/changes?updatedSince=1"
  );
  const data = await res.json();
  return data;
}

// Placeholder (you will wire to real gamePk later)
export async function fetchGameFeed(gamePk) {
  const res = await fetch(
    `https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live`
  );
  return await res.json();
}
