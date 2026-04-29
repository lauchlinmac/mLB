import { createPlayer } from "./stats";
import { PitchResult } from "./types";

export const initialState = {
  players: {},
  lastPitch: null
};

export function reducer(state, action) {
  switch (action.type) {

    case "PITCH_EVENT": {
      const e = action.payload;

      if (!e?.batterId) return state;

      const player = state.players[e.batterId] ?? createPlayer(
        e.batterId,
        e.batterName,
        e.batterTeam
      );

      const updated = { ...player };

      updated.plateAppearances += 1;

      switch (e.result) {
        case PitchResult.SINGLE:
        case PitchResult.DOUBLE:
        case PitchResult.TRIPLE:
        case PitchResult.HOME_RUN:
          updated.hits += 1;
          updated.atBats += 1;
          break;

        case PitchResult.OUT:
          updated.atBats += 1;
          break;

        case PitchResult.WALK:
          updated.walks += 1;
          break;

        case PitchResult.HBP:
          updated.hitByPitch += 1;
          break;
      }

      if (e.rbi) updated.rbi += e.rbi;

      return {
        ...state,
        players: {
          ...state.players,
          [updated.id]: updated
        },
        lastPitch: e
      };
    }

    case "RESET":
      return initialState;

    default:
      return state;
  }
}
