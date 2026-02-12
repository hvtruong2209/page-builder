type TextFieldProps = {
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "textarea";
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
};

export const TextField = ({
  value = "",
  onChange,
  type = "text",
  className = "",
  placeholder,
  disabled = false,
  label,
}: TextFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  if (type === "textarea") {
    return (
      <div className="settings-panel__group">
        {label && <label className="settings-panel__label">{label}</label>}
        <textarea
          className={`settings-panel__textarea ${className}`}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    );
  }

  return (
    <div className="settings-panel__group">
      {label && <label className="settings-panel__label">Alt Text</label>}
      <input
        type="text"
        className={`settings-panel__input ${className}`}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};
