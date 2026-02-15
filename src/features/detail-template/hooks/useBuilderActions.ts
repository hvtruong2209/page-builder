import { useContext } from "react";
import { BuilderActionsContext } from "../contexts/BuilderContext";

export const useBuilderActions = () => {
  const ctx = useContext(BuilderActionsContext);
  if (!ctx) throw new Error("Missing BuilderActionsContext");
  return ctx;
};
