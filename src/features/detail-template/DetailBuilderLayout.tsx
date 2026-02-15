import "./DetailBuilderLayout.css";
import { ActionTopBar } from "./components/action-top-bar";
import { PageContent } from "./components/page-content";
import { PreviewModal } from "./components/preview-modal";
import SettingsPanel from "./components/settings-panel";
import { useBuilderUIActions } from "./hooks/useBuilderUIActions";
import { useBuilderUIState } from "./hooks/useBuilderUIState";

const DetailBuilderLayout = () => {
  const { showPreview } = useBuilderUIState();
  const { setShowPreview } = useBuilderUIActions();

  return (
    <div className="builder">
      <ActionTopBar></ActionTopBar>
      <div className="builder__body">
        <PageContent />
        <SettingsPanel />
      </div>

      {showPreview && <PreviewModal onClose={() => setShowPreview(false)} />}
    </div>
  );
};

export default DetailBuilderLayout;
