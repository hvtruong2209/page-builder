import { CommonColorInput } from "../../../../components/ColorInput";
import { CommonSelect } from "../../../../components/Select";
import { CommonSlider } from "../../../../components/Slider";
import { SpacingControls } from "../../../../components/SpacingControls";
import { TextField } from "../../../../components/TextField";
import {
  ALIGNMENT_OPTIONS,
  DEFAULT_SPACING,
  FONT_STYLE_OPTIONS,
  FONT_WEIGHT_OPTIONS,
} from "../../../../config/variable";
import type { HeadingElement } from "../../../../types/element";
import type { FontStyle, FontWeight } from "../../../../types/styles";

import { useBuilderUI } from "../../hooks/useBuilderUI";

export const SettingHeading = ({
  selectedElement,
  updateElement,
}: {
  selectedElement: HeadingElement;
  updateElement: (id: string, changes: Partial<HeadingElement>) => void;
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
        value={el.text}
        onChangeStart={() => beginDraft(el.id)}
        onChange={(value) => updateDraft({ text: value })}
        onChangeEnd={() => commitDraft()}
      />
      <CommonSlider
        label="Font Size"
        className="settings-panel__range"
        min={12}
        max={72}
        value={el.fontSize}
        onChangeStart={() => beginDraft(el.id)}
        onChange={(value) => updateDraft({ fontSize: value })}
        onChangeEnd={() => commitDraft()}
        amountText={`${el.fontSize}px`}
      />
      <CommonColorInput
        label="Color"
        className="settings-panel__color-input"
        value={el.color}
        onChangeStart={() => beginDraft(el.id)}
        onChange={(value) => updateDraft({ color: value })}
        onChangeEnd={() => commitDraft()}
      />
      <CommonSelect
        label="Alignment"
        className="settings-panel__select"
        value={el.alignment}
        onChange={(alignment) => updateElement(el.id, { alignment: alignment })}
        options={ALIGNMENT_OPTIONS}
      />
      <CommonSelect
        label="Font Weight"
        className="settings-panel__select"
        value={el.fontWeight}
        onChange={(fontWeight) => updateElement(el.id, { fontWeight: fontWeight as FontWeight })}
        options={FONT_WEIGHT_OPTIONS}
      />
      <CommonSelect
        label="Font Style"
        className="settings-panel__select"
        value={el.fontStyle}
        onChange={(fontStyle) => updateElement(el.id, { fontStyle: fontStyle as FontStyle })}
        options={FONT_STYLE_OPTIONS}
      />
      <SpacingControls
        margin={el.margin || DEFAULT_SPACING}
        padding={el.padding || DEFAULT_SPACING}
        onChangeStart={() => beginDraft(el.id)}
        onMarginChange={(value) => {
          updateDraft({ margin: { ...value } });
        }}
        onPaddingChange={(value) => updateDraft({ padding: value })}
        onChangeEnd={() => commitDraft()}
      />
    </>
  );
};
