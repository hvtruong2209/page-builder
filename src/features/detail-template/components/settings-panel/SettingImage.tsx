import { CommonSelect } from "../../../../components/Select";
import { CommonSlider } from "../../../../components/Slider";
import { SpacingControls } from "../../../../components/SpacingControls";
import { TextField } from "../../../../components/TextField";
import { ALIGNMENT_OPTIONS, DEFAULT_SPACING } from "../../../../config/variable";
import type { ImageElement } from "../../../../types/element";
import { useBuilderUI } from "../../hooks/useBuilderUI";

export const SettingImage = ({
  selectedElement,
  updateElement,
}: {
  selectedElement: ImageElement;
  updateElement: (id: string, changes: Partial<ImageElement>) => void;
}) => {
  const { draft, updateDraft, beginDraft, commitDraft } = useBuilderUI();
  const el =
    draft && draft.kind === "element" && selectedElement && draft.id === selectedElement.id
      ? { ...selectedElement, ...draft.changes }
      : selectedElement;

  return (
    <>
      <TextField
        label="Alt Text"
        type="text"
        className="settings-panel__input"
        value={el.alt}
        onChange={(value) => updateElement(el.id, { alt: value })}
      />
      <CommonSlider
        label="Width (%)"
        className="settings-panel__range"
        min={10}
        max={100}
        value={el.width}
        onChange={(value) => updateDraft({ width: value })}
        onChangeStart={() => beginDraft(el.id)}
        onChangeEnd={() => commitDraft()}
        amountText={`${el.width}%`}
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
