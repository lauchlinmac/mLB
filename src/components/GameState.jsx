export default function GameState({ linescore, count }) {
  if (!linescore) return null;

  return (
    <div className="game-state">
      ⚾ {linescore.currentInningOrdinal || "-"} |{" "}
      {linescore.outs ?? 0} Outs | Count:{" "}
      {count ? `${count.balls}-${count.strikes}` : "-"}
    </div>
  );
}
