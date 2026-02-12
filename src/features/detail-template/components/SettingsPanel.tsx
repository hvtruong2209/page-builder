import { CommonButton } from "../../../components/Button";
import { CommonColorInput } from "../../../components/ColorInput";
import { CommonSelect } from "../../../components/Select";
import { CommonSlider } from "../../../components/Slider";
import { SpacingControls } from "../../../components/SpacingControls";
import { TextField } from "../../../components/TextField";
import { ALIGNMENT_OPTIONS, DEFAULT_SPACING } from "../../../config/variable";
import {
  type HeadingElement,
  type ParagraphElement,
  type ImageElement,
  type SectionElement,
} from "../../../types/element";
import { useBuilderDispatch } from "../hooks/useBuilderDispatch";
import { useBuilderState } from "../hooks/useBuilderState";
import { useBuilderUI } from "../hooks/useBuilderUI";
import { findElement } from "../services/elementService";

import "./SettingsPanel.css";

const SettingsPanel = () => {
  const template = useBuilderState();
  const dispatch = useBuilderDispatch();
  const {
    selectedElementId,
    draft,
    beginDraft,
    updateDraft,
    commitDraft,
    beginPageDraft,
    updatePageDraft,
    commitPageDraft,
  } = useBuilderUI();

  const { pageSettings } = template;

  const selectedElement = selectedElementId
    ? findElement(template.elements, selectedElementId)
    : null;

  const updatePageSetting = (key: keyof typeof pageSettings, value: string | number) => {
    dispatch({
      type: "UPDATE_PAGE_SETTING",
      payload: {
        key,
        value,
      },
    });
  };

  const updateElement = (
    id: string,
    changes: Partial<HeadingElement | ParagraphElement | ImageElement | SectionElement>,
  ) => {
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id,
        changes,
      },
    });
  };

  const duplicateButton = () => {
    const handleDuplicate = () => {
      if (!selectedElement) return;
      const newElement = {
        ...selectedElement,
        id: `${selectedElement.id}-${crypto.randomUUID()}`,
      };
      dispatch({
        type: "ADD_ELEMENT",
        payload: { element: newElement, afterId: selectedElement.id },
      });
    };

    const handleRemove = () => {
      if (!selectedElement) return;
      dispatch({ type: "DELETE_ELEMENT", payload: selectedElement.id });
    };

    return (
      <div>
        <CommonButton
          className="settings-panel__duplicate-btn"
          onClick={handleDuplicate}
          title="Duplicate Element"
          text="⧉"
        />
        <CommonButton
          className="settings-panel__duplicate-btn"
          onClick={handleRemove}
          title="Remove Element"
          text="🗑️"
        />
      </div>
    );
  };

  if (!selectedElement) {
    const pageSettingsDisplay =
      draft && draft.kind === "page" ? { ...pageSettings, ...draft.changes } : pageSettings;
    return (
      <div className="builder__settings-pane">
        <div className="settings-panel">
          <h3 className="settings-panel__title">Page Settings</h3>
          <CommonColorInput
            label="Background Color"
            className="settings-panel__color-input"
            value={pageSettingsDisplay.backgroundColor}
            onChange={(value: string) => updatePageSetting("backgroundColor", value)}
          />
          <CommonSlider
            label="Content Width"
            className="settings-panel__range"
            min={600}
            max={1400}
            value={pageSettingsDisplay.contentWidth}
            onChange={(value) => updatePageDraft({ contentWidth: value })}
            onChangeStart={() => beginPageDraft()}
            onChangeEnd={() => commitPageDraft()}
            amountText={`${pageSettingsDisplay.contentWidth}px`}
          />
        </div>
      </div>
    );
  }

  if (selectedElement.type === "heading") {
    const el =
      draft && draft.kind === "element" && draft.id === selectedElement.id
        ? { ...selectedElement, ...draft.changes }
        : (selectedElement as HeadingElement);

    return (
      <div className="builder__settings-pane">
        <div className="settings-panel">
          <div className="settings-panel__header-row">
            <h3 className="settings-panel__title">Heading Settings</h3>
            {duplicateButton()}
          </div>
          <TextField
            label="Text"
            type="textarea"
            className="settings-panel__textarea"
            value={el.text}
            onChange={(value) => updateElement(el.id, { text: value })}
          />
          <CommonSlider
            label="Font Size"
            className="settings-panel__range"
            min={12}
            max={72}
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
        </div>
      </div>
    );
  }

  if (selectedElement.type === "paragraph") {
    const el =
      draft && draft.kind === "element" && draft.id === selectedElement.id
        ? { ...selectedElement, ...draft.changes }
        : (selectedElement as ParagraphElement);
    return (
      <div className="builder__settings-pane">
        <div className="settings-panel">
          <div className="settings-panel__header-row">
            <h3 className="settings-panel__title">Paragraph Settings</h3>
            {duplicateButton()}
          </div>
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
        </div>
      </div>
    );
  }

  if (selectedElement.type === "image") {
    const el =
      draft && draft.kind === "element" && draft.id === selectedElement.id
        ? { ...selectedElement, ...draft.changes }
        : (selectedElement as ImageElement);
    return (
      <div className="builder__settings-pane">
        <div className="settings-panel">
          <div className="settings-panel__header-row">
            <h3 className="settings-panel__title">Image Settings</h3>
            {duplicateButton()}
          </div>
          <div className="settings-panel__group">
            <label className="settings-panel__label">Image</label>
            <div className="settings-panel__upload-row">
              <label className="settings-panel__upload-btn">
                📁 Upload
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => updateElement(el.id, { src: reader.result as string });
                    reader.readAsDataURL(file);
                  }}
                />
              </label>
              <span className="settings-panel__upload-name">
                {el.src.startsWith("data:") ? "Uploaded ✓" : "No file"}
              </span>
            </div>
            <TextField
              type="text"
              className="settings-panel__input"
              placeholder="Or paste image URL..."
              value={el.src.startsWith("data:") ? "" : el.src}
              onChange={(value) => updateElement(el.id, { src: value })}
            />
          </div>
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
        </div>
      </div>
    );
  }

  if (selectedElement.type === "section") {
    const el = selectedElement as SectionElement;
    return (
      <div className="settings-panel">
        <div className="settings-panel__header-row">
          <h3 className="settings-panel__title">Section Settings</h3>
          {duplicateButton()}
        </div>
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
      </div>
    );
  }

  return null;
};

export default SettingsPanel;
