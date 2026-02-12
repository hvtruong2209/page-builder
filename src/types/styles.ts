export type ElementType = "heading" | "paragraph" | "image" | "section";

export type TextAlignment = "left" | "center" | "right";

export interface Spacing {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export type FontWeight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export type FontStyle = "normal" | "italic";
