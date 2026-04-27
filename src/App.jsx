import { useEffect, useState } from "react";
import { getSchedule, getStandings } from "./api";

export default function App() {
  const [tab, setTab] = useState("scores");
  const [games, setGames] = useState([]);

  useEffect(() => {
    load();
    const interval = setInterval(load, 20000);
    return () => clearInterval(interval);
  }, []);

  async function load() {
    const data = await getSchedule();
    setGames(data);
  }

  return (
    <div className="app">
      <Header />

      {tab === "scores" && <Scores games={games} />}
      {tab === "favorites" && <Favorites />}
      {tab === "standings" && <Standings />}
      {tab === "beast" && <Beast games={games} />}

      <Nav tab={tab} setTab={setTab} />
    </div>
  );
}

// 🧠 HEADER
function Header() {
  return (
    <div className="header">
      <div className="title">SOLO BEAST</div>
      <div className="sub">Live MLB Intelligence</div>
    </div>
  );
}

// ⚾ LIVE SCORES
function Scores({ games }) {
  return (
    <div className="section">
      <h2>LIVE GAMES</h2>

      {games.map((g) => (
        <div key={g.gamePk} className="card">
          <div className="teams">
            {g.teams.away.team.name} @ {g.teams.home.team.name}
          </div>

          <div className="score live">
            {g.status.detailedState}
          </div>
        </div>
      ))}
    </div>
  );
}

// ⭐ FAVORITES (placeholder foundation)
function Favorites() {
  return (
    <div className="section">
      <h2>FAVORITES</h2>
      <div className="card">Favorite teams coming next upgrade</div>
    </div>
  );
}

// 📊 STANDINGS
function Standings() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await getStandings();
    setData(res);
  }

  return (
    <div className="section">
      <h2>STANDINGS</h2>

      {data.slice(0, 2).map((league) => (
        <div key={league.league.id} className="card">
          <strong>{league.league.name}</strong>

          {league.teamRecords.slice(0, 5).map((t) => (
            <div key={t.team.id}>
              {t.team.name} — {t.wins}-{t.losses}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// 🔥 BEAST MODE CENTER
function Beast({ games }) {
  return (
    <div className="section">
      <h2>BEAST MODE</h2>

      <div className="card">
        Active Games: {games.length}
      </div>

      <div className="card">
        System Status: LIVE
      </div>
    </div>
  );
}

// 📱 NAV BAR
function Nav({ tab, setTab }) {
  return (
    <div className="nav">
      <button onClick={() => setTab("scores")}>Scores</button>
      <button onClick={() => setTab("favorites")}>Fav</button>
      <button onClick={() => setTab("standings")}>Stand</button>
      <button onClick={() => setTab("beast")}>Beast</button>
    </div>
  );
}
