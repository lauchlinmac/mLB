const state = {
  players: {}
};

function ensurePlayer(id, name, team) {
  if (!state.players[id]) {
    state.players[id] = {
      id,
      name,
      team,
      hits: 0,
      runs: 0,
      rbi: 0,
      atBats: 0,
      walks: 0,
      hitByPitch: 0,
      plateAppearances: 0
    };
  }
  return state.players[id];
}

export function applyPitchEvent(event) {
  if (!event?.batterId) return state;

  const batter = ensurePlayer(
    event.batterId,
    event.batterName || "Unknown",
    event.batterTeam || "TBD"
  );

  batter.plateAppearances += 1;

  switch (event.result) {
    case "single":
    case "double":
    case "triple":
    case "home_run":
      batter.hits += 1;
      batter.atBats += 1;
      break;

    case "out":
      batter.atBats += 1;
      break;

    case "walk":
      batter.walks += 1;
      break;

    case "hit_by_pitch":
      batter.hitByPitch += 1;
      break;
  }

  if (event.rbi) batter.rbi += event.rbi;

  return state;
}

export function getLiveState() {
  // 🔥 IMPORTANT: force new object reference for React
  return {
    players: { ...state.players }
  };
}
