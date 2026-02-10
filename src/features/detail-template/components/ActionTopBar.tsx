import { Link } from "react-router-dom";
import { useHistoryControls, useTemplate } from "../hooks/useBuilderProvider";

const ActionTopBar = () => {
  const template = useTemplate();
  const { undo, redo, canUndo, canRedo } = useHistoryControls();
  //   const [showPreview, setShowPreview] = useState(false);

  const handleExport = () => {
    // exportToHtml(template);
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
        <button className="builder__action-btn" onClick={undo} disabled={!canUndo} title="Undo">
          ↩ Undo
        </button>
        <button className="builder__action-btn" onClick={redo} disabled={!canRedo} title="Redo">
          Redo ↪
        </button>
        {/* <button
          className="builder__action-btn builder__action-btn--preview"
          onClick={() => setShowPreview(true)}
        >
          👁 Preview
        </button> */}
        <button className="builder__export-btn" onClick={handleExport}>
          Export HTML
        </button>
      </div>
    </div>
  );
};

export default ActionTopBar;
