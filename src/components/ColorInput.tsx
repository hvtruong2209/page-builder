import { TextField } from "./TextField";

interface CommonColorInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
}

export function CommonColorInput({ value, onChange, className, label }: CommonColorInputProps) {
  return (
    <>
      {label && <label className="settings-panel__label">{label}</label>}
      <div className="settings-panel__color-row">
        <input
          type="color"
          value={value}
          className={className}
          onChange={(e) => onChange(e.target.value)}
        />
        <TextField
          type="text"
          className="settings-panel__input"
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
}
