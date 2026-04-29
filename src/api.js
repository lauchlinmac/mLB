// src/api.js

function getDateOffset(days = 0) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export async function fetchSchedule(mode = "today") {
  let offset = 0;
  if (mode === "prev") offset = -1;
  if (mode === "next") offset = 1;

  const date = getDateOffset(offset);

  try {
    const res = await fetch(
      `https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${date}&hydrate=linescore,team`
    );

    const data = await res.json();

    if (!data.dates || !data.dates.length) return [];

    return data.dates[0].games.map((g) => ({
      id: g.gamePk,
      status: g.status?.detailedState || "Scheduled",
      away: g.teams.away.team.name,
      home: g.teams.home.team.name,
      awayScore: g.teams.away.score ?? 0,
      homeScore: g.teams.home.score ?? 0,
      inning: g.linescore?.currentInningOrdinal || "",
      inningState: g.linescore?.inningState || "",
      venue: g.venue?.name || "",
      gameTime: g.gameDate
        ? new Date(g.gameDate).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })
        : "",
      outs: g.linescore?.outs ?? 0,
      balls: g.linescore?.balls ?? 0,
      strikes: g.linescore?.strikes ?? 0,
    }));
  } catch (err) {
    console.error("Schedule fetch failed:", err);
    return [];
  }
}
