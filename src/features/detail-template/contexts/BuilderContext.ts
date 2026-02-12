import type { BuilderAction } from "../reducers/builderReducer";
import type { Template } from "../../../types/element";
import { createContext } from "react";

export const BuilderStateContext = createContext<Template | null>(null);
export const BuilderDispatchContext = createContext<React.Dispatch<BuilderAction> | null>(null);
export const BuilderHistoryContext = createContext<{
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
} | null>(null);
