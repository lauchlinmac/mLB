export default function WinProbability() {
  // Placeholder (upgrade later with real math model)
  const det = 45;
  const atl = 55;

  return (
    <div className="win-prob">
      <div>DET {det}%</div>
      <div className="bar">
        <div style={{ width: `${det}%` }}></div>
      </div>
      <div>ATL {atl}%</div>
    </div>
  );
}
