import { useCallback, useState } from "react";
import { BuilderUIContext } from "../hooks/useBuilderUIProvider";
import type { PageSettings, TemplateElement } from "../../../types/template";
import { useBuilderDispatch } from "../hooks/useBuilderProvider";
import type { Draft } from "../../../types";

export const BuilderUIProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const dispatch = useBuilderDispatch();

  const beginDraft = useCallback((id: string) => {
    setDraft({
      kind: "element",
      id,
      changes: {},
    });
  }, []);

  // only update the draft state, do not commit to reducer yet
  const updateDraft = useCallback((changes: Partial<TemplateElement>) => {
    setDraft((prev: Draft | null) => {
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
  }, []);

  const commitDraft = useCallback(() => {
    if (!draft) return;

    if (draft.kind === "element") {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          id: draft.id,
          changes: draft.changes,
        },
      });
    }

    setDraft(null);
  }, [draft, dispatch]);

  const selectOtherElement = useCallback(
    (id: string | null) => {
      if (draft && draft.kind === "element") {
        dispatch({
          type: "UPDATE_ELEMENT",
          payload: {
            id: draft.id,
            changes: draft.changes,
          },
        });
      }

      setDraft(null);
      setSelectedElementId(id);
    },
    [draft, dispatch],
  );

  const beginPageDraft = () => {
    setDraft({
      kind: "page",
      changes: {},
    });
  };

  const updatePageDraft = (changes: Partial<PageSettings>) => {
    setDraft((prev) => {
      if (!prev || prev.kind !== "page") return prev;

      return {
        ...prev,
        changes: {
          ...prev.changes,
          ...changes,
        },
      };
    });
  };

  const commitPageDraft = () => {
    if (!draft || draft.kind !== "page") return;

    dispatch({
      type: "UPDATE_PAGE_SETTINGS",
      payload: draft.changes,
    });

    setDraft(null);
  };

  return (
    <BuilderUIContext.Provider
      value={{
        selectedElementId,
        setSelectedElementId,
        showPreview,
        setShowPreview,
        draft,
        beginDraft,
        updateDraft,
        commitDraft,
        selectOtherElement,
        beginPageDraft,
        updatePageDraft,
        commitPageDraft,
      }}
    >
      {children}
    </BuilderUIContext.Provider>
  );
};
