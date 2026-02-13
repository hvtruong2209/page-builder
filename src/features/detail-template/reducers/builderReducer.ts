/* eslint-disable @typescript-eslint/no-explicit-any */
import { produce } from "immer";
import type { PageSettings, TemplateElement, Template } from "../../../types/element";
import { updateElementDeep } from "../services/elementService";
import { BUILDER_ACTION_TYPE } from "../../../config/variable";

export type BuilderAction =
  | {
      type: typeof BUILDER_ACTION_TYPE.UPDATE_PAGE_SETTING;
      payload: {
        key: keyof PageSettings;
        value: PageSettings[keyof PageSettings];
      };
    }
  | {
      type: typeof BUILDER_ACTION_TYPE.UPDATE_PAGE_SETTINGS;
      payload: Partial<PageSettings>;
    }
  | {
      type: typeof BUILDER_ACTION_TYPE.ADD_ELEMENT;
      payload: {
        element: TemplateElement;
        afterId?: string;
      };
    }
  | { type: typeof BUILDER_ACTION_TYPE.DELETE_ELEMENT; payload: string }
  | {
      type: typeof BUILDER_ACTION_TYPE.UPDATE_ELEMENT;
      payload: {
        id: string;
        changes: Partial<TemplateElement>;
      };
    }
  | { type: typeof BUILDER_ACTION_TYPE.UNDO }
  | { type: typeof BUILDER_ACTION_TYPE.REDO };

export const builderReducer = produce((draft: Template, action: BuilderAction) => {
  switch (action.type) {
    case BUILDER_ACTION_TYPE.UPDATE_PAGE_SETTING: {
      const { key, value } = action.payload;
      (draft.pageSettings as any)[key] = value;
      return;
    }

    case BUILDER_ACTION_TYPE.UPDATE_PAGE_SETTINGS: {
      Object.assign(draft.pageSettings, action.payload);
      return;
    }

    case BUILDER_ACTION_TYPE.ADD_ELEMENT: {
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

    case BUILDER_ACTION_TYPE.DELETE_ELEMENT: {
      const index = draft.elements.findIndex((el) => el.id === action.payload);
      if (index !== -1) {
        draft.elements.splice(index, 1);
      }
      return;
    }

    case BUILDER_ACTION_TYPE.UPDATE_ELEMENT: {
      draft.elements = updateElementDeep(draft.elements, action.payload.id, action.payload.changes);
      return;
    }

    default:
      return;
  }
});
