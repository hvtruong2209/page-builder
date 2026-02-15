import { createContext } from "react";
import type { Draft, TemplateElement } from "../../../types/element";

export const BuilderUIStateContext = createContext<{
  // context state
  selectedElementId: string | null;
  showPreview: boolean;
  draft: Draft | null;
} | null>(null);

export const BuilderUIActionsContext = createContext<{
  // bridge actions
  setSelectedElementId: (id: string | null) => void;
  setShowPreview: (show: boolean) => void;
  setDraft: (draft: Draft | null | ((prev: Draft | null) => Draft | null)) => void;
  beginDraft: (id: string) => void;
  updateDraft: (changes: Partial<TemplateElement>) => void;
  commitDraft: () => void;
  beginPageDraft: () => void;
  updatePageDraft: (changes: Partial<{ [key: string]: string | number }>) => void;
  commitPageDraft: () => void;
} | null>(null);
