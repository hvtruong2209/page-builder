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
  const { draft } = useBuilderUI();
  const el =
    draft && draft.kind === "element" && selectedElement && draft.id === selectedElement.id
      ? { ...selectedElement, ...draft.changes }
      : selectedElement;

  return (
    <>
      <div className="settings-panel__group">
        <button
          className="settings-panel__swap-btn"
          // onClick={() => onElementChange({ ...el, reversed: !el.reversed })}
        >
          ⇄ Swap Left / Right
        </button>
      </div>
      <CommonSlider
        label="Gap"
        className="settings-panel__range"
        min={0}
        max={64}
        value={el.gap}
        onChange={(value) => updateElement(el.id, { gap: value })}
        amountText={`${el.gap}px`}
      />
      <CommonSlider
        label="Border Radius"
        className="settings-panel__range"
        min={0}
        max={32}
        value={el.borderRadius}
        onChange={(value) => updateElement(el.id, { borderRadius: value })}
        amountText={`${el.borderRadius}px`}
      />
      <CommonColorInput
        label="Background Color"
        className="settings-panel__color-input"
        value={el.backgroundColor}
        onChange={(value: string) => updateElement(el.id, { backgroundColor: value })}
      />
      <SpacingControls
        margin={el.margin || DEFAULT_SPACING}
        padding={el.padding || DEFAULT_SPACING}
        onMarginChange={(margin) => updateElement(el.id, { margin })}
        onPaddingChange={(padding) => updateElement(el.id, { padding })}
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
