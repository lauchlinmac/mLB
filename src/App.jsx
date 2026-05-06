import { useEffect, useState } from "react";
import { fetchTodayGames, fetchGameData } from "./api";

export default function App() {
  const [gameData, setGameData] = useState(null);
  const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function loadGames() {
    try {
      const data = await fetchGames();
      setGames(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  loadGames();
}, []);
  useEffect(() => {
  

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
