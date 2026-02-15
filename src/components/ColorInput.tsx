import { useRef } from "react";
import { useDebounced } from "../hooks/useDebounce";

interface CommonColorInputProps {
  value: string;
  className?: string;
  label?: string;
  onChange: (value: string) => void;
  onChangeStart?: () => void;
  onChangeEnd?: (value: string) => void;
}

export const CommonColorInput = ({
  value,
  className,
  label,
  onChange,
  onChangeStart,
  onChangeEnd,
}: CommonColorInputProps) => {
  const isEditing = useRef(false);

  const debouncedChangeEnd = useDebounced<string>((val: string) => {
    onChangeEnd?.(val);
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
    <div className="settings-panel__group">
      {label && <label className="settings-panel__label">{label}</label>}

      <div className="settings-panel__color-row">
        <input
          type="color"
          value={value}
          className={className}
          onChange={(e) => handleChange(e.target.value)}
        />

        <input
          type="text"
          className="settings-panel__input"
          value={value}
          onFocus={() => {
            if (!isEditing.current) {
              isEditing.current = true;
              onChangeStart?.();
            }
          }}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </div>
  );
};
