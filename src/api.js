const BASE = "https://statsapi.mlb.com/api/v1";

// 📅 Get today's games
export async function getSchedule() {
  const today = new Date().toISOString().split("T")[0];

  const res = await fetch(
    `${BASE}/schedule?sportId=1&date=${today}`
  );

  const data = await res.json();
  return data.dates?.[0]?.games || [];
}

// 📊 Standings
export async function getStandings() {
  const res = await fetch(
    `${BASE}/standings?leagueId=103,104&season=2026`
  );

  const data = await res.json();
  return data.records || [];
}

/* =========================
   ⏰ NEW: GAME TIME HELPERS
========================= */

// formatted time (7:05 PM)
export function formatGameTime(game) {
  if (!game?.gameDate) return "";

  return new Date(game.gameDate).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });
}

// countdown until first pitch
export function timeUntilGame(game) {
  if (!game?.gameDate) return "";

  const now = new Date();
  const start = new Date(game.gameDate);
  const diff = start - now;

  if (diff <= 0) {
    return game.status?.detailedState || "Live";
  }

  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);

  if (hrs > 0) return `Starts in ${hrs}h ${mins % 60}m`;
  return `Starts in ${mins} min`;
}
