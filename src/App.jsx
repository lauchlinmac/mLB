import { useEffect, useState } from "react";
import ScoreHeader from "./components/ScoreHeader";
import GameState from "./components/GameState";
import BatterPitcher from "./components/BatterPitcher";
import WinProbability from "./components/WinProbability";
import BaseDiamond from "./components/BaseDiamond";
import PlayByPlay from "./components/PlayByPlay";
import LastPitch from "./components/LastPitch";
import { fetchGameFeed } from "./services/mlbApi";

export default function App() {
  const [game, setGame] = useState(null);

  const GAME_PK = 746123; // 🔥 replace with live gamePk

  useEffect(() => {
    const loadGame = async () => {
      const data = await fetchGameFeed(GAME_PK);
      setGame(data);
    };

    loadGame();
    const interval = setInterval(loadGame, 3000); // update every 3 sec

    return () => clearInterval(interval);
  }, []);

  if (!game) return <div className="loading">Loading Beast Mode...</div>;

  const live = game.liveData;
  const linescore = live.linescore;
  const plays = live.plays;

  const currentPlay = plays.currentPlay;

  return (
    <div className="app">
      <ScoreHeader linescore={linescore} game={game} />

      <GameState
        linescore={linescore}
        count={currentPlay?.count}
      />

      <LastPitch play={currentPlay} />

      <BatterPitcher matchup={currentPlay?.matchup} />

      <WinProbability />

      <BaseDiamond offense={linescore.offense} />

      <PlayByPlay allPlays={plays.allPlays} />
    </div>
  );
}
