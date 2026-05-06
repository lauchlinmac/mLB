import { useEffect, useState } from "react";
import { fetchGames } from "./API";

export default function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchGames();

        console.log("Games:", data);

        setGames(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  return (
    <div className="app">
      <h1>⚾ Beast Mode MLB</h1>

      {games.length === 0 && (
        <div>No games found</div>
      )}

      {games.map((game) => (
        <div
          className="game"
          key={game.gamePk}
        >
          <div>
            {game.teams.away.team.name}
          </div>

          <div>
            {game.teams.home.team.name}
          </div>
        </div>
      ))}
    </div>
  );
}
