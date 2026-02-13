import { CommonButton } from "../../../../components/Button";
import { CommonColorInput } from "../../../../components/ColorInput";
import { CommonSlider } from "../../../../components/Slider";
import { SpacingControls } from "../../../../components/SpacingControls";
import { DEFAULT_SPACING } from "../../../../config/variable";
import type { SectionElement } from "../../../../types/element";
import { useBuilderUI } from "../../hooks/useBuilderUI";

export const SettingSection = ({
  selectedElement,
  updateElement,
}: {
  selectedElement: SectionElement;
  updateElement: (id: string, changes: Partial<SectionElement>) => void;
}) => {
  const { draft, updateDraft, beginDraft, commitDraft } = useBuilderUI();
  const el =
    draft && draft.kind === "element" && selectedElement && draft.id === selectedElement.id
      ? { ...selectedElement, ...draft.changes }
      : selectedElement;

  return (
    <>
      <CommonButton
        className="settings-panel__swap-btn"
        onClick={() => updateElement(el.id, { reversed: !el.reversed })}
        text="⇄ Swap Left / Right"
      />
      <CommonSlider
        label="Gap"
        className="settings-panel__range"
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
        className="settings-panel__range"
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
        className="settings-panel__color-input"
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
        <label className="settings-panel__label">Children ({el.children.length} elements)</label>
        <p className="settings-panel__hint">
          Click on child elements in the preview to edit them individually.
        </p>
      </div>
    </>
  );
};
