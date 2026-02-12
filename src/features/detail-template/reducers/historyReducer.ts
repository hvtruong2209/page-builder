import type { Template } from "../../../types/element";
import { builderReducer, type BuilderAction } from "./builderReducer";

type History<T> = {
  past: T[];
  present: T;
  future: T[];
};

const HISTORY_LIMIT = 50;

export const historyReducer = (
  state: History<Template>,
  action: BuilderAction,
): History<Template> => {
  if (action.type === "UNDO") {
    if (!state.past.length) return state;

    const previous = state.past[state.past.length - 1];

    return {
      past: state.past.slice(0, -1),
      present: previous,
      future: [state.present, ...state.future],
    };
  }

  if (action.type === "REDO") {
    if (!state.future.length) return state;

    const next = state.future[0];

    return {
      past: [...state.past, state.present],
      present: next,
      future: state.future.slice(1),
    };
  }

  // run builder reducer
  const newPresent = builderReducer(state.present, action);

  // IMPORTANT: do not add to history if nothing changed
  if (newPresent === state.present) return state;

  const past = [...state.past, state.present];

  if (past.length > HISTORY_LIMIT) {
    past.shift();
  }

  return {
    past,
    present: newPresent,
    future: [],
  };
};
