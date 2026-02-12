import { useContext } from "react";
import { BuilderHistoryContext } from "../contexts/BuilderContext";

export const useBuilderHistory = () => {
  const ctx = useContext(BuilderHistoryContext);
  if (!ctx) throw new Error("Missing BuilderHistoryContext");
  return ctx;
};
