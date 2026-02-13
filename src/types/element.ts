import type { ELEMENT_TYPE, LAYOUT_OPTIONS } from "../config/variable";
import type { Spacing, FontWeight, FontStyle, TextAlignment, ElementType } from "./styles";

export interface BaseElement {
  id: string;
  type: ElementType;
  margin?: Spacing;
  padding?: Spacing;
}

export interface HeadingElement extends BaseElement {
  type: typeof ELEMENT_TYPE.HEADING;
  text: string;
  fontSize: number;
  fontWeight: FontWeight;
  fontStyle: FontStyle;
  color: string;
  alignment: TextAlignment;
}

export interface ParagraphElement extends BaseElement {
  type: typeof ELEMENT_TYPE.PARAGRAPH;
  text: string;
  fontSize: number;
  fontWeight: FontWeight;
  fontStyle: FontStyle;
  color: string;
  alignment: TextAlignment;
}

export interface ImageElement extends BaseElement {
  type: typeof ELEMENT_TYPE.IMAGE;
  src: string;
  alt: string;
  width: number;
  alignment: TextAlignment;
}

export interface SectionElement extends BaseElement {
  type: typeof ELEMENT_TYPE.SECTION;
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
  layout: (typeof LAYOUT_OPTIONS)[keyof typeof LAYOUT_OPTIONS];
}
