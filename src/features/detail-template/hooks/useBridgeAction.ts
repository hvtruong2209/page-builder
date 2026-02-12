/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import type { PageSettings, TemplateElement } from "../../../types/element";
import type { Draft } from "../../../types/element";

interface props {
  dispatch: React.Dispatch<any>;
  builderUI: {
    selectedElementId: string | null;
    showPreview: boolean;
    draft: Draft | null;
    setSelectedElementId: (id: string | null) => void;
    setShowPreview: (show: boolean) => void;
    setDraft: (draft: Draft | null | ((prev: Draft | null) => Draft | null)) => void;
  };
}

export const useBridgeAction = ({ dispatch, builderUI }: props) => {
  const beginDraft = useCallback(
    (id: string) => {
      builderUI.setDraft({
        kind: "element",
        id,
        changes: {},
      });
    },
    [builderUI],
  );

  // only update the draft state, do not commit to reducer yet
  const updateDraft = useCallback(
    (changes: Partial<TemplateElement>) => {
      builderUI.setDraft((prev: Draft | null) => {
        if (!prev || prev.kind !== "element") return prev;

        return {
          ...prev,
          kind: "element",
          changes: {
            ...prev.changes,
            ...changes,
          },
        };
      });
    },
    [builderUI],
  );

  const commitDraft = useCallback(() => {
    if (!builderUI.draft) return;

    if (builderUI.draft.kind === "element") {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          id: builderUI.draft.id,
          changes: builderUI.draft.changes,
        },
      });
    }

    builderUI.setDraft(null);
  }, [builderUI, dispatch]);

  const selectOtherElement = useCallback(
    (id: string | null) => {
      if (builderUI.draft && builderUI.draft.kind === "element") {
        dispatch({
          type: "UPDATE_ELEMENT",
          payload: {
            id: builderUI.draft.id,
            changes: builderUI.draft.changes,
          },
        });
      }

      builderUI.setDraft(null);
      builderUI.setSelectedElementId(id);
    },
    [builderUI, dispatch],
  );

  const beginPageDraft = useCallback(() => {
    builderUI.setDraft({
      kind: "page",
      changes: {},
    });
  }, [builderUI]);

  const updatePageDraft = useCallback(
    (changes: Partial<PageSettings>) => {
      builderUI.setDraft((prev: Draft | null) => {
        if (!prev || prev.kind !== "page") return prev;

        return {
          ...prev,
          changes: {
            ...prev.changes,
            ...changes,
          },
        };
      });
    },
    [builderUI],
  );

  const commitPageDraft = useCallback(() => {
    if (!builderUI.draft || builderUI.draft.kind !== "page") return;

    dispatch({
      type: "UPDATE_PAGE_SETTINGS",
      payload: builderUI.draft.changes,
    });

    builderUI.setDraft(null);
  }, [builderUI, dispatch]);

  return {
    beginDraft,
    updateDraft,
    commitDraft,
    selectOtherElement,
    beginPageDraft,
    updatePageDraft,
    commitPageDraft,
  };
};
