import { Link } from "react-router-dom";
import { exportToHtml } from "../../services/exportService.ts";
import { CommonButton } from "../../../../components/Button.tsx";
import { useBuilderState } from "../../hooks/useBuilderState.ts";
import { useBuilderActions } from "../../hooks/useBuilderActions.ts";
import { PreviewModal } from "../preview-modal/index.tsx";
import { useState } from "react";

// ============= The ActionTopBar component =============
export const ActionTopBar = () => {
  const { template, canUndo, canRedo } = useBuilderState();
  const { undo, redo } = useBuilderActions();

  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <div className="builder__topbar">
        <div className="builder__topbar-left">
          <Link to="/" className="builder__back-btn">
            ← Back
          </Link>
          <span className="builder__template-name">{template?.name}</span>
        </div>
        <div className="builder__topbar-actions">
          <CommonButton
            className="builder__action-btn"
            onClick={undo}
            disabled={!canUndo}
            title="Undo"
            text="↩ Undo"
          />
          <CommonButton
            className="builder__action-btn"
            onClick={redo}
            disabled={!canRedo}
            title="Redo"
            text="Redo ↪"
          />
          <CommonButton
            className="builder__action-btn builder__action-btn--preview"
            onClick={() => setShowPreview(true)}
            text="👁 Preview"
          />
          <CommonButton
            className="builder__export-btn"
            onClick={() => {
              exportToHtml(template);
            }}
            text="Export HTML"
          />
        </div>
      </div>
      {showPreview && <PreviewModal onClose={() => setShowPreview(false)} />}
    </>
  );
};
