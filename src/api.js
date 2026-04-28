// Basic API normalization layer

export async function fetchLiveGames() {
  const res = await fetch("/api/games");
  return res.json();
}

export function normalizePlayerStats(player) {
  return {
    id: player.id,
    name: player.name,
    team: player.team,

    hits: player.stats?.hits ?? 0,
    runs: player.stats?.runs ?? 0,
    rbi: player.stats?.rbi ?? 0,

    atBats: player.stats?.atBats ?? player.stats?.ab ?? 0,

    walks: player.stats?.baseOnBalls ?? player.stats?.bb ?? 0,
    hitByPitch: player.stats?.hitByPitch ?? player.stats?.hbp ?? 0,
    plateAppearances: player.stats?.plateAppearances ?? player.stats?.pa ?? 0
  };
}
