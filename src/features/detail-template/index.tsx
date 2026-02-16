import "./index.css";
import { ActionTopBar } from "./components/action-top-bar";
import { PageContent } from "./components/page-content";
import SettingsPanel from "./components/settings-panel";

const DetailBuilderLayout = () => {
  return (
    <div className="builder">
      <ActionTopBar></ActionTopBar>
      <div className="builder__body">
        <PageContent />
        <SettingsPanel />
      </div>
    </div>
  );
};

export default DetailBuilderLayout;
