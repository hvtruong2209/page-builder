import { DEFAULT_SPACING, ELEMENT_TYPE } from "../../../constants/variable";
import type { TemplateElement, SectionElement } from "../../../types/element";
export const spacingStyle = (el: TemplateElement) => {
  const m = el.margin || DEFAULT_SPACING;
  const p = el.padding || DEFAULT_SPACING;
  return {
    margin: `${m.top}px ${m.right}px ${m.bottom}px ${m.left}px`,
    padding: `${p.top}px ${p.right}px ${p.bottom}px ${p.left}px`,
  };
};

export const findElementTree = (
  elements: TemplateElement[],
  id: string,
): TemplateElement | null => {
  for (const el of elements) {
    if (el.id === id) return el;
    if (el.type === ELEMENT_TYPE.SECTION) {
      const found = findElementTree((el as SectionElement).children, id);
      if (found) return found;
    }
  }
  return null;
};

export const updateElementTree = (
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

    if (el.type === ELEMENT_TYPE.SECTION) {
      return {
        ...el,
        children: updateElementTree(el.children, id, changes),
      };
    }
    return el;
  });
};

export const duplicateElementTree = (element: TemplateElement): TemplateElement => {
  const newId = `${element.id}-${crypto.randomUUID()}`;

  if (element.type === ELEMENT_TYPE.SECTION) {
    return {
      ...element,
      id: newId,
      children: (element as SectionElement).children.map((child) => duplicateElementTree(child)),
    } as SectionElement;
  }

  return {
    ...element,
    id: newId,
  } as TemplateElement;
};

export const removeElementTree = (elements: TemplateElement[], id: string): boolean => {
  const index = elements.findIndex((el) => el.id === id);

  if (index !== -1) {
    elements.splice(index, 1);
    return true;
  }

  return elements.some(
    (el) =>
      el.type === ELEMENT_TYPE.SECTION && removeElementTree((el as SectionElement).children, id),
  );
};
