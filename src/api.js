export async function fetchGames() {
  try {
    const today = new Date().toISOString().split("T")[0];

    const res = await fetch(
      `https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}&hydrate=linescore,team`
    );

    const data = await res.json();

    if (!data.dates || data.dates.length === 0) return [];

    return data.dates[0].games.map((game) => ({
      id: game.gamePk,
      status: game.status.detailedState,
      away: game.teams.away.team.name,
      home: game.teams.home.team.name,
      awayScore: game.teams.away.score ?? 0,
      homeScore: game.teams.home.score ?? 0,
      inning: game.linescore?.currentInningOrdinal || "",
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}
