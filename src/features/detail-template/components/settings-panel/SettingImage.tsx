import type { ImageElement } from "../../../../types/element";
import { CommonSelect } from "../../../../components/Select";
import { CommonSlider } from "../../../../components/Slider";
import { SpacingControls } from "../../../../components/SpacingControls";
import { TextField } from "../../../../components/TextField";
import { ALIGNMENT_OPTIONS, DEFAULT_SPACING } from "../../../../constants/variable";
import { useSettingsDraft } from "./useSettingsDraft";
import { UploadImage } from "../../../../components/UploadImage";

export const SettingImage = ({
  selectedElement,
  updateElement,
}: {
  selectedElement: ImageElement;
  updateElement: (id: string, changes: Partial<ImageElement>) => void;
}) => {
  const { el, updateDraft, beginDraft, commitDraft } = useSettingsDraft({ selectedElement });

  return (
    <>
      <UploadImage
        el={el}
        onElementChange={(changes) => updateElement(el.id, changes)}
        onChangeStart={() => beginDraft(el.id)}
        onChange={(value) => updateDraft({ src: value })}
        onChangeEnd={() => commitDraft()}
      />
      <TextField
        label="Alt Text"
        type="text"
        value={el.alt}
        onChangeStart={() => beginDraft(el.id)}
        onChange={(value) => updateDraft({ alt: value })}
        onChangeEnd={() => commitDraft()}
      />
      <CommonSlider
        label="Width (%)"
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
        value={el.alignment}
        onChange={(alignment) => updateElement(el.id, { alignment: alignment })}
        options={ALIGNMENT_OPTIONS}
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
