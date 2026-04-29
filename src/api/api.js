export async function fetchInitialPlayers() {
  const res = await fetch("/api/players");
  return res.json();
}
