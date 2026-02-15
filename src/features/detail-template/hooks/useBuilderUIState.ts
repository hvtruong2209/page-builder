import { useContext } from "react";
import { BuilderUIStateContext } from "../contexts/BuilderUIContext";

export const useBuilderUIState = () => {
  const ctx = useContext(BuilderUIStateContext);
  if (!ctx) throw new Error("Missing BuilderUIStateContext");
  return ctx;
};
