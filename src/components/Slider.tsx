import { useRef } from "react";

type CommonSliderProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  className?: string;

  onChange: (value: number) => void;
  onChangeStart?: () => void;
  onChangeEnd?: (value: number) => void;
};

export function CommonSlider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  onChangeStart,
  onChangeEnd,
  className,
}: CommonSliderProps) {
  const isDragging = useRef(false);

  return (
    <input
      type="range"
      className={className}
      min={min}
      max={max}
      step={step}
      value={value}
      // ⭐ START
      onPointerDown={() => {
        isDragging.current = true;
        onChangeStart?.();
      }}
      // realtime
      onChange={(e) => {
        onChange(Number(e.target.value));
      }}
      // ⭐ END
      onPointerUp={(e) => {
        if (!isDragging.current) return;

        isDragging.current = false;
        onChangeEnd?.(Number((e.target as HTMLInputElement).value));
      }}
      // ⭐ cực quan trọng (nhiều dev quên)
      onPointerCancel={() => {
        isDragging.current = false;
      }}
    />
  );
}
