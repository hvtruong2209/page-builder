import { useContext } from "react";
import { BuilderDispatchContext } from "../contexts/BuilderContext";

export const useBuilderDispatch = () => {
  const ctx = useContext(BuilderDispatchContext);
  if (!ctx) throw new Error("Missing BuilderDispatchContext");
  return ctx;
};
