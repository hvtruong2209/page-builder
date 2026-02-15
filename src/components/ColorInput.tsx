import { useRef } from "react";
import { useDebounced } from "../hooks/useDebounce";

interface CommonColorInputProps {
  value: string;
  label?: string;
  onChange: (value: string) => void;
  onChangeStart?: () => void;
  onChangeEnd?: () => void;
}

export const CommonColorInput = ({
  value,
  label,
  onChange,
  onChangeStart,
  onChangeEnd,
}: CommonColorInputProps) => {
  const isEditing = useRef(false);

  const debouncedChangeEnd = useDebounced<string>(() => {
    onChangeEnd?.();
    isEditing.current = false;
  }, 300);

  const handleChange = (val: string) => {
    if (!isEditing.current) {
      isEditing.current = true;
      onChangeStart?.();
    }
    onChange(val);
    debouncedChangeEnd(val);
  };

  return (
    <div className="common-field__group">
      {label && <label className="common-field__label">{label}</label>}

      <div className="common-field__color-row">
        <input
          type="color"
          value={value}
          className="common-field__color-input"
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
        <input
          type="text"
          className="common-field__input"
          value={value}
          onFocus={() => {
            if (!isEditing.current) {
              isEditing.current = true;
              onChangeStart?.();
            }
          }}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => {
            if (isEditing.current) {
              isEditing.current = false;
              onChangeEnd?.();
            }
          }}
        />
      </div>
    </div>
  );
};
