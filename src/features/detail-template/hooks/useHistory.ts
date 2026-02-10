import { useReducer } from "react";
import type { Template } from "../../../types/template";
import { historyReducer } from "../store/historyReducer";

export const useBuilder = (initial: Template) => {
  const [state, dispatch] = useReducer(historyReducer, {
    past: [],
    present: initial,
    future: [],
  });

  return {
    template: state.present,
    dispatch,

    undo: () => dispatch({ type: "UNDO" }),
    redo: () => dispatch({ type: "REDO" }),

    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
  };
};
