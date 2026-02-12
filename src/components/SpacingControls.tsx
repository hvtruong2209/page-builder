import type { Spacing } from "../types/styles";

export const SpacingControls = ({
  margin,
  padding,
  onMarginChange,
  onPaddingChange,
}: {
  margin: Spacing;
  padding: Spacing;
  onMarginChange: (v: Spacing) => void;
  onPaddingChange: (v: Spacing) => void;
}) => {
  return (
    <>
      <SpacingInput label="Margin" value={margin} onChange={onMarginChange} />
      <SpacingInput label="Padding" value={padding} onChange={onPaddingChange} />
    </>
  );
};

const SpacingInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Spacing;
  onChange: (value: Spacing) => void;
}) => {
  const sides: (keyof Spacing)[] = ["top", "right", "bottom", "left"];
  return (
    <div className="settings-panel__group">
      <label className="settings-panel__label">{label}</label>
      <div className="settings-panel__spacing-grid">
        {sides.map((side) => (
          <div key={side} className="settings-panel__spacing-item">
            <label className="settings-panel__spacing-label">{side.charAt(0).toUpperCase()}</label>
            <input
              type="number"
              className="settings-panel__spacing-input"
              min={0}
              max={200}
              value={value[side]}
              onChange={(e) => onChange({ ...value, [side]: Number(e.target.value) })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
