import { useEffect, useState } from "react";
import { fetchTodayGames, fetchGameData } from "./api";

export default function App() {
  const [gameData, setGameData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      const games = await fetchTodayGames();

      if (!games.length) {
        setError("No games found");
        return;
      }

      const game = games[0]; // just grab first

      const data = await fetchGameData(game.gamePk);

      if (!data) {
        setError("Failed to load game data");
        return;
      }

      setGameData(data);
    };

    init();
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!gameData) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  const away = gameData.gameData.teams.away.abbreviation;
  const home = gameData.gameData.teams.home.abbreviation;

  return (
    <div style={{ color: "white", padding: 20 }}>
      <h1>{away} vs {home}</h1>
      <p>{gameData.gameData.status.detailedState}</p>
    </div>
  );
}
