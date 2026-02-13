import type { ELEMENT_TYPE } from "../config/variable";

export type ElementType = (typeof ELEMENT_TYPE)[keyof typeof ELEMENT_TYPE];

export type TextAlignment = "left" | "center" | "right";

export interface Spacing {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export type FontWeight = "normal" | "bold" | "400" | "500" | "600" | "700" | "800";

export type FontStyle = "normal" | "italic";
