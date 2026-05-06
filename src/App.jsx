import { useEffect, useState, useRef } from "react";
import { fetchTodayGames, fetchGameData } from "./api";

export default function App() {
  const [gamePk, setGamePk] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  // ✅ STEP 1: JUST PICK A GAME (no validation)
  useEffect(() => {
    const init = async () => {
      const games = await fetchTodayGames();

      if (!games.length) {
        setError("No games today");
        return;
      }

      // Prefer live, else first game
      const game =
        games.find(g => g.status.detailedState === "In Progress") ||
        games[0];

      console.log("Using gamePk:", game.gamePk);

      setGamePk(game.gamePk);
    };

    init();
  }, []);

  // ✅ STEP 2: FETCH DATA
  useEffect(() => {
    if (!gamePk) return;

    const load = async () => {
      const data = await fetchGameData(gamePk);

      if (!data) {
        setError("Failed to load game data");
        return;
      }

      setGameData(data);
    };

    load();

    intervalRef.current = setInterval(load, 5000);

    return () => clearInterval(intervalRef.current);
  }, [gamePk]);

  // ERROR
  if (error) {
    return (
      <div style={{ color: "red", padding: 20 }}>
        ERROR: {error}
      </div>
    );
  }

  // LOADING
  if (!gameData) {
    return (
      <div style={{ color: "white", padding: 20 }}>
        Loading game...
      </div>
    );
  }

  const linescore = gameData.liveData?.linescore;
  const plays = gameData.liveData?.plays?.allPlays || [];
  const lastPlay = plays.length ? plays[plays.length - 1] : null;

  const away = gameData.gameData?.teams?.away?.abbreviation || "AWAY";
  const home = gameData.gameData?.teams?.home?.abbreviation || "HOME";

  const awayScore = linescore?.teams?.away?.runs ?? "-";
  const homeScore = linescore?.teams?.home?.runs ?? "-";

  const status = gameData.gameData?.status?.detailedState;

  return (
    <div style={{ padding: 20, color: "white", background: "#0b0b0b", minHeight: "100vh" }}>
      
      <h2>{status || "Loading status..."}</h2>

      <h1>
        {away} {awayScore} - {homeScore} {home}
      </h1>

      {lastPlay && (
        <>
          <h3>Last Play</h3>
          <p>{lastPlay.result.description}</p>
        </>
      )}
    </div>
  );
}
