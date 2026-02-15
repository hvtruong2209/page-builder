import type { ImageElement } from "../types/element";

export const UploadImage = ({
  el,
  onElementChange,
  onChange,
  onChangeStart,
  onChangeEnd,
}: {
  el: ImageElement;
  onElementChange: (el: ImageElement) => void;
  onChange?: (value: string) => void;
  onChangeStart?: () => void;
  onChangeEnd?: () => void;
}) => {
  return (
    <div className="common-field__group">
      <label className="common-field__label">Image</label>
      <div className="common-field__upload-row">
        <label className="common-field__upload-btn">
          🗂️ Upload
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => onElementChange({ ...el, src: reader.result as string });
              e.target.value = "";
              reader.readAsDataURL(file);
            }}
          />
        </label>
        <span className="common-field__upload-name">
          {el.src.startsWith("data:") ? "Uploaded ✓" : "No file"}
        </span>
      </div>
      <input
        type="text"
        className="common-field__input"
        placeholder="Or paste image URL..."
        value={el.src.startsWith("data:") ? "" : el.src}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={onChangeStart}
        onBlur={onChangeEnd}
      />
    </div>
  );
};
