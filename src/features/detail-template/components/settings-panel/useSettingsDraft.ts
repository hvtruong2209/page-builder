import type { TemplateElement } from "../../../../types/element";
import { useBuilderUIActions } from "../../hooks/useBuilderUIActions";
import { useBuilderUIState } from "../../hooks/useBuilderUIState";

export const useSettingsDraft = <T extends TemplateElement>({
  selectedElement,
}: {
  selectedElement: T;
}) => {
  const { draft } = useBuilderUIState();
  const { updateDraft, beginDraft, commitDraft } = useBuilderUIActions();
  const el =
    draft && draft.kind === "element" && selectedElement && draft.id === selectedElement.id
      ? { ...selectedElement, ...draft.changes }
      : selectedElement;

  return { el, updateDraft, beginDraft, commitDraft };
};
