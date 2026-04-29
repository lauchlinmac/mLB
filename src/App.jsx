import { useEffect, useReducer } from "react";
import { reducer, initialState } from "./engine/reducer";
import { startLiveFeed } from "./live/feed";
import PitchMap from "./components/PitchMap";
import WinProbGraph from "./components/WinProbGraph";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const feed = startLiveFeed(dispatch);
    return () => feed.close();
  }, []);

  const players = Object.values(state.players);

  const latestProb = state.winProbHistory;

  return (
    <div style={{ padding: 20, background: "#111", color: "#fff" }}>
      <h1>⚾ ESPN-Style Beast Broadcast Engine</h1>

      {/* 🎥 LIVE FEED STRIP */}
      <div style={{ marginBottom: 10 }}>
        🔥 Last Pitch: {state.lastPitch?.result || "Waiting..."}
      </div>

      {/* GRID */}
      <div style={{ display: "flex", gap: 20 }}>
        
        {/* PLAYER TABLE */}
        <div>
          <h3>Players</h3>
          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th>Name</th>
                <th>AB</th>
                <th>H</th>
                <th>RBI</th>
              </tr>
            </thead>
            <tbody>
              {players.map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.atBats}</td>
                  <td>{p.hits}</td>
                  <td>{p.rbi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🎯 PITCH MAP */}
        <PitchMap pitch={state.lastPitch} />

        {/* 📈 WIN PROB */}
        <WinProbGraph data={latestProb} />

      </div>
    </div>
  );
}
