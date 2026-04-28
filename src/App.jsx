import { useEffect, useState } from "react";
import { fetchGames } from "./api";
import { teamLogos } from "./teams";

export default function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState("");

  async function loadGames() {
    try {
      const data = await fetchGames();
      setGames(data);
      setUpdated(
        new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit"
        })
      );
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadGames();

    const interval = setInterval(() => {
      loadGames();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  function gameStatus(game) {
    const state = game.status?.abstractGameState;
    const detailed = game.status?.detailedState;

    if (state === "Live") {
      const inning = game.linescore?.currentInning || "";
      const half = game.linescore?.inningHalf || "";
      return `${half} ${inning}`;
    }

    if (state === "Final") return "Final";

    return new Date(game.gameDate).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    });
  }

  if (loading) return <div className="loading">Loading Diamond Beast...</div>;

  return (
    <div className="app">
      <h1>⚾ Diamond Beast V6</h1>
      <p className="updated">Updated: {updated}</p>

      <div className="games">
        {games.map((game) => {
          const away = game.teams.away.team.name;
          const home = game.teams.home.team.name;

          const awayScore = game.teams.away.score ?? 0;
          const homeScore = game.teams.home.score ?? 0;

          return (
            <div className="card" key={game.gamePk}>
              <div className="teamRow">
                <img src={teamLogos[away]} alt={away} />
                <span>{away}</span>
                <strong>{awayScore}</strong>
              </div>

              <div className="teamRow">
                <img src={teamLogos[home]} alt={home} />
                <span>{home}</span>
                <strong>{homeScore}</strong>
              </div>

              <div className="status">{gameStatus(game)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
