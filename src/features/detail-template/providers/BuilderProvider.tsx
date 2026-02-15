import React, { useMemo } from "react";
import type { Template } from "../../../types/element";

import { useBuilderStore } from "../store/useBuilderStore";
import { BuilderUIActionsContext, BuilderUIStateContext } from "../contexts/BuilderUIContext";
import { useBuilderUIStore } from "../store/useBuilderUIStore";
import { useBridgeAction } from "../hooks/useBridgeAction";
import { BuilderStateContext, BuilderActionsContext } from "../contexts/BuilderContext";

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

  const builderState = useMemo(
    () => ({
      template: builder.template,
      canUndo: builder.canUndo,
      canRedo: builder.canRedo,
    }),
    [builder.template, builder.canUndo, builder.canRedo],
  );

  // Memoize stable actions
  const builderActions = useMemo(
    () => ({
      dispatch: builder.dispatch,
      undo: builder.undo,
      redo: builder.redo,
    }),
    [builder.dispatch, builder.undo, builder.redo],
  );

  const uiState = useMemo(
    () => ({
      selectedElementId: builderUI.selectedElementId,
      showPreview: builderUI.showPreview,
      draft: builderUI.draft,
    }),
    [builderUI.selectedElementId, builderUI.showPreview, builderUI.draft],
  );

  // Memoize stable actions
  const uiActions = useMemo(
    () => ({
      setSelectedElementId: builderUI.setSelectedElementId,
      setShowPreview: builderUI.setShowPreview,
      setDraft: builderUI.setDraft,
      ...bridgeActions,
    }),
    [builderUI.setSelectedElementId, builderUI.setShowPreview, builderUI.setDraft, bridgeActions],
  );

  return (
    <BuilderStateContext.Provider value={builderState}>
      <BuilderActionsContext.Provider value={builderActions}>
        <BuilderUIStateContext.Provider value={uiState}>
          <BuilderUIActionsContext.Provider value={uiActions}>
            {children}
          </BuilderUIActionsContext.Provider>
        </BuilderUIStateContext.Provider>
      </BuilderActionsContext.Provider>
    </BuilderStateContext.Provider>
  );
};
