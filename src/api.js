export async function fetchGames(date = null) {
  const today =
    date ||
    new Date().toISOString().split("T")[0];

  const url = `https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&date=${today}&hydrate=linescore,team`;

  const res = await fetch(url);
  const data = await res.json();

  return data.dates?.[0]?.games || [];
}
