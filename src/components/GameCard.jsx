// src/components/GameCard.jsx

export default function GameCard({ game, active, onClick }) {
  return (
    <div
      className={`game-card ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="teams">
        <div className="team-row">
          <span>{game.away}</span>
          <strong>{game.awayScore}</strong>
        </div>

        <div className="team-row">
          <span>{game.home}</span>
          <strong>{game.homeScore}</strong>
        </div>
      </div>

      <div className="status">
        {game.status === "In Progress" ? (
          <>
            {game.inningState} {game.inning}
          </>
        ) : game.status === "Final" ? (
          <>Final</>
        ) : (
          <>{game.gameTime}</>
        )}
      </div>
    </div>
  );
}
