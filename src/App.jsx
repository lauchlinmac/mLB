import { useEffect, useState } from "react";
import { getScheduleByDate, getStandings } from "./api";

export default function App() {
  const [tab, setTab] = useState("scores");
  const [dayOffset, setDayOffset] = useState(0);
  const [games, setGames] = useState([]);

  useEffect(() => {
    load();
    const interval = setInterval(load, 20000);
    return () => clearInterval(interval);
  }, [dayOffset]);

  async function load() {
    const data = await getScheduleByDate(dayOffset);
    setGames(data);
  }

  return (
    <div className="app">
      <Header />

      {tab === "scores" && (
        <Scores
          games={games}
          dayOffset={dayOffset}
          setDayOffset={setDayOffset}
        />
      )}

      {tab === "favorites" && <Favorites />}
      {tab === "standings" && <Standings />}
      {tab === "beast" && <Beast games={games} />}

      <Nav tab={tab} setTab={setTab} />
    </div>
  );
}

/* =========================
   HEADER
========================= */

function Header() {
  return (
    <div className="header">
      <div className="title">SOLO BEAST</div>
      <div className="sub">MLB Timeline Intelligence</div>
    </div>
  );
}

/* =========================
   ⚾ SCORES + DAY NAV
========================= */

function Scores({ games, dayOffset, setDayOffset }) {
  const label =
    dayOffset === 0 ? "TODAY" :
    dayOffset === -1 ? "YESTERDAY" :
    dayOffset === 1 ? "TOMORROW" :
    `DAY ${dayOffset}`;

  return (
    <div className="section">

      {/* DAY SWITCHER */}
      <div className="card">
        <div className="row">
          <button onClick={() => setDayOffset(dayOffset - 1)}>
            ⬅️
          </button>

          <strong>{label}</strong>

          <button onClick={() => setDayOffset(dayOffset + 1)}>
            ➡️
          </button>
        </div>
      </div>

      {/* GAMES */}
      {games.length === 0 && (
        <div className="card">No games found</div>
      )}

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

/* =========================
   PLACEHOLDERS
========================= */

function Favorites() {
  return (
    <div className="section">
      <h2>FAVORITES</h2>
      <div className="card">Coming next upgrade</div>
    </div>
  );
}

function Standings() {
  return (
    <div className="section">
      <h2>STANDINGS</h2>
      <div className="card">Coming next upgrade</div>
    </div>
  );
}

function Beast({ games }) {
  return (
    <div className="section">
      <h2>BEAST MODE</h2>
      <div className="card">Games loaded: {games.length}</div>
    </div>
  );
}

/* =========================
   NAV
========================= */

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
