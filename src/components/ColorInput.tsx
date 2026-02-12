interface CommonColorInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
}

export const CommonColorInput = ({ value, onChange, className, label }: CommonColorInputProps) => {
  return (
    <div className="settings-panel__group">
      {label && <label className="settings-panel__label">{label}</label>}
      <div className="settings-panel__color-row">
        <input
          type="color"
          value={value}
          className={className}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          type="text"
          className="settings-panel__input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};
