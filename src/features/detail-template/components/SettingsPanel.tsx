import { CommonColorInput } from "../../../components/ColorInput";
import { CommonSelect } from "../../../components/Select";
import { CommonSlider } from "../../../components/Slider";
import { ALIGNMENT_OPTIONS } from "../../../config/variable";
import type { HeadingElement, ParagraphElement, ImageElement } from "../../../types/template";
import { useBuilderDispatch, useTemplate } from "../hooks/useBuilderProvider";
import { useSelectedElement } from "../hooks/useBuilderUIProvider";
import "./SettingsPanel.css";

const SettingsPanel = () => {
  const { selectedElementId } = useSelectedElement();
  const template = useTemplate();
  const dispatch = useBuilderDispatch();
  const { draft, beginDraft, updateDraft, commitDraft, beginPageDraft, updatePageDraft, commitPageDraft } =
    useSelectedElement();

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

  const updateElement = (id: string, changes: Partial<HeadingElement | ParagraphElement | ImageElement>) => {
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id,
        changes,
      },
    });
  };

  if (!selectedElement) {
    const pageSettingsDisplay = draft && draft.kind === "page" ? { ...pageSettings, ...draft.changes } : pageSettings;
    return (
      <div className="settings-panel">
        <h3 className="settings-panel__title">Page Settings</h3>

        <div className="settings-panel__group">
          <label className="settings-panel__label">Background Color</label>
          <div className="settings-panel__color-row">
            <CommonColorInput
              className="settings-panel__color-input"
              value={pageSettings.backgroundColor}
              onChange={(value: string) => updatePageSetting("backgroundColor", value)}
            />
            <input
              type="text"
              className="settings-panel__input"
              value={pageSettings.backgroundColor}
              onChange={(e) => updatePageSetting("backgroundColor", e.target.value)}
            />
          </div>
        </div>

        <div className="settings-panel__group">
          <label className="settings-panel__label">Content Width</label>
          <div className="settings-panel__range-row">
            <CommonSlider
              className="settings-panel__range"
              min={600}
              max={1400}
              value={pageSettingsDisplay.contentWidth}
              onChange={(value) => updatePageDraft({ contentWidth: value })}
              onChangeStart={() => beginPageDraft()}
              onChangeEnd={() => commitPageDraft()}
            />
            <span className="settings-panel__range-value">{pageSettings.contentWidth}px</span>
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
      <div className="settings-panel">
        <div className="settings-panel__header-row">
          <h3 className="settings-panel__title">Heading Settings</h3>
          {/* {onDuplicate && (
            <button className="settings-panel__duplicate-btn" onClick={onDuplicate}>
              ⧉ Duplicate
            </button>
          )} */}
        </div>
        <div className="settings-panel__group">
          <label className="settings-panel__label">Text</label>
          <textarea
            className="settings-panel__textarea"
            value={el.text}
            onChange={(e) => {
              updateElement(el.id, { text: e.target.value });
            }}
          />
        </div>
        <div className="settings-panel__group">
          <label className="settings-panel__label">Font Size</label>
          <div className="settings-panel__range-row">
            <CommonSlider
              className="settings-panel__range"
              min={12}
              max={72}
              value={el.fontSize}
              onChange={(value) => updateDraft({ fontSize: value })}
              onChangeStart={() => beginDraft(el.id)}
              onChangeEnd={() => commitDraft()}
            />
            <span className="settings-panel__range-value">{el.fontSize}px</span>
          </div>
        </div>
        <div className="settings-panel__group">
          <label className="settings-panel__label">Color</label>
          <div className="settings-panel__color-row">
            <CommonColorInput
              className="settings-panel__color-input"
              value={el.color}
              onChange={(value: string) => updateElement(el.id, { color: value })}
            />
            <input
              type="text"
              className="settings-panel__input"
              value={el.color}
              onChange={(e) => updateElement(el.id, { color: e.target.value })}
            />
          </div>
        </div>
        <div className="settings-panel__group">
          <label className="settings-panel__label">Alignment</label>
          <CommonSelect
            className="settings-panel__select"
            value={el.alignment}
            onChange={(alignment) => updateElement(el.id, { alignment: alignment })}
            options={ALIGNMENT_OPTIONS}
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
      <div className="settings-panel">
        <div className="settings-panel__header-row">
          <h3 className="settings-panel__title">Paragraph Settings</h3>
          {/* {onDuplicate && (
            <button className="settings-panel__duplicate-btn" onClick={onDuplicate}>
              ⧉ Duplicate
            </button>
          )} */}
        </div>
        <div className="settings-panel__group">
          <label className="settings-panel__label">Text</label>
          <textarea
            className="settings-panel__textarea"
            value={el.text}
            onChange={(e) => {
              updateElement(el.id, { text: e.target.value });
            }}
          />
        </div>
        <div className="settings-panel__group">
          <label className="settings-panel__label">Font Size</label>
          <div className="settings-panel__range-row">
            <CommonSlider
              className="settings-panel__range"
              min={10}
              max={36}
              value={el.fontSize}
              onChange={(value) => updateDraft({ fontSize: value })}
              onChangeStart={() => beginDraft(el.id)}
              onChangeEnd={() => commitDraft()}
            />
            <span className="settings-panel__range-value">{el.fontSize}px</span>
          </div>
        </div>
        <div className="settings-panel__group">
          <label className="settings-panel__label">Color</label>
          <div className="settings-panel__color-row">
            <CommonColorInput
              className="settings-panel__color-input"
              value={el.color}
              onChange={(value: string) => updateElement(el.id, { color: value })}
            />
            <input
              type="text"
              className="settings-panel__input"
              value={el.color}
              onChange={(e) => updateElement(el.id, { color: e.target.value })}
            />
          </div>
        </div>
        <div className="settings-panel__group">
          <label className="settings-panel__label">Alignment</label>
          <CommonSelect
            className="settings-panel__select"
            value={el.alignment}
            onChange={(alignment) => updateElement(el.id, { alignment: alignment })}
            options={ALIGNMENT_OPTIONS}
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
      <div className="settings-panel">
        <div className="settings-panel__header-row">
          <h3 className="settings-panel__title">Image Settings</h3>
          {/* {onDuplicate && (
            <button className="settings-panel__duplicate-btn" onClick={onDuplicate}>
              ⧉ Duplicate
            </button>
          )} */}
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
            <span className="settings-panel__upload-name">{el.src.startsWith("data:") ? "Uploaded ✓" : "No file"}</span>
          </div>
          <input
            type="text"
            className="settings-panel__input"
            placeholder="Or paste image URL..."
            value={el.src.startsWith("data:") ? "" : el.src}
            onChange={(e) => updateElement(el.id, { src: e.target.value })}
          />
        </div>
        <div className="settings-panel__group">
          <label className="settings-panel__label">Alt Text</label>
          <input
            type="text"
            className="settings-panel__input"
            value={el.alt}
            onChange={(e) => updateElement(el.id, { alt: e.target.value })}
          />
        </div>
        <div className="settings-panel__group">
          <label className="settings-panel__label">Width (%)</label>
          <div className="settings-panel__range-row">
            <CommonSlider
              className="settings-panel__range"
              min={10}
              max={100}
              value={el.width}
              onChange={(value) => updateDraft({ width: value })}
              onChangeStart={() => beginDraft(el.id)}
              onChangeEnd={() => commitDraft()}
            />

            <span className="settings-panel__range-value">{el.width}%</span>
          </div>
        </div>
        <div className="settings-panel__group">
          <label className="settings-panel__label">Alignment</label>
          <CommonSelect
            className="settings-panel__select"
            value={el.alignment}
            onChange={(alignment) => updateElement(el.id, { alignment: alignment })}
            options={ALIGNMENT_OPTIONS}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default SettingsPanel;
