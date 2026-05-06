import { useEffect, useState, useRef } from "react";
import { fetchGameData } from "./api";

export default function App() {
  const [gamePk, setGamePk] = useState(746092); // replace if needed
  const [gameData, setGameData] = useState(null);
  const [isFinal, setIsFinal] = useState(false);
  const intervalRef = useRef(null);

  const loadGame = async () => {
    const data = await fetchGameData(gamePk);

    if (!data) return;

    // ✅ Always replace state (no mutation)
    setGameData({ ...data });

    const status = data?.gameData?.status?.detailedState;

    if (status === "Final" || status === "Game Over") {
      setIsFinal(true);

      // ✅ stop polling when game ends
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  useEffect(() => {
    loadGame();

    // ✅ start polling
    intervalRef.current = setInterval(() => {
      console.log("Fetching update...");
      loadGame();
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [gamePk]);

  if (!gameData) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  const linescore = gameData.liveData?.linescore;
  const plays = gameData.liveData?.plays?.allPlays || [];

  // ✅ ALWAYS get latest play
  const lastPlay = plays.length > 0 ? plays[plays.length - 1] : null;

  const inning = linescore?.currentInning;
  const inningState = linescore?.inningState;
  const outs = linescore?.outs;

  const away =
    gameData.gameData.teams.away.abbreviation;
  const home =
    gameData.gameData.teams.home.abbreviation;

  const awayScore = linescore?.teams?.away?.runs ?? 0;
  const homeScore = linescore?.teams?.home?.runs ?? 0;

  return (
    <div style={{ padding: 20, color: "white", background: "#0b0b0b", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <h2>
        {isFinal
          ? "FINAL"
          : `${inningState} ${inning} | ${outs} Outs`}
      </h2>

      {/* SCORE */}
      <h1>
        {away} {awayScore} - {homeScore} {home}
      </h1>

      {/* LAST PLAY */}
      {lastPlay && (
        <>
          <h3>Last Play</h3>
          <p>{lastPlay.result.description}</p>
        </>
      )}

      {/* DEBUG (optional) */}
      <div style={{ marginTop: 20, fontSize: 12, opacity: 0.6 }}>
        Plays: {plays.length}
      </div>
    </div>
  );
}
