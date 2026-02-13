import { CommonColorInput } from "../../../../components/ColorInput";
import { CommonSlider } from "../../../../components/Slider";
import type { PageSettings } from "../../../../types/element";
import { useBuilderUI } from "../../hooks/useBuilderUI";

export const SettingPage = ({ pageSettings }: { pageSettings: PageSettings }) => {
  const { draft, beginPageDraft, updatePageDraft, commitPageDraft } = useBuilderUI();

  const pageSettingsDisplay =
    draft && draft.kind === "page" ? { ...pageSettings, ...draft.changes } : pageSettings;

  return (
    <div className="builder__settings-pane">
      <div className="settings-panel">
        <h3 className="settings-panel__title">Page Settings</h3>
        <CommonColorInput
          label="Background Color"
          className="settings-panel__color-input"
          value={pageSettingsDisplay.backgroundColor}
          onChangeStart={() => beginPageDraft()}
          onChange={(value) => updatePageDraft({ backgroundColor: value })}
          onChangeEnd={() => commitPageDraft()}
        />
        <CommonSlider
          label="Content Width"
          className="settings-panel__range"
          min={600}
          max={1400}
          value={pageSettingsDisplay.contentWidth}
          onChangeStart={() => beginPageDraft()}
          onChange={(value) => updatePageDraft({ contentWidth: value })}
          onChangeEnd={() => commitPageDraft()}
          amountText={`${pageSettingsDisplay.contentWidth}px`}
        />
      </div>
    </div>
  );
};
