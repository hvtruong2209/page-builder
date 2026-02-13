import type { Spacing } from "../types/styles";

type Props = {
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

export const SpacingInput = ({ label, value, onChangeStart, onChange, onChangeEnd }: Props) => {
  const sides = ["Top", "Right", "Bottom", "Left"];
  return (
    <div className="settings-panel__group">
      <label className="settings-panel__label">{label}</label>

      <div className="settings-panel__spacing-grid">
        {sides.map((side) => (
          <div key={side} className="settings-panel__spacing-item">
            <label className="settings-panel__spacing-label">{side}</label>
            <input
              type="number"
              className="settings-panel__spacing-input"
              min={label === "Margin" ? -200 : 0}
              max={200}
              value={value[side.toLowerCase() as keyof Spacing]}
              onChange={(e) =>
                onChange?.({
                  ...value,
                  [side.toLowerCase() as keyof Spacing]: Number(e.target.value),
                })
              }
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
