import { useEffect, useState } from "react";
import {
  getScheduleByDate,
  getBoxScore,
  getGameDisplayTime
} from "./api";

export default function App() {
  const [tab, setTab] = useState("scores");
  const [offset, setOffset] = useState(0);
  const [games, setGames] = useState([]);

  useEffect(() => {
    load();
    const t = setInterval(load, 20000);
    return () => clearInterval(t);
  }, [offset]);

  async function load() {
    const data = await getScheduleByDate(offset);
    setGames(data);
  }

  return (
    <div className="app">
      <Header />

      {tab === "scores" && (
        <Scores
          games={games}
          offset={offset}
          setOffset={setOffset}
        />
      )}

      {tab === "favorites" && <Placeholder title="Favorites" />}
      {tab === "standings" && <Placeholder title="Standings" />}
      {tab === "beast" && <Placeholder title="Beast Mode" />}

      <Nav tab={tab} setTab={setTab} />
    </div>
  );
}

/* ================= HEADER ================= */

function Header() {
  return (
    <div className="header">
      <div className="title">SOLO BEAST</div>
      <div className="sub">MLB Live Command Center</div>
    </div>
  );
}

/* ================= SCORES ================= */

function Scores({ games, offset, setOffset }) {
  const [box, setBox] = useState(null);

  async function openBox(gamePk) {
    const data = await getBoxScore(gamePk);
    setBox(data);
  }

  const label =
    offset === 0 ? "TODAY" :
    offset === -1 ? "YESTERDAY" :
    offset === 1 ? "TOMORROW" :
    `DAY ${offset}`;

  return (
    <div className="section">

      {/* DAY NAV */}
      <div className="card row">
        <button onClick={() => setOffset(offset - 1)}>⬅️</button>
        <strong>{label}</strong>
        <button onClick={() => setOffset(offset + 1)}>➡️</button>
      </div>

      {/* GAMES */}
      {games.length === 0 && (
        <div className="card">No games found</div>
      )}

      {games.map((g) => {
        const isFuture = new Date(g.gameDate) > new Date();

        return (
          <div
            key={g.gamePk}
            className={`card ${isFuture ? "future" : ""}`}
            onClick={() => openBox(g.gamePk)}
          >
            <div className="teams">
              {g.teams.away.team.name} @ {g.teams.home.team.name}
            </div>

            {/* SCORES (FIXED) */}
            <div className="score">
              {g.teams.away.score ?? 0} - {g.teams.home.score ?? 0}
            </div>

            {/* TIME (FIXED FUTURE HANDLING) */}
            <div className="muted">
              ⏰ {getGameDisplayTime(g)}
            </div>
          </div>
        );
      })}

      {/* BOX SCORE MODAL */}
      {box && (
        <BoxPanel box={box} onClose={() => setBox(null)} />
      )}
    </div>
  );
}

/* ================= BOX SCORE ================= */

function BoxPanel({ box, onClose }) {
  const t = box.teams;

  return (
    <div className="boxPanel">
      <button className="close" onClick={onClose}>✕</button>

      <h3>BOX SCORE</h3>

      <div className="card">
        <strong>{t.away.team.name}</strong>
        <div>Runs: {t.away.teamStats.batting.runs}</div>
        <div>Hits: {t.away.teamStats.batting.hits}</div>
        <div>Errors: {t.away.teamStats.fielding.errors}</div>
      </div>

      <div className="card">
        <strong>{t.home.team.name}</strong>
        <div>Runs: {t.home.teamStats.batting.runs}</div>
        <div>Hits: {t.home.teamStats.batting.hits}</div>
        <div>Errors: {t.home.teamStats.fielding.errors}</div>
      </div>
    </div>
  );
}

/* ================= PLACEHOLDERS ================= */

function Placeholder({ title }) {
  return (
    <div className="section">
      <h2>{title}</h2>
      <div className="card">Coming next upgrade</div>
    </div>
  );
}

/* ================= NAV ================= */

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
