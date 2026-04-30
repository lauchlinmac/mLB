export default function GameState({ linescore, count }) {
  return (
    <div className="game-state">
      ⚾ {linescore.currentInningOrdinal} | {linescore.outs} Outs  
      | Count: {count?.balls}-{count?.strikes}
    </div>
  );
}
