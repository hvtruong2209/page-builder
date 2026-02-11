/* eslint-disable @typescript-eslint/no-explicit-any */
import { produce } from "immer";
import type { PageSettings, TemplateElement, Template } from "../../../types/template";

export type BuilderAction =
  | {
      type: "UPDATE_PAGE_SETTING";
      payload: {
        key: keyof PageSettings;
        value: PageSettings[keyof PageSettings];
      };
    }
  | {
      type: "UPDATE_PAGE_SETTINGS";
      payload: Partial<PageSettings>;
    }
  | {
      type: "ADD_ELEMENT";
      payload: {
        element: TemplateElement;
        afterId?: string;
      };
    }
  | { type: "DELETE_ELEMENT"; payload: string }
  | {
      type: "UPDATE_ELEMENT";
      payload: {
        id: string;
        changes: Partial<TemplateElement>;
      };
    }
  | {
      type: "REORDER_ELEMENTS";
      payload: {
        fromIndex: number;
        toIndex: number;
      };
    }
  | { type: "UNDO" }
  | { type: "REDO" };

export const builderReducer = produce((draft: Template, action: BuilderAction) => {
  switch (action.type) {
    case "UPDATE_PAGE_SETTING": {
      const { key, value } = action.payload;
      (draft.pageSettings as any)[key] = value;
      return;
    }

    case "UPDATE_PAGE_SETTINGS": {
      Object.assign(draft.pageSettings, action.payload);
      return;
    }

    case "ADD_ELEMENT": {
      const { element, afterId } = action.payload;

      if (!afterId) {
        draft.elements.push(element);
        return;
      }

      const index = draft.elements.findIndex((el) => el.id === afterId);

      if (index === -1) {
        draft.elements.push(element);
        return;
      }

      draft.elements.splice(index + 1, 0, element);

      return;
    }

    case "DELETE_ELEMENT": {
      const index = draft.elements.findIndex((el) => el.id === action.payload);
      if (index !== -1) {
        draft.elements.splice(index, 1);
      }

      return;
    }

    case "UPDATE_ELEMENT": {
      const el = draft.elements.find((e) => e.id === action.payload.id);
      if (el) {
        Object.assign(el, action.payload.changes);
      }

      return;
    }

    case "REORDER_ELEMENTS": {
      const { fromIndex, toIndex } = action.payload;
      const [moved] = draft.elements.splice(fromIndex, 1);
      draft.elements.splice(toIndex, 0, moved);

      return;
    }

    default:
      return;
  }
});
