import { useContext } from "react";
import { BuilderUIContext } from "../contexts/BuilderUIContext";

export const useBuilderUI = () => {
  const ctx = useContext(BuilderUIContext);
  if (!ctx) throw new Error("Missing BuilderUIContext");
  return ctx;
};
