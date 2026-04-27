const BASE = "https://statsapi.mlb.com/api/v1";

// 📊 Live schedule
export async function getSchedule() {
  const today = new Date().toISOString().split("T")[0];

  const res = await fetch(
    `${BASE}/schedule?sportId=1&date=${today}`
  );

  const data = await res.json();
  return data.dates?.[0]?.games || [];
}

// 🧠 Standings (AL / NL)
export async function getStandings() {
  const res = await fetch(
    `${BASE}/standings?leagueId=103,104&season=2026`
  );

  const data = await res.json();
  return data.records || [];
}
