import type { TextAlignment, Spacing } from "../types/styles";

export const ALIGNMENT_OPTIONS: { label: string; value: TextAlignment }[] = [
  { label: "Left", value: "left" },
  { label: "Center", value: "center" },
  { label: "Right", value: "right" },
];

export const FONT_WEIGHT_OPTIONS: { label: string; value: string }[] = [
  { label: "Light (300)", value: "300" },
  { label: "Normal (400)", value: "normal" },
  { label: "Medium (500)", value: "500" },
  { label: "Semi Bold (600)", value: "600" },
  { label: "Bold (700)", value: "bold" },
  { label: "Extra Bold (800)", value: "800" },
];

export const FONT_STYLE_OPTIONS: { label: string; value: string }[] = [
  { label: "Normal", value: "normal" },
  { label: "Italic", value: "italic" },
];

export const DEFAULT_SPACING: Spacing = { top: 0, right: 0, bottom: 0, left: 0 };

export const ELEMENT_TYPE = {
  HEADING: "heading",
  PARAGRAPH: "paragraph",
  IMAGE: "image",
  SECTION: "section",
} as const;

export const LAYOUT_OPTIONS = {
  SINGLE_COLUMN: "single-column",
  TWO_COLUMN: "two-column",
} as const;

export const BUILDER_ACTION_TYPE = {
  UPDATE_PAGE_SETTING: "UPDATE_PAGE_SETTING",
  UPDATE_PAGE_SETTINGS: "UPDATE_PAGE_SETTINGS",
  ADD_ELEMENT: "ADD_ELEMENT",
  DELETE_ELEMENT: "DELETE_ELEMENT",
  UPDATE_ELEMENT: "UPDATE_ELEMENT",
  UNDO: "UNDO",
  REDO: "REDO",
} as const;
