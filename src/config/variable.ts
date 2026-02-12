import type { TextAlignment, Spacing } from "../types/styles";

export const ALIGNMENT_OPTIONS: { label: string; value: TextAlignment }[] = [
  { label: "Left", value: "left" },
  { label: "Center", value: "center" },
  { label: "Right", value: "right" },
];

export const DEFAULT_SPACING: Spacing = { top: 0, right: 0, bottom: 0, left: 0 };
