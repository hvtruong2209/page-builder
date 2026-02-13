type TextFieldProps = {
  value?: string;
  onChange?: (value: string) => void;

  /** Draft lifecycle */
  onChangeStart?: () => void;
  onChangeEnd?: () => void;

  type?: "text" | "textarea";
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
};

export const TextField = ({
  value = "",
  onChange,
  onChangeStart,
  onChangeEnd,
  type = "text",
  className = "",
  placeholder,
  disabled = false,
  label,
}: TextFieldProps) => {
  return (
    <div className="settings-panel__group">
      {label && <label className="settings-panel__label">{label}</label>}

      {type === "textarea" ? (
        <textarea
          className={`settings-panel__textarea ${className}`}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={onChangeStart}
          onBlur={onChangeEnd}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : (
        <input
          type="text"
          className={`settings-panel__input ${className}`}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={onChangeStart}
          onBlur={onChangeEnd}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
    </div>
  );
};
