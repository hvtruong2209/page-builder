import { useRef } from "react";
import type { TemplateElement } from "../../../../types/element";
import { useBuilderDispatch } from "../../hooks/useBuilderDispatch";
import { useBuilderState } from "../../hooks/useBuilderState";
import { useBuilderUI } from "../../hooks/useBuilderUI";

export const usePageContent = () => {
  const dispatch = useBuilderDispatch();
  const template = useBuilderState();
  const { selectedElementId, setSelectedElementId, draft } = useBuilderUI();

  const { elements, pageSettings, layout } = template;

  const editingRef = useRef<HTMLElement | null>(null);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedElementId(id);
  };

  const handleBlur = (el: TemplateElement, e: React.FocusEvent<HTMLElement>) => {
    if (el.type === "image" || el.type === "section") return;
    const newText = e.currentTarget.innerText;
    if (newText !== el.text) {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          id: el.id,
          changes: {
            text: newText,
          },
        },
      });
    }
    editingRef.current = null;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const pageSettingsDisplay =
    draft && draft.kind === "page" ? { ...pageSettings, ...draft.changes } : pageSettings;

  return {
    elements,
    layout,
    pageSettingsDisplay: pageSettingsDisplay,
    selectedElementId,
    editingRef,
    draft,
    handleClick,
    handleBlur,
    handleKeyDown,
    setSelectedElementId,
  };
};
