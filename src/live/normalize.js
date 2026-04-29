export function normalizePitchEvent(raw) {
  return {
    batterId: raw.batterId,
    batterName: raw.batterName ?? "Unknown",
    batterTeam: raw.batterTeam ?? "TBD",
    result: raw.result,
    rbi: raw.rbi ?? 0
  };
}
