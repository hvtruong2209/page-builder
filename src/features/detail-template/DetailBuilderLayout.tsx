import "./DetailBuilderLayout.css";
import ActionTopBar from "./components/ActionTopBar";
import PageContent from "./components/PageContent";
import SettingsPanel from "./components/SettingsPanel";

const DetailBuilderLayout = () => {
  // const handlePageSettingsChange = (pageSettings: Template["pageSettings"]) => {};

  return (
    <div className="builder">
      <ActionTopBar></ActionTopBar>
      <div className="builder__body">
        <PageContent />

        <div className="builder__settings-pane">
          <SettingsPanel />
        </div>
      </div>

      {/* {showPreview && (
        <PreviewModal
          template={template}
          onClose={() => setShowPreview(false)}
        />
      )} */}
    </div>
  );
};

export default DetailBuilderLayout;
