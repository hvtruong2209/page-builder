import React from "react";
import { useBuilder } from "../hooks/useHistory";
import type { Template } from "../../../types/template";
import { BuilderStateContext, BuilderDispatchContext, BuilderHistoryContext } from "../hooks/useBuilderProvider";

export const BuilderProvider = ({ initial, children }: { initial: Template; children: React.ReactNode }) => {
  const builder = useBuilder(initial);

  return (
    <BuilderStateContext.Provider value={builder.template}>
      <BuilderDispatchContext.Provider value={builder.dispatch}>
        <BuilderHistoryContext.Provider
          value={{
            undo: builder.undo,
            redo: builder.redo,
            canUndo: builder.canUndo,
            canRedo: builder.canRedo,
          }}
        >
          {children}
        </BuilderHistoryContext.Provider>
      </BuilderDispatchContext.Provider>
    </BuilderStateContext.Provider>
  );
};
