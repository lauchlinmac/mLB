export default function PlayByPlay({ allPlays }) {
  if (!allPlays || allPlays.length === 0) return null;

  const recent = allPlays.slice(-10).reverse();

  return (
    <div className="plays">
      {recent.map((p, i) => (
        <div key={i} className="play">
          {p?.result?.description || "—"}
        </div>
      ))}
    </div>
  );
}
