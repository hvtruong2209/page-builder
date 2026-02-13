import { useRef } from "react";

interface CommonColorInputProps {
  value: string;
  onChange: (value: string) => void;

  /** draft lifecycle */
  onChangeStart?: () => void;
  onChangeEnd?: (value: string) => void;

  className?: string;
  label?: string;
}

export const CommonColorInput = ({
  value,
  onChange,
  onChangeStart,
  onChangeEnd,
  className,
  label,
}: CommonColorInputProps) => {
  const isEditing = useRef(false);

  return (
    <div className="settings-panel__group">
      {label && <label className="settings-panel__label">{label}</label>}

      <div className="settings-panel__color-row">
        {/* color picker */}
        <input
          type="color"
          value={value}
          className={className}
          onChange={(e) => {
            const val = e.target.value;
            if (!isEditing.current) {
              isEditing.current = true;
              onChangeStart?.();
            }
            onChange(val);
            // need to improve UX here - color picker doesn't have onBlur or similar event
            onChangeEnd?.(val);
            isEditing.current = false;
          }}
        />

        {/* hex input */}
        <input
          type="text"
          className="settings-panel__input"
          value={value}
          onFocus={onChangeStart}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => onChangeEnd?.(e.target.value)}
        />
      </div>
    </div>
  );
};
