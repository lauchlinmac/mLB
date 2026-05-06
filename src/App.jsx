import { useEffect, useState, useRef } from "react";
import { fetchTodayGames, fetchValidGameFeed } from "./api";

export default function App() {
  const [gameData, setGameData] = useState(null);
  const [gamePk, setGamePk] = useState(null);
  const [error, setError] = useState(null);
  const [isFinal, setIsFinal] = useState(false);
  const intervalRef = useRef(null);

  // 🔍 STEP 1: Find a VALID game
  useEffect(() => {
    const init = async () => {
      const games = await fetchTodayGames();

      if (!games.length) {
        setError("No games today");
        return;
      }

      // Priority: live → scheduled → final
      const sorted = [
        ...games.filter(g => g.status.detailedState === "In Progress"),
        ...games.filter(g => g.status.detailedState === "Scheduled"),
        ...games
      ];

      for (const g of sorted) {
        const data = await fetchValidGameFeed(g.gamePk);

        if (data) {
          setGamePk(g.gamePk);
          setGameData(data);
          return;
        }
      }

      setError("No valid game feed found");
    };

    init();
  }, []);

  // 🔄 STEP 2: Poll updates
  useEffect(() => {
    if (!gamePk) return;

    const load = async () => {
      const data = await fetchValidGameFeed(gamePk);

      if (!data) return;

      setGameData({ ...data });

      const status = data?.gameData?.status?.detailedState;

      if (status === "Final" || status === "Game Over") {
        setIsFinal(true);
        clearInterval(intervalRef.current);
      }
    };

    intervalRef.current = setInterval(load, 5000);

    return () => clearInterval(intervalRef.current);
  }, [gamePk]);

  // 🚨 ERROR
  if (error) {
    return (
      <div style={{ color: "red", padding: 20 }}>
        {error}
      </div>
    );
  }

  // ⏳ LOADING
  if (!gameData) {
    return (
      <div style={{ color: "white", padding: 20 }}>
        Finding live game...
      </div>
    );
  }

  const linescore = gameData.liveData?.linescore;
  const plays = gameData.liveData?.plays?.allPlays || [];
  const lastPlay = plays[plays.length - 1];

  const away = gameData.gameData.teams.away.abbreviation;
  const home = gameData.gameData.teams.home.abbreviation;

  const awayScore = linescore?.teams?.away?.runs ?? 0;
  const homeScore = linescore?.teams?.home?.runs ?? 0;

  return (
    <div style={{ padding: 20, color: "white", background: "#0b0b0b", minHeight: "100vh" }}>
      
      <h2>
        {isFinal
          ? "FINAL"
          : `${linescore?.inningState} ${linescore?.currentInning} | ${linescore?.outs} Outs`}
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
