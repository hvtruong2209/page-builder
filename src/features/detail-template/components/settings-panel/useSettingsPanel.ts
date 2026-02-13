import { BUILDER_ACTION_TYPE } from "../../../../config/variable";
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
      type: BUILDER_ACTION_TYPE.UPDATE_ELEMENT,
      payload: {
        id,
        changes,
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
      type: BUILDER_ACTION_TYPE.ADD_ELEMENT,
      payload: { element: newElement, afterId: selectedElement.id },
    });
  };

  const handleRemove = () => {
    if (!selectedElement) return;
    dispatch({ type: BUILDER_ACTION_TYPE.DELETE_ELEMENT, payload: selectedElement.id });
  };

  return {
    selectedElement,
    pageSettings,
    updateElement,
    handleDuplicate,
    handleRemove,
  };
};
