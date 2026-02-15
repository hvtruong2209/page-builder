import { useRef } from "react";

interface CommonSliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  amountText?: string;
  label?: string;

  onChange: (value: number) => void;
  onChangeStart?: () => void;
  onChangeEnd?: (value: number) => void;
}

export const CommonSlider = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  className,
  amountText,
  label,
  onChange,
  onChangeStart,
  onChangeEnd,
}: CommonSliderProps) => {
  const isDragging = useRef(false);

  return (
    <div className="settings-panel__group">
      {label && <label className="settings-panel__label"> {label}</label>}
      <div className="settings-panel__range-row">
        <input
          type="range"
          className={className}
          min={min}
          max={max}
          step={step}
          value={value}
          onPointerDown={() => {
            isDragging.current = true;
            onChangeStart?.();
          }}
          onChange={(e) => {
            onChange(Number(e.target.value));
          }}
          onPointerUp={(e) => {
            if (!isDragging.current) return;
            isDragging.current = false;
            onChangeEnd?.(Number((e.target as HTMLInputElement).value));
          }}
          onPointerCancel={() => {
            isDragging.current = false;
          }}
        />
        {amountText && <span className="settings-panel__range-value">{amountText}</span>}
      </div>
    </div>
  );
};
