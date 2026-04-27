import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TEAM_LOGOS } from "./teams";

export default function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames();
    const interval = setInterval(fetchGames, 30000);
    return () => clearInterval(interval);
  }, []);

  async function fetchGames() {
    try {
      const res = await fetch("https://your-api-endpoint-here");
      const data = await res.json();
      setGames(data.games || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  function Team({ name, color }) {
    const logo = TEAM_LOGOS[name];

    return (
      <div className="flex items-center gap-2">
        {logo && (
          <img
            src={logo}
            alt={name}
            className="w-7 h-7 drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]"
            onError={(e) => (e.target.style.display = "none")}
          />
        )}
        <span className="text-sm font-medium">{name}</span>
      </div>
    );
  }

  function LiveDot({ isLive }) {
    if (!isLive) return null;

    return (
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute h-full w-full rounded-full bg-red-500 opacity-75"></span>
        <span className="relative h-2 w-2 rounded-full bg-red-600"></span>
      </span>
    );
  }

  function GameCard({ game }) {
    const isLive = game.status === "LIVE";

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-w-[320px] bg-gradient-to-b from-gray-900 to-black text-white rounded-2xl p-4 shadow-xl snap-center border border-gray-800"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <LiveDot isLive={isLive} />
            {isLive ? `LIVE • ${game.inning || ""}` : game.gameTime}
          </div>

          <div className="text-xs text-gray-500">
            {game.venue || "MLB Stadium"}
          </div>
        </div>

        {/* Away */}
        <div className="flex justify-between items-center py-2">
          <Team name={game.awayTeam} />
          <span className="text-xl font-bold text-blue-300">
            {game.awayScore ?? "-"}
          </span>
        </div>

        {/* Divider */}
        <div className="text-center text-gray-600 text-xs my-1">
          ● ● ●
        </div>

        {/* Home */}
        <div className="flex justify-between items-center py-2">
          <Team name={game.homeTeam} />
          <span className="text-xl font-bold text-red-300">
            {game.homeScore ?? "-"}
          </span>
        </div>

        {/* Status */}
        <div className="mt-3 text-xs">
          {isLive ? (
            <div className="text-green-400 animate-pulse">
              ● Live action updating
            </div>
          ) : (
            <div className="text-gray-500">Scheduled game</div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white p-4">
      <h1 className="text-2xl font-bold mb-3 tracking-wide">
        ⚾ MLB Beast Mode Live
      </h1>

      <p className="text-xs text-gray-500 mb-4">
        Swipe → for more games
      </p>

      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4">
        {games.map((game, i) => (
          <GameCard key={i} game={game} />
        ))}
      </div>
    </div>
  );
}
