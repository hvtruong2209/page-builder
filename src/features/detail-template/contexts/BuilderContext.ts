import type { BuilderAction } from "../reducers/builderReducer";
import type { Template } from "../../../types/element";
import { createContext } from "react";

export const BuilderStateContext = createContext<{
  template: Template;
  canUndo: boolean;
  canRedo: boolean;
} | null>(null);

export const BuilderActionsContext = createContext<{
  dispatch: React.Dispatch<BuilderAction>;
  undo: () => void;
  redo: () => void;
} | null>(null);
