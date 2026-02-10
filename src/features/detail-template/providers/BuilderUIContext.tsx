import { useCallback, useState } from "react";
import { BuilderUIContext } from "../hooks/useBuilderUIProvider";
import type { PageSettings, TemplateElement } from "../../../types/template";
import { useBuilderDispatch } from "../hooks/useBuilderProvider";
import type { Draft } from "../../../types";

export const BuilderUIProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const dispatch = useBuilderDispatch();
  /**
   ⭐ BEGIN INTERACTION
   gọi khi user bắt đầu drag / resize / typing
   */
  const beginDraft = useCallback((id: string) => {
    setDraft({
      kind: "element",
      id,
      changes: {},
    });
  }, []);

  /**
   ⭐ UPDATE REALTIME
   chỉ update UI — không vào history
   */
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

  /**
   ⭐ COMMIT (QUAN TRỌNG NHẤT)
   ghi vào reducer → undo được
   */
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
