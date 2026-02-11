import { CommonColorInput } from "../../../components/ColorInput";
import { CommonSelect } from "../../../components/Select";
import { CommonSlider } from "../../../components/Slider";
import { TextField } from "../../../components/TextField";
import { ALIGNMENT_OPTIONS } from "../../../config/variable";
import type { HeadingElement, ParagraphElement, ImageElement } from "../../../types/template";
import { useBuilderDispatch, useTemplate } from "../hooks/useBuilderProvider";
import { useSelectedElement } from "../hooks/useBuilderUIProvider";
import "./SettingsPanel.css";

const SettingsPanel = () => {
  const { selectedElementId } = useSelectedElement();
  const template = useTemplate();
  const dispatch = useBuilderDispatch();
  const {
    draft,
    beginDraft,
    updateDraft,
    commitDraft,
    beginPageDraft,
    updatePageDraft,
    commitPageDraft,
  } = useSelectedElement();

  const { pageSettings } = template;

  const selectedElement = selectedElementId
    ? (template.elements.find((e) => e.id === selectedElementId) ?? null)
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
    changes: Partial<HeadingElement | ParagraphElement | ImageElement>,
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
        <button
          className="settings-panel__duplicate-btn"
          onClick={handleDuplicate}
          title="Duplicate Element"
        >
          ⧉
        </button>
        <button
          className="settings-panel__duplicate-btn"
          onClick={handleRemove}
          title="Remove Element"
        >
          🗑️
        </button>
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
          <div className="settings-panel__group">
            <CommonColorInput
              label="Background Color"
              className="settings-panel__color-input"
              value={pageSettings.backgroundColor}
              onChange={(value: string) => updatePageSetting("backgroundColor", value)}
            />
          </div>
          <div className="settings-panel__group">
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
          <div className="settings-panel__group">
            <TextField
              label="Text"
              type="textarea"
              className="settings-panel__textarea"
              value={el.text}
              onChange={(value) => updateElement(el.id, { text: value })}
            />
          </div>
          <div className="settings-panel__group">
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
          </div>
          <div className="settings-panel__group">
            <CommonColorInput
              label="Color"
              className="settings-panel__color-input"
              value={el.color}
              onChange={(value: string) => updateElement(el.id, { color: value })}
            />
          </div>
          <div className="settings-panel__group">
            <CommonSelect
              label="Alignment"
              className="settings-panel__select"
              value={el.alignment}
              onChange={(alignment) => updateElement(el.id, { alignment: alignment })}
              options={ALIGNMENT_OPTIONS}
            />
          </div>
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
          <div className="settings-panel__group">
            <TextField
              label="Text"
              type="textarea"
              className="settings-panel__textarea"
              value={el.text}
              onChange={(value) => updateElement(el.id, { text: value })}
            />
          </div>
          <div className="settings-panel__group">
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
          </div>
          <div className="settings-panel__group">
            <CommonColorInput
              label="Color"
              className="settings-panel__color-input"
              value={el.color}
              onChange={(value: string) => updateElement(el.id, { color: value })}
            />
          </div>
          <div className="settings-panel__group">
            <CommonSelect
              label="Alignment"
              className="settings-panel__select"
              value={el.alignment}
              onChange={(alignment) => updateElement(el.id, { alignment: alignment })}
              options={ALIGNMENT_OPTIONS}
            />
          </div>
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
          <div className="settings-panel__group">
            <TextField
              label="Alt Text"
              type="text"
              className="settings-panel__input"
              value={el.alt}
              onChange={(value) => updateElement(el.id, { alt: value })}
            />
          </div>
          <div className="settings-panel__group">
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
          </div>
          <div className="settings-panel__group">
            <CommonSelect
              label="Alignment"
              className="settings-panel__select"
              value={el.alignment}
              onChange={(alignment) => updateElement(el.id, { alignment: alignment })}
              options={ALIGNMENT_OPTIONS}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SettingsPanel;
