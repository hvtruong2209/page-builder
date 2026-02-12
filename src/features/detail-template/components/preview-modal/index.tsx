import { CommonButton } from "../../../../components/Button";
import { useBuilderState } from "../../hooks/useBuilderState";
import { PageContent } from "../page-content";
import "./index.css";

export const PreviewModal = ({ onClose }: { onClose: () => void }) => {
  const template = useBuilderState();

  return (
    <div className="preview-modal__overlay">
      <div className="preview-modal__header">
        <span className="preview-modal__title">Preview — {template.name}</span>
        <CommonButton className="preview-modal__close-btn" onClick={onClose} text="✕ Close" />
      </div>
      <div className="preview-modal__body">
        <PageContent isPreview />
      </div>
    </div>
  );
};
