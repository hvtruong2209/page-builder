import { useRef, useState, useEffect } from "react";
import { useDebounced } from "../hooks/useDebounce";

interface CommonColorInputProps {
  value: string;
  label?: string;
  onChange: (value: string) => void;
  onChangeStart?: () => void;
  onChangeEnd?: () => void;
}

const isValidHex = (val: string) => /^#([0-9A-Fa-f]{6})$/.test(val);

export const CommonColorInput = ({
  value,
  label,
  onChange,
  onChangeStart,
  onChangeEnd,
}: CommonColorInputProps) => {
  const isEditing = useRef(false);

  const [textValue, setTextValue] = useState(value);

  useEffect(() => {
    setTextValue(value);
  }, [value]);

  const debouncedChangeEnd = useDebounced<string>(() => {
    onChangeEnd?.();
    isEditing.current = false;
  }, 300);

  const handleColorChange = (val: string) => {
    if (!isEditing.current) {
      isEditing.current = true;
      onChangeStart?.();
    }

    setTextValue(val);
    onChange(val);

    debouncedChangeEnd(val);
  };

  const handleTextChange = (val: string) => {
    setTextValue(val);

    if (!isEditing.current) {
      isEditing.current = true;
      onChangeStart?.();
    }

    if (isValidHex(val)) {
      onChange(val);
    }
  };

  const handleBlur = () => {
    if (!isEditing.current) return;

    isEditing.current = false;

    if (!isValidHex(textValue)) {
      setTextValue(value);
      return;
    }

    if (textValue === value) {
      return;
    }

    onChangeEnd?.();
  };

  return (
    <div className="common-field__group">
      {label && <label className="common-field__label">{label}</label>}

      <div className="common-field__color-row">
        {/* color picker */}
        <input
          type="color"
          value={isValidHex(value) ? value : "#000000"}
          className="common-field__color-input"
          onChange={(e) => handleColorChange(e.target.value)}
        />

        {/* text input */}
        <input
          type="text"
          className="common-field__input"
          value={textValue}
          onFocus={() => {
            if (!isEditing.current) {
              isEditing.current = true;
              onChangeStart?.();
            }
          }}
          onChange={(e) => handleTextChange(e.target.value)}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};
