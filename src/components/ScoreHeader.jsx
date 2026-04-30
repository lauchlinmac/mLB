export default function ScoreHeader({ linescore }) {
  if (!linescore || !linescore.teams) return null;

  const away = linescore.teams.away;
  const home = linescore.teams.home;

  if (!away?.team || !home?.team) return null;

  return (
    <div className="score-header">
      <div className="team">
        {away.team.id && (
          <img src={`/logos/${away.team.id}.png`} alt="away logo" />
        )}
        <span>{away.team.abbreviation || "AWY"}</span>
        <h1>{away.runs ?? 0}</h1>
      </div>

      <div className="divider">-</div>

      <div className="team">
        <h1>{home.runs ?? 0}</h1>
        <span>{home.team.abbreviation || "HME"}</span>
        {home.team.id && (
          <img src={`/logos/${home.team.id}.png`} alt="home logo" />
        )}
      </div>
    </div>
  );
}
