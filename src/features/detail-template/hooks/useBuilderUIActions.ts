import { useContext } from "react";
import { BuilderUIActionsContext } from "../contexts/BuilderUIContext";

export const useBuilderUIActions = () => {
  const ctx = useContext(BuilderUIActionsContext);
  if (!ctx) throw new Error("Missing BuilderUIActionsContext");
  return ctx;
};
