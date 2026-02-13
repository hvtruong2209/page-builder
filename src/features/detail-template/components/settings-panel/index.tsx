import "./index.css";

import { CommonButton } from "../../../../components/Button";
import type {
  HeadingElement,
  ImageElement,
  ParagraphElement,
  SectionElement,
} from "../../../../types/element";
import { SettingHeading } from "./SettingHeading";
import { SettingImage } from "./SettingImage";
import { SettingPage } from "./SettingPage";
import { SettingParagraph } from "./SettingParagraph";
import { SettingSection } from "./SettingSection";

import { useSettingsPanel } from "./useSettingsPanel";
import { ELEMENT_TYPE } from "../../../../config/variable";

// ============= Main settings panel component =============
const SettingsPanel = () => {
  const { selectedElement, pageSettings, updateElement, handleDuplicate, handleRemove } =
    useSettingsPanel();

  // ============= If no element is selected, show page settings =============
  if (!selectedElement) {
    return <SettingPage pageSettings={pageSettings} />;
  }

  // ============= If an element is selected, show element settings =============
  return (
    <div className="settings-panel">
      <div className="settings-panel__header-row">
        <h3 className="settings-panel__title">Settings</h3>
        <Actions handleDuplicate={handleDuplicate} handleRemove={handleRemove} />
      </div>
      <FieldConfig selectedElement={selectedElement} updateElement={updateElement} />
    </div>
  );
};

export default SettingsPanel;

// ============= Sub-components: Action buttons for duplicate and remove =============
const Actions = ({
  handleDuplicate,
  handleRemove,
}: {
  handleDuplicate: () => void;
  handleRemove: () => void;
}) => {
  return (
    <div>
      <CommonButton
        className="settings-panel__duplicate-btn"
        onClick={handleDuplicate}
        title="Duplicate Element"
        text="⧉"
      />
      <CommonButton
        className="settings-panel__duplicate-btn"
        onClick={handleRemove}
        title="Remove Element"
        text="🗑️"
      />
    </div>
  );
};

// ============= Sub-components: Field configurations for different element types =============
const FieldConfig = ({
  selectedElement,
  updateElement,
}: {
  selectedElement: HeadingElement | ParagraphElement | ImageElement | SectionElement;
  updateElement: (
    id: string,
    changes: Partial<HeadingElement | ParagraphElement | ImageElement | SectionElement>,
  ) => void;
}) => {
  switch (selectedElement.type) {
    case ELEMENT_TYPE.SECTION:
      return <SettingSection selectedElement={selectedElement} updateElement={updateElement} />;
    case ELEMENT_TYPE.HEADING: {
      return <SettingHeading selectedElement={selectedElement} updateElement={updateElement} />;
    }
    case ELEMENT_TYPE.PARAGRAPH:
      return <SettingParagraph selectedElement={selectedElement} updateElement={updateElement} />;
    case ELEMENT_TYPE.IMAGE:
      return <SettingImage selectedElement={selectedElement} updateElement={updateElement} />;
    default:
      return null;
  }
};
