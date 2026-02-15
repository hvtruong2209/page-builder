interface Option<T extends string> {
  label: string;
  value: T;
}

interface CommonSelectProps<T extends string> {
  value: T;
  options: Option<T>[];
  label?: string;
  onChange: (value: T) => void;
}

export const CommonSelect = <T extends string>({
  value,
  options,
  onChange,
  label,
}: CommonSelectProps<T>) => {
  return (
    <div className="common-field__group">
      {!!label && <label className="common-field__label">{label}</label>}
      <select
        className="common-field__select"
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
