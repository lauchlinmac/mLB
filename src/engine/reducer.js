import { createPlayer } from "./stats";
import { calculateWinProbability } from "./winProb";

export const initialState = {
  players: {},
  game: {
    homeScore: 0,
    awayScore: 0,
    inning: 1
  },
  winProbHistory: [],
  lastPitch: null
};

export function reducer(state, action) {
  switch (action.type) {

    case "PITCH_EVENT": {
      const e = action.payload;

      const player =
        state.players[e.batterId] ?? createPlayer(e.batterId, e.batterName, e.batterTeam);

      const updated = { ...player };

      updated.plateAppearances += 1;

      switch (e.result) {
        case "single":
        case "double":
        case "triple":
        case "home_run":
          updated.hits += 1;
          updated.atBats += 1;
          break;

        case "out":
          updated.atBats += 1;
          break;

        case "walk":
          updated.walks += 1;
          break;
      }

      if (e.rbi) updated.rbi += e.rbi;

      const newPlayers = {
        ...state.players,
        [updated.id]: updated
      };

      // 🎯 update game score if provided
      const newGame = {
        ...state.game,
        homeScore: e.homeScore ?? state.game.homeScore,
        awayScore: e.awayScore ?? state.game.awayScore,
        inning: e.inning ?? state.game.inning
      };

      const winProb = calculateWinProbability(newGame);

      return {
        ...state,
        players: newPlayers,
        game: newGame,
        lastPitch: e,
        winProbHistory: [...state.winProbHistory, winProb]
      };
    }

    default:
      return state;
  }
}
