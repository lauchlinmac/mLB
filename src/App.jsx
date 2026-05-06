import { useEffect, useState, useRef } from "react";
import { fetchGameData, fetchTodayGames } from "./api";

export default function App() {
  const [gamePk, setGamePk] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [error, setError] = useState(null);
  const [isFinal, setIsFinal] = useState(false);
  const intervalRef = useRef(null);

  // ✅ STEP 1: Get a valid gamePk automatically
  useEffect(() => {
    const init = async () => {
      const games = await fetchTodayGames();

      if (!games.length) {
        setError("No games found today");
        return;
      }

      // Prefer live game, fallback to first game
      const liveGame =
        games.find(g => g.status.detailedState === "In Progress") ||
        games[0];

      setGamePk(liveGame.gamePk);
    };

    init();
  }, []);

  // ✅ STEP 2: Poll game data
  useEffect(() => {
    if (!gamePk) return;

    const loadGame = async () => {
      const data = await fetchGameData(gamePk);

      if (!data) {
        setError("Failed to load game data");
        return;
      }

      setGameData({ ...data });

      const status = data?.gameData?.status?.detailedState;

      if (status === "Final" || status === "Game Over") {
        setIsFinal(true);
        clearInterval(intervalRef.current);
      }
    };

    loadGame();

    intervalRef.current = setInterval(loadGame, 5000);

    return () => clearInterval(intervalRef.current);
  }, [gamePk]);

  // 🚨 ERROR STATE
  if (error) {
    return (
      <div style={{ color: "red", padding: 20 }}>
        ERROR: {error}
      </div>
    );
  }

  // ⏳ LOADING STATE
  if (!gameData) {
    return (
      <div style={{ color: "white", padding: 20 }}>
        Loading live game...
      </div>
    );
  }

  const linescore = gameData.liveData?.linescore;
  const plays = gameData.liveData?.plays?.allPlays || [];
  const lastPlay = plays.length ? plays[plays.length - 1] : null;

  const away = gameData.gameData.teams.away.abbreviation;
  const home = gameData.gameData.teams.home.abbreviation;

  const awayScore = linescore?.teams?.away?.runs ?? 0;
  const homeScore = linescore?.teams?.home?.runs ?? 0;

  const inning = linescore?.currentInning;
  const inningState = linescore?.inningState;
  const outs = linescore?.outs;

  return (
    <div style={{ padding: 20, color: "white", background: "#0b0b0b", minHeight: "100vh" }}>
      
      <h2>
        {isFinal
          ? "FINAL"
          : `${inningState} ${inning} | ${outs} Outs`}
      </h2>

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
