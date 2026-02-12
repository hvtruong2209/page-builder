import { CommonColorInput } from "../../../../components/ColorInput";
import { CommonSelect } from "../../../../components/Select";
import { CommonSlider } from "../../../../components/Slider";
import { SpacingControls } from "../../../../components/SpacingControls";
import { TextField } from "../../../../components/TextField";
import { ALIGNMENT_OPTIONS, DEFAULT_SPACING } from "../../../../config/variable";
import type { ParagraphElement } from "../../../../types/element";
import { useBuilderUI } from "../../hooks/useBuilderUI";

export const SettingParagraph = ({
  selectedElement,
  updateElement,
}: {
  selectedElement: ParagraphElement;
  updateElement: (id: string, changes: Partial<ParagraphElement>) => void;
}) => {
  const { draft, updateDraft, beginDraft, commitDraft } = useBuilderUI();
  const el =
    draft && draft.kind === "element" && selectedElement && draft.id === selectedElement.id
      ? { ...selectedElement, ...draft.changes }
      : selectedElement;

  return (
    <>
      <TextField
        label="Text"
        type="textarea"
        className="settings-panel__textarea"
        value={el.text}
        onChange={(value) => updateElement(el.id, { text: value })}
      />
      <CommonSlider
        label="Font size"
        className="settings-panel__range"
        min={10}
        max={36}
        value={el.fontSize}
        onChange={(value) => updateDraft({ fontSize: value })}
        onChangeStart={() => beginDraft(el.id)}
        onChangeEnd={() => commitDraft()}
        amountText={`${el.fontSize}px`}
      />
      <CommonColorInput
        label="Color"
        className="settings-panel__color-input"
        value={el.color}
        onChange={(value: string) => updateElement(el.id, { color: value })}
      />
      <CommonSelect
        label="Alignment"
        className="settings-panel__select"
        value={el.alignment}
        onChange={(alignment) => updateElement(el.id, { alignment: alignment })}
        options={ALIGNMENT_OPTIONS}
      />
      <SpacingControls
        margin={el.margin || DEFAULT_SPACING}
        padding={el.padding || DEFAULT_SPACING}
        onMarginChange={(margin) => updateElement(el.id, { margin })}
        onPaddingChange={(padding) => updateElement(el.id, { padding })}
      />
    </>
  );
};
