import { createContext, useContext } from "react";
import type { Draft } from "../../../types";
import type { TemplateElement } from "../../../types/template";

export const BuilderUIContext = createContext<{
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;

  showPreview: boolean;
  setShowPreview: (show: boolean) => void;

  draft: Draft | null;
  beginDraft: (id: string) => void;
  updateDraft: (changes: Partial<TemplateElement>) => void;
  commitDraft: () => void;
  selectOtherElement: (id: string | null) => void;

  beginPageDraft: () => void;
  updatePageDraft: (changes: Partial<{ [key: string]: string | number }>) => void;
  commitPageDraft: () => void;
} | null>(null);

export const useSelectedElement = () => {
  const ctx = useContext(BuilderUIContext);
  if (!ctx) throw new Error("Missing UI Provider");
  return ctx;
};
