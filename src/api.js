const BASE = "https://statsapi.mlb.com/api/v1";

/* =========================
   📅 SCHEDULE
========================= */
export async function getScheduleByDate(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);

  const date = d.toISOString().split("T")[0];

  const res = await fetch(
    `${BASE}/schedule?sportId=1&date=${date}`
  );

  const data = await res.json();
  return data.dates?.[0]?.games || [];
}

/* =========================
   📊 BOX SCORE DATA
========================= */
export async function getBoxScore(gamePk) {
  const res = await fetch(
    `${BASE}/game/${gamePk}/boxscore`
  );

  return await res.json();
}
export function formatGameTime(game) {
  if (!game?.gameDate) return "TBD";

  const date = new Date(game.gameDate);

  // if invalid date fallback
  if (isNaN(date.getTime())) return "TBD";

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });
}
export function getGameDisplayTime(game) {
  if (!game?.gameDate) return "TBD";

  const now = new Date();
  const start = new Date(game.gameDate);

  if (start > now) {
    return `Starts ${formatGameTime(game)}`;
  }

  return formatGameTime(game);
}
