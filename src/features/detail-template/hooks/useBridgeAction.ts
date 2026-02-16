/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from "react";
import type { PageSettings, TemplateElement } from "../../../types/element";
import type { Draft } from "../../../types/element";
import { BUILDER_ACTION_TYPE } from "../../../constants/variable";

interface UseBridgeActionProps {
  dispatch: React.Dispatch<any>;
  builderUI: {
    selectedElementId: string | null;
    draft: Draft | null;
    setSelectedElementId: (id: string | null) => void;
    setDraft: (draft: Draft | null | ((prev: Draft | null) => Draft | null)) => void;
  };
}

export const useBridgeAction = ({ dispatch, builderUI }: UseBridgeActionProps) => {
  // Ref to keep track of the current draft state, allowing us to access the latest draft in callbacks without worrying about stale closures
  // Avoid issues with stale closures in callbacks that depend on the draft state
  const draftRef = useRef<Draft | null>(builderUI.draft);

  // ======== Element draft actions ========
  const updateDraft = useCallback(
    (changes: Partial<TemplateElement>) => {
      const prev = draftRef.current;
      if (!prev || prev.kind !== "element") return;
      const newDraft = {
        ...prev,
        changes: {
          ...prev.changes,
          ...changes,
        },
      };

      draftRef.current = newDraft;
      builderUI.setDraft(newDraft);
    },
    [builderUI],
  );

  const commitDraft = useCallback(() => {
    const draft = draftRef.current;

    if (!draft) return;

    if (draft.kind === "element") {
      dispatch({
        type: BUILDER_ACTION_TYPE.UPDATE_ELEMENT,
        payload: {
          id: draft.id,
          changes: draft.changes,
        },
      });
    }
    draftRef.current = null;
    builderUI.setDraft(null);
  }, [builderUI, dispatch]);

  const beginDraft = useCallback(
    (id: string) => {
      // If there's already a draft for another element, commit it before starting new draft
      commitDraft();

      const newDraft: Draft = {
        kind: "element",
        id,
        changes: {},
      };

      draftRef.current = newDraft;
      builderUI.setDraft(newDraft);
    },
    [builderUI, commitDraft],
  );

  // ======== Page draft actions ========
  const beginPageDraft = useCallback(() => {
    const newDraft: Draft = {
      kind: "page",
      changes: {},
    };
    draftRef.current = newDraft;
    builderUI.setDraft(newDraft);
  }, [builderUI]);

  const updatePageDraft = useCallback(
    (changes: Partial<PageSettings>) => {
      const prev = draftRef.current;

      if (!prev || prev.kind !== "page") return;

      const newDraft: Draft = {
        ...prev,
        changes: {
          ...prev.changes,
          ...changes,
        },
      };

      draftRef.current = newDraft;
      builderUI.setDraft(newDraft);
    },
    [builderUI],
  );

  const commitPageDraft = useCallback(() => {
    const draft = draftRef.current;

    if (!draft || draft.kind !== "page") return;

    dispatch({
      type: BUILDER_ACTION_TYPE.UPDATE_PAGE_SETTINGS,
      payload: draft.changes,
    });

    draftRef.current = null;
    builderUI.setDraft(null);
  }, [builderUI, dispatch]);

  return {
    beginDraft,
    updateDraft,
    commitDraft,
    beginPageDraft,
    updatePageDraft,
    commitPageDraft,
  };
};
