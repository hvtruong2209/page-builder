import { createContext } from "react";
import type { Draft, TemplateElement } from "../../../types/element";

export const BuilderUIContext = createContext<{
  // context state
  selectedElementId: string | null;
  showPreview: boolean;
  draft: Draft | null;
  setSelectedElementId: (id: string | null) => void;
  setShowPreview: (show: boolean) => void;
  setDraft: (draft: Draft | null | ((prev: Draft | null) => Draft | null)) => void;

  // bridge actions
  beginDraft: (id: string) => void;
  updateDraft: (changes: Partial<TemplateElement>) => void;
  commitDraft: () => void;
  selectOtherElement: (id: string | null) => void;
  beginPageDraft: () => void;
  updatePageDraft: (changes: Partial<{ [key: string]: string | number }>) => void;
  commitPageDraft: () => void;
} | null>(null);
