const BASE = "https://statsapi.mlb.com/api/v1";

/* =========================
   📅 DATE HELPERS
========================= */

function getDate(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split("T")[0];
}

/* =========================
   ⚾ GAMES BY DATE
========================= */

export async function getScheduleByDate(offset = 0) {
  const date = getDate(offset);

  const res = await fetch(
    `${BASE}/schedule?sportId=1&date=${date}`
  );

  const data = await res.json();
  return data.dates?.[0]?.games || [];
}

/* =========================
   📊 STANDINGS
========================= */

export async function getStandings() {
  const res = await fetch(
    `${BASE}/standings?leagueId=103,104&season=2026`
  );

  const data = await res.json();
  return data.records || [];
}
