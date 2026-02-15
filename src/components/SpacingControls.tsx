import type { Spacing } from "../types/styles";

type SpacingInputProps = {
  label: string;
  value: Spacing;

  onChangeStart?: () => void;
  onChange?: (value: Spacing) => void;
  onChangeEnd?: () => void;
};

export const SpacingControls = ({
  margin,
  padding,
  onChangeStart,
  onMarginChange,
  onPaddingChange,
  onChangeEnd,
}: {
  margin: Spacing;
  padding: Spacing;
  onChangeStart?: () => void;
  onMarginChange: (value: Spacing) => void;
  onPaddingChange: (value: Spacing) => void;
  onChangeEnd?: () => void;
}) => {
  return (
    <>
      <SpacingInput
        label="Margin"
        value={margin}
        onChangeStart={onChangeStart}
        onChange={onMarginChange}
        onChangeEnd={onChangeEnd}
      />
      <SpacingInput
        label="Padding"
        value={padding}
        onChangeStart={onChangeStart}
        onChange={onPaddingChange}
        onChangeEnd={onChangeEnd}
      />
    </>
  );
};

const SpacingInput = ({
  label,
  value,
  onChangeStart,
  onChange,
  onChangeEnd,
}: SpacingInputProps) => {
  const sides = ["Top", "Right", "Bottom", "Left"];
  return (
    <div className="common-field__group">
      <label className="common-field__label">{label}</label>

      <div className="common-field__spacing-grid">
        {sides.map((side) => (
          <div key={side} className="common-field__spacing-item">
            <label className="common-field__spacing-label">{side}</label>
            <input
              type="number"
              className="common-field__spacing-input"
              min={label === "Margin" ? -200 : 0}
              max={200}
              value={value[side.toLowerCase() as keyof Spacing]}
              onChange={(e) => {
                const val = e.target.value;
                if (/^-?\d*$/.test(val)) {
                  onChange?.({
                    ...value,
                    [side.toLowerCase() as keyof Spacing]: Number(e.target.value),
                  });
                }
              }}
              onFocus={onChangeStart}
              onBlur={onChangeEnd}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  (e.target as HTMLInputElement).blur();
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
