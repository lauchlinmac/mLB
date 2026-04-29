import { useEffect, useReducer } from "react";
import { reducer, initialState } from "./engine/reducer";
import { startLiveFeed } from "./live/feed";
import { calculateOBP } from "./engine/stats";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const feed = startLiveFeed(dispatch);
    return () => feed.close();
  }, []);

  const players = Object.values(state.players);

  return (
    <div style={{ padding: 20 }}>
      <h1>⚾ Beast Mode Live Game Center v2</h1>

      {state.lastPitch && (
        <div style={{ marginBottom: 10 }}>
          🔥 Last Pitch: {state.lastPitch.result}
        </div>
      )}

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Player</th>
            <th>Team</th>
            <th>AB</th>
            <th>H</th>
            <th>RBI</th>
            <th>BB</th>
            <th>OBP</th>
          </tr>
        </thead>

        <tbody>
          {players.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.team}</td>
              <td>{p.atBats}</td>
              <td>{p.hits}</td>
              <td>{p.rbi}</td>
              <td>{p.walks}</td>
              <td>{calculateOBP(p).toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
