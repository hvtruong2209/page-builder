import { useContext } from "react";
import { BuilderStateContext } from "../contexts/BuilderContext";

export const useBuilderState = () => {
  const ctx = useContext(BuilderStateContext);
  if (!ctx) throw new Error("Missing BuilderStateContext");
  return ctx;
};
