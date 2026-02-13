interface Option<T extends string> {
  label: string;
  value: T;
}

interface CommonSelectProps<T extends string> {
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  className?: string;
  label?: string;
}

export const CommonSelect = <T extends string>({
  value,
  options,
  onChange,
  className,
  label,
}: CommonSelectProps<T>) => {
  return (
    <div className="settings-panel__group">
      {!!label && <label className="settings-panel__label">{label}</label>}
      <select className={className} value={value} onChange={(e) => onChange(e.target.value as T)}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
