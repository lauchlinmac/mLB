// src/App.jsx

import { useEffect, useState } from "react";
import { fetchGames } from "./API";
import "./App.css";

export default function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadGames = async () => {
    try {
      const data = await fetchGames();
      setGames(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGames();

    const interval = setInterval(() => {
      loadGames();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>⚾ Beast Mode MLB</h1>
      </header>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="games-container">
          {games.length === 0 ? (
            <div className="loading">No games found</div>
          ) : (
            games.map((game) => (
              <div key={game.id} className="game-card">
                <div className="teams">
                  <div className="team-row">
                    <div className="team-name">{game.awayTeam}</div>
                    <div className="score">{game.awayScore}</div>
                  </div>

                  <div className="team-row">
                    <div className="team-name">{game.homeTeam}</div>
                    <div className="score">{game.homeScore}</div>
                  </div>
                </div>

                <div className="game-info">
                  <div className="status">
                    {game.gameState === "Live"
                      ? `${game.inningState} ${game.inning}`
                      : game.status}
                  </div>

                  {game.gameState === "Live" && (
                    <div className="count">
                      ⚾ {game.balls}-{game.strikes} • {game.outs} Outs
                    </div>
                  )}

                  {game.gameState === "Preview" && (
                    <div className="start-time">
                      {new Date(game.startTime).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
