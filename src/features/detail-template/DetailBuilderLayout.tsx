import "./DetailBuilderLayout.css";
import ActionTopBar from "./components/ActionTopBar";
import PageContent from "./components/PageContent";
import { PreviewModal } from "./components/PreviewModal";
import SettingsPanel from "./components/SettingsPanel";
import { useSelectedElement } from "./hooks/useBuilderUIProvider";

const DetailBuilderLayout = () => {
  const { showPreview, setShowPreview } = useSelectedElement();

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
