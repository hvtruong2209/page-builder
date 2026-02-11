import CommonButton from "../../../components/Button";
import { useTemplate } from "../hooks/useBuilderProvider";
import PageContent from "./PageContent";
import "./PreviewModal.css";

export function PreviewModal({ onClose }: { onClose: () => void }) {
  const template = useTemplate();

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
}
