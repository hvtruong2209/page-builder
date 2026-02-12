import type {
  HeadingElement,
  ParagraphElement,
  ImageElement,
  SectionElement,
} from "../../../../types/element";
import { useBuilderDispatch } from "../../hooks/useBuilderDispatch";
import { useBuilderState } from "../../hooks/useBuilderState";
import { useBuilderUI } from "../../hooks/useBuilderUI";
import { findElement } from "../../services/elementService";

export const useSettingsPanel = () => {
  const template = useBuilderState();
  const dispatch = useBuilderDispatch();
  const { selectedElementId } = useBuilderUI();

  const { pageSettings } = template;

  const selectedElement = selectedElementId
    ? findElement(template.elements, selectedElementId)
    : null;

  const updateElement = (
    id: string,
    changes: Partial<HeadingElement | ParagraphElement | ImageElement | SectionElement>,
  ) => {
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id,
        changes,
      },
    });
  };

  const updatePageSetting = (key: keyof typeof pageSettings, value: string | number) => {
    dispatch({
      type: "UPDATE_PAGE_SETTING",
      payload: {
        key,
        value,
      },
    });
  };

  const handleDuplicate = () => {
    if (!selectedElement) return;
    const newElement = {
      ...selectedElement,
      id: `${selectedElement.id}-${crypto.randomUUID()}`,
    };
    dispatch({
      type: "ADD_ELEMENT",
      payload: { element: newElement, afterId: selectedElement.id },
    });
  };

  const handleRemove = () => {
    if (!selectedElement) return;
    dispatch({ type: "DELETE_ELEMENT", payload: selectedElement.id });
  };

  return {
    selectedElement,
    pageSettings,
    updateElement,
    updatePageSetting,
    handleDuplicate,
    handleRemove,
  };
};
