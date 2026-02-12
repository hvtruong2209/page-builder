import React from "react";
import type { Template } from "../../../types/element";

import { useBuilderStore } from "../store/useBuilderStore";
import { BuilderUIContext } from "../contexts/BuilderUIContext";
import { useBuilderUIStore } from "../store/useBuilderUIStore";
import { useBridgeAction } from "../hooks/useBridgeAction";
import {
  BuilderStateContext,
  BuilderDispatchContext,
  BuilderHistoryContext,
} from "../contexts/BuilderContext";

export const BuilderProvider = ({
  initial,
  children,
}: {
  initial: Template;
  children: React.ReactNode;
}) => {
  const builder = useBuilderStore(initial);
  const builderUI = useBuilderUIStore();
  const bridgeActions = useBridgeAction({ dispatch: builder.dispatch, builderUI });

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
          <BuilderUIContext.Provider value={{ ...builderUI, ...bridgeActions }}>
            {children}
          </BuilderUIContext.Provider>
        </BuilderHistoryContext.Provider>
      </BuilderDispatchContext.Provider>
    </BuilderStateContext.Provider>
  );
};
