import { useEffect, useState } from "react";
import { connectLiveFeed } from "./live/liveFeed";
import { getLiveState } from "./live/pitchEngine";

export default function App() {
  const [state, setState] = useState({ players: {} });
  
  useEffect(() => {
  const conn = connectLiveFeed(setState);

  return () => conn.close();
}, []);
  

  const players = Object.values(state.players);

  return (
    <div style={{ padding: "20px" }}>
      <h1>⚾ Beast Mode Live Game Center</h1>

      <table border="1" cellPadding="8">
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
          {players.map((p) => {
            const obp =
              (p.hits + p.walks + p.hitByPitch) /
              (p.atBats + p.walks + p.hitByPitch || 1);

            return (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.team}</td>
                <td>{p.atBats}</td>
                <td>{p.hits}</td>
                <td>{p.rbi}</td>
                <td>{p.walks}</td>
                <td>{obp.toFixed(3)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
