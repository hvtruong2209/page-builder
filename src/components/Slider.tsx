import { useRef } from "react";

interface CommonSliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
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
  amountText,
  label,
  onChange,
  onChangeStart,
  onChangeEnd,
}: CommonSliderProps) => {
  const isDragging = useRef(false);

  return (
    <div className="common-field__group">
      {label && <label className="common-field__label"> {label}</label>}
      <div className="common-field__range-row">
        <input
          type="range"
          className={"common-field__range"}
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
        {amountText && <span className="common-field__range-value">{amountText}</span>}
      </div>
    </div>
  );
};
