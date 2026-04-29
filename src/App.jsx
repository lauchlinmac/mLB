import { useEffect, useState } from "react";
import { fetchGames } from "./api";

export default function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    loadGames();
    const interval = setInterval(loadGames, 15000);
    return () => clearInterval(interval);
  }, []);

  async function loadGames() {
    const data = await fetchGames();
    setGames(data);
  }

  return (
    <div style={{ background:"#000", color:"#fff", minHeight:"100vh", padding:"20px" }}>
      <h1>⚾ Beast Mode Live Game Center</h1>

      {games.length === 0 ? (
        <h2>Loading Games...</h2>
      ) : (
        games.map((g) => (
          <div key={g.id}
            style={{
              border:"1px solid #444",
              padding:"15px",
              marginBottom:"10px",
              borderRadius:"12px"
            }}
          >
            <h2>{g.away} {g.awayScore} @ {g.homeScore} {g.home}</h2>
            <p>{g.status} {g.inning}</p>
          </div>
        ))
      )}
    </div>
  );
}
