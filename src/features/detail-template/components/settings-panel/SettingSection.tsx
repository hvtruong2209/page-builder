import { CommonButton } from "../../../../components";
import { CommonColorInput } from "../../../../components/ColorInput";
import { CommonSlider } from "../../../../components/Slider";
import { SpacingControls } from "../../../../components/SpacingControls";
import { DEFAULT_SPACING } from "../../../../constants/variable";
import type { SectionElement } from "../../../../types/element";
import { useSettingsDraft } from "./useSettingsDraft";

export const SettingSection = ({
  selectedElement,
  updateElement,
}: {
  selectedElement: SectionElement;
  updateElement: (id: string, changes: Partial<SectionElement>) => void;
}) => {
  const { el, updateDraft, beginDraft, commitDraft } = useSettingsDraft({ selectedElement });

  return (
    <>
      <CommonButton
        className="settings-panel__swap-btn"
        onClick={() => updateElement(el.id, { reversed: !el.reversed })}
        text="⇄ Swap Left / Right"
      />
      <CommonSlider
        label="Gap"
        min={0}
        max={64}
        value={el.gap}
        onChangeStart={() => beginDraft(el.id)}
        onChange={(value) => updateDraft({ gap: value })}
        onChangeEnd={() => commitDraft()}
        amountText={`${el.gap}px`}
      />
      <CommonSlider
        label="Border Radius"
        min={0}
        max={32}
        value={el.borderRadius}
        onChangeStart={() => beginDraft(el.id)}
        onChange={(value) => updateDraft({ borderRadius: value })}
        onChangeEnd={() => commitDraft()}
        amountText={`${el.borderRadius}px`}
      />
      <CommonColorInput
        label="Background Color"
        value={el.backgroundColor}
        onChangeEnd={() => commitDraft()}
        onChange={(value) => updateDraft({ backgroundColor: value })}
        onChangeStart={() => beginDraft(el.id)}
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
      <div className="settings-panel__section-children">
        <label className="common-field__label">Children ({el.children.length} elements)</label>
        <p className="settings-panel__hint">
          Click on child elements in the preview to edit them individually.
        </p>
      </div>
    </>
  );
};
