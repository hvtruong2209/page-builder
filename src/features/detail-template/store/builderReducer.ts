/* eslint-disable @typescript-eslint/no-explicit-any */
import { produce } from "immer";
import type { PageSettings, TemplateElement, Template } from "../../../types/template";

/**
 * ACTION TYPES
 */
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
  | { type: "ADD_ELEMENT"; payload: TemplateElement }
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

/**
 * REDUCER
 */
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
    /**
       ✅ Add new element
       */
    case "ADD_ELEMENT": {
      draft.elements.push(action.payload);
      return;
    }

    /**
       ✅ Delete element (mutable style for performance)
       */
    case "DELETE_ELEMENT": {
      const index = draft.elements.findIndex((el) => el.id === action.payload);

      if (index !== -1) {
        draft.elements.splice(index, 1);
      }

      return;
    }

    /**
       ✅ Update element using Partial
       (Serializable — good for undo/redo & devtools)
       */
    case "UPDATE_ELEMENT": {
      const el = draft.elements.find((e) => e.id === action.payload.id);

      if (el) {
        Object.assign(el, action.payload.changes);
      }

      return;
    }

    /**
       ⭐ VERY IMPORTANT for builders
       Drag & Drop reorder
       */
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
