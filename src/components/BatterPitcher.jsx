export default function BatterPitcher({ matchup }) {
  if (!matchup) return null;

  return (
    <div className="matchup">
      <div>
        <h3>{matchup.batter?.fullName || "—"}</h3>
        <p>Batter</p>
      </div>

      <div>
        <h3>{matchup.pitcher?.fullName || "—"}</h3>
        <p>Pitcher</p>
      </div>
    </div>
  );
}
