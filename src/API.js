// src/API.js

const BASE = "https://statsapi.mlb.com/api/v1";

export async function fetchGames() {
  try {
    const today = new Date().toISOString().split("T")[0];

    const res = await fetch(
      `${BASE}/schedule?sportId=1&date=${today}&hydrate=linescore,team,flags`
    );

    const data = await res.json();

    return (data.dates?.[0]?.games || []).map((game) => {
      const home = game.teams?.home;
      const away = game.teams?.away;

      const linescore = game.linescore || {};

      return {
        id: game.gamePk,

        status:
          game.status?.detailedState ||
          game.status?.abstractGameState ||
          "Scheduled",

        inning:
          linescore.currentInningOrdinal ||
          "",

        inningState:
          linescore.inningState || "",

        homeTeam: home?.team?.name || "Home",
        awayTeam: away?.team?.name || "Away",

        homeScore:
          typeof home?.score === "number"
            ? home.score
            : 0,

        awayScore:
          typeof away?.score === "number"
            ? away.score
            : 0,

        balls: linescore.balls ?? 0,
        strikes: linescore.strikes ?? 0,
        outs: linescore.outs ?? 0,

        gameState:
          game.status?.abstractGameState || "Preview",

        startTime: game.gameDate,
      };
    });
  } catch (err) {
    console.error("fetchGames failed", err);
    return [];
  }
}
