import type { PageSettings, TemplateElement } from "./template";

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
