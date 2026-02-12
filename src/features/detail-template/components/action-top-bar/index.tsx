import { Link } from "react-router-dom";
import { exportToHtml } from "../../services/exportService.ts";
import { CommonButton } from "../../../../components/Button.tsx";
import { useBuilderHistory } from "../../hooks/useBuilderHistory.ts";
import { useBuilderState } from "../../hooks/useBuilderState.ts";
import { useBuilderUI } from "../../hooks/useBuilderUI.ts";

export const ActionTopBar = () => {
  const { undo, redo, canUndo, canRedo } = useBuilderHistory();
  const template = useBuilderState();
  const { setShowPreview } = useBuilderUI();

  const handleExport = () => {
    exportToHtml(template);
  };

  return (
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
        <CommonButton className="builder__export-btn" onClick={handleExport} text="Export HTML" />
      </div>
    </div>
  );
};
