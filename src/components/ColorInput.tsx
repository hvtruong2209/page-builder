interface CommonColorInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function CommonColorInput({
  value,
  onChange,
  className,
}: CommonColorInputProps) {
  return (
    <input
      type="color"
      value={value}
      className={className}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
