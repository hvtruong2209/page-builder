export type ElementType = "heading" | "paragraph" | "image";

export type TextAlignment = "left" | "center" | "right";

export interface BaseElement {
  id: string;
  type: ElementType;
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

export interface HeadingElement extends BaseElement {
  type: "heading";
  text: string;
  fontSize: number;
  fontWeight: FontWeight;
  fontStyle: FontStyle;
  color: string;
  alignment: TextAlignment;
}

export interface ParagraphElement extends BaseElement {
  type: "paragraph";
  text: string;
  fontSize: number;
  fontWeight: FontWeight;
  fontStyle: FontStyle;
  color: string;
  alignment: TextAlignment;
}

export interface ImageElement extends BaseElement {
  type: "image";
  src: string;
  alt: string;
  width: number;
  alignment: TextAlignment;
}

export type TemplateElement = HeadingElement | ParagraphElement | ImageElement;

export interface PageSettings {
  backgroundColor: string;
  contentWidth: number;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  pageSettings: PageSettings;
  elements: TemplateElement[];
  layout: "single-column" | "two-column";
}
