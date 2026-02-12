import type { Spacing, FontWeight, FontStyle, TextAlignment, ElementType } from "./styles";

export interface BaseElement {
  id: string;
  type: ElementType;
  margin?: Spacing;
  padding?: Spacing;
}

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

export interface SectionElement extends BaseElement {
  type: "section";
  children: TemplateElement[];
  reversed: boolean;
  gap: number;
  backgroundColor: string;
  sectionPadding: number;
  borderRadius: number;
}

export type TemplateElement = HeadingElement | ParagraphElement | ImageElement | SectionElement;
export type Draft =
  | {
      kind: "element";
      id: string;
      changes: Partial<Omit<TemplateElement, "id" | "type">>;
    }
  | {
      kind: "page";
      changes: Partial<PageSettings>;
    };

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
