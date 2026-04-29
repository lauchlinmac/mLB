// src/App.jsx
import { useEffect, useState } from "react";
import "./styles.css";
import { fetchSchedule } from "./api";
import GameCard from "./components/GameCard";
import GameCenter from "./components/GameCenter";
import Leaders from "./components/Leaders";

export default function App() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [tab, setTab] = useState("today");
  const [loading, setLoading] = useState(true);

  async function loadGames() {
    setLoading(true);
    const data = await fetchSchedule(tab);
    setGames(data);
    if (!selectedGame && data.length) setSelectedGame(data[0]);
    setLoading(false);
  }

  useEffect(() => {
    loadGames();
    const timer = setInterval(loadGames, 15000);
    return () => clearInterval(timer);
  }, [tab]);

  return (
    <div className="app">
      <header className="header">
        <h1>⚾ Beast Mode Live v7</h1>

        <div className="tabs">
          <button onClick={() => setTab("prev")}>Previous</button>
          <button onClick={() => setTab("today")}>Today</button>
          <button onClick={() => setTab("next")}>Next</button>
        </div>
      </header>

      {loading ? (
        <div className="loading">Loading Games...</div>
      ) : (
        <>
          <div className="scoreboard">
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                active={selectedGame?.id === game.id}
                onClick={() => setSelectedGame(game)}
              />
            ))}
          </div>

          {selectedGame && (
            <>
              <GameCenter game={selectedGame} />
              <Leaders game={selectedGame} />
            </>
          )}
        </>
      )}
    </div>
  );
}
