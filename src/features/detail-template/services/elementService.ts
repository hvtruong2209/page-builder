import { DEFAULT_SPACING } from "../../../config/variable";
import type { TemplateElement, SectionElement } from "../../../types/element";

export const findElement = (elements: TemplateElement[], id: string): TemplateElement | null => {
  for (const el of elements) {
    if (el.id === id) return el;
    if (el.type === "section") {
      const found = findElement((el as SectionElement).children, id);
      if (found) return found;
    }
  }
  return null;
};

export const updateElementDeep = (
  elements: TemplateElement[],
  id: string,
  changes: Omit<Partial<TemplateElement>, "type" | "id">,
): TemplateElement[] => {
  return elements.map((el) => {
    if (el.id === id) {
      return {
        ...el,
        ...changes,
      } as TemplateElement;
    }

    if (el.type === "section") {
      return {
        ...el,
        children: updateElementDeep(el.children, id, changes),
      };
    }

    return el;
  });
};

export const spacingStyle = (el: TemplateElement) => {
  const m = el.margin || DEFAULT_SPACING;
  const p = el.padding || DEFAULT_SPACING;
  return {
    margin: `${m.top}px ${m.right}px ${m.bottom}px ${m.left}px`,
    padding: `${p.top}px ${p.right}px ${p.bottom}px ${p.left}px`,
  };
};
