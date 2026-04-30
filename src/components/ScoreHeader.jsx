export default function ScoreHeader({ linescore, game }) {
  const away = linescore.teams.away;
  const home = linescore.teams.home;

  return (
    <div className="score-header">
      <div className="team">
        <img src={`/logos/${away.team.id}.png`} />
        <span>{away.team.abbreviation}</span>
        <h1>{away.runs}</h1>
      </div>

      <div className="divider">-</div>

      <div className="team">
        <h1>{home.runs}</h1>
        <span>{home.team.abbreviation}</span>
        <img src={`/logos/${home.team.id}.png`} />
      </div>
    </div>
  );
}
