import { BUILDER_ACTION_TYPE } from "../../../../constants/variable";
import type {
  HeadingElement,
  ParagraphElement,
  ImageElement,
  SectionElement,
} from "../../../../types/element";
import { useBuilderActions } from "../../hooks/useBuilderActions";
import { useBuilderState } from "../../hooks/useBuilderState";
import { useBuilderUIState } from "../../hooks/useBuilderUIState";
import { duplicateElementTree, findElementTree } from "../../services/elementService";

export const useSettingsPanel = () => {
  const { dispatch } = useBuilderActions();
  const { template } = useBuilderState();
  const { selectedElementId } = useBuilderUIState();

  const { pageSettings } = template;
  const selectedElement = selectedElementId
    ? findElementTree(template.elements, selectedElementId)
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
    const newElement = duplicateElementTree(selectedElement);
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
