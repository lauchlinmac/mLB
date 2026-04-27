import { useEffect, useState } from "react";
import { TEAM_LOGOS } from "./API";

export default function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames();
  }, []);

  async function fetchGames() {
    try {
      const res = await fetch("https://your-api-endpoint-here");
      const data = await res.json();
      setGames(data.games || []);
    } catch (err) {
      console.error("Failed to load games:", err);
    }
  }

  function Team({ name }) {
    return (
      <div className="flex items-center gap-2">
        <img
          src={TEAM_LOGOS[name]}
          alt={name}
          className="w-6 h-6 object-contain"
          onError={(e) => (e.target.style.display = "none")}
        />
        <span>{name}</span>
      </div>
    );
  }

  function GameCard({ game }) {
    return (
      <div className="bg-gray-900 text-white p-4 rounded-xl shadow-md mb-3">
        {/* Away Team */}
        <div className="flex justify-between items-center mb-2">
          <Team name={game.awayTeam} />
          <span className="font-bold">
            {game.awayScore ?? "-"}
          </span>
        </div>

        {/* Home Team */}
        <div className="flex justify-between items-center">
          <Team name={game.homeTeam} />
          <span className="font-bold">
            {game.homeScore ?? "-"}
          </span>
        </div>

        {/* Status / Time */}
        <div className="text-xs text-gray-400 mt-2">
          {game.status === "LIVE"
            ? `🔴 Live • ${game.inning || ""}`
            : game.gameTime || "Scheduled"}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">MLB Live Scores</h1>

      {games.length === 0 ? (
        <div className="text-gray-400">Loading games...</div>
      ) : (
        games.map((game, idx) => (
          <GameCard key={idx} game={game} />
        ))
      )}
    </div>
  );
}
