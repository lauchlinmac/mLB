export function calculateWinProbability(gameState) {
  const p = gameState;

  // baseline assumption
  let prob = 0.5;

  const runsDiff = (p.homeScore ?? 0) - (p.awayScore ?? 0);
  const inningFactor = (p.inning ?? 1) / 9;

  // score impact
  prob += runsDiff * 0.07;

  // late game weighting
  if (inningFactor > 0.7) {
    prob += runsDiff * 0.12;
  }

  // clamp
  return Math.max(0.01, Math.min(0.99, prob));
}
