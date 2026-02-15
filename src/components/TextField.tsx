interface TextFieldProps {
  value?: string;
  type?: "text" | "textarea";
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;

  onChange?: (value: string) => void;
  onChangeStart?: () => void;
  onChangeEnd?: () => void;
}

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
    <div className="common-field__group">
      {label && <label className="common-field__label">{label}</label>}

      {type === "textarea" ? (
        <textarea
          className={`common-field__textarea ${className}`}
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
          className={`common-field__input ${className}`}
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
