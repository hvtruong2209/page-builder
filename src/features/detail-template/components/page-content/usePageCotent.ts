import { useRef } from "react";
import type { TemplateElement } from "../../../../types/element";
import { useBuilderDispatch } from "../../hooks/useBuilderDispatch";
import { useBuilderUI } from "../../hooks/useBuilderUI";
import { BUILDER_ACTION_TYPE, ELEMENT_TYPE } from "../../../../config/variable";

export const usePageContent = (el: TemplateElement) => {
  const dispatch = useBuilderDispatch();
  const { selectedElementId, setSelectedElementId, draft } = useBuilderUI();

  const editingRef = useRef<HTMLElement | null>(null);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedElementId(id);
  };

  const handleBlur = (el: TemplateElement, e: React.FocusEvent<HTMLElement>) => {
    if (el.type === ELEMENT_TYPE.IMAGE || el.type === ELEMENT_TYPE.SECTION) return;
    const newText = e.currentTarget.innerText;
    if (newText !== el.text) {
      dispatch({
        type: BUILDER_ACTION_TYPE.UPDATE_ELEMENT,
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

  const isSelected = el.id === selectedElementId;

  const displayEl: TemplateElement =
    draft && draft.kind === "element" && draft.id === el.id ? { ...el, ...draft.changes } : el;

  return {
    editingRef,
    isSelected,
    displayEl,
    handleClick,
    handleBlur,
    handleKeyDown,
  };
};
