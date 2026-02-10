import { createContext, useContext } from "react";
import type { Template } from "../../../types/template";
import type { BuilderAction } from "../store/builderReducer";

export const BuilderStateContext = createContext<Template | null>(null);
export const BuilderDispatchContext = createContext<React.Dispatch<BuilderAction> | null>(null);
export const BuilderHistoryContext = createContext<{
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
} | null>(null);

export const useTemplate = () => {
  const ctx = useContext(BuilderStateContext);
  if (!ctx) throw new Error("Missing BuilderProvider");
  return ctx;
};

export const useBuilderDispatch = () => {
  const ctx = useContext(BuilderDispatchContext);
  if (!ctx) throw new Error("Missing BuilderProvider");
  return ctx;
};

export const useHistoryControls = () => {
  const ctx = useContext(BuilderHistoryContext);
  if (!ctx) throw new Error("Missing BuilderProvider");
  return ctx;
};
