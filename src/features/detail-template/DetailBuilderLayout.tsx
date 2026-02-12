import "./DetailBuilderLayout.css";
import ActionTopBar from "./components/ActionTopBar";
import PageContent from "./components/PageContent";
import { PreviewModal } from "./components/PreviewModal";
import SettingsPanel from "./components/SettingsPanel";
import { useBuilderUI } from "./hooks/useBuilderUI";

const DetailBuilderLayout = () => {
  const { showPreview, setShowPreview } = useBuilderUI();

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
