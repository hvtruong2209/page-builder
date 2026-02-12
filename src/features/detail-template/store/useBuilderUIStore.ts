import { useState } from "react";

import type { Draft } from "../../../types/element";

export const useBuilderUIStore = () => {
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);

  return {
    selectedElementId,
    showPreview,
    draft,
    setSelectedElementId,
    setShowPreview,
    setDraft,
  };
};
