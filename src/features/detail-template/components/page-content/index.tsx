import "./index.css";
import type { TemplateElement, SectionElement } from "../../../../types/element";
import { spacingStyle } from "../../services/elementService";
import { usePageContent } from "./usePageCotent";
import { useBuilderState } from "../../hooks/useBuilderState";
import { useBuilderUI } from "../../hooks/useBuilderUI";
import { ELEMENT_TYPE, LAYOUT_OPTIONS } from "../../../../config/variable";

// ============= The main PageContent component =============
export const PageContent = ({ isPreview }: { isPreview?: boolean }) => {
  const template = useBuilderState();
  const { setSelectedElementId, draft } = useBuilderUI();
  const { elements, pageSettings, layout } = template;
  const pageSettingsDisplay =
    draft && draft.kind === "page" ? { ...pageSettings, ...draft.changes } : pageSettings;

  return (
    <div className="builder__preview-pane" onClick={() => setSelectedElementId(null)}>
      <div
        className={`page-preview ${layout === LAYOUT_OPTIONS.TWO_COLUMN ? "page-preview--two-column" : ""}`}
        style={{
          backgroundColor: pageSettingsDisplay.backgroundColor,
          maxWidth: `${pageSettingsDisplay.contentWidth}px`,
        }}
      >
        {elements.map((el) => (
          <Element key={el.id} el={el} isPreview={isPreview} />
        ))}
      </div>
    </div>
  );
};

// ============= Sub-component to render individual elements recursively =============
const Element = ({ el, isPreview }: { el: TemplateElement; isPreview?: boolean }) => {
  const { isSelected, displayEl, editingRef, handleClick, handleBlur, handleKeyDown } =
    usePageContent(el);
  const cls = `page-preview__element ${isSelected ? "page-preview__element--selected" : ""}`;

  if (displayEl.type === ELEMENT_TYPE.HEADING) {
    return (
      <div
        key={displayEl.id}
        className={cls}
        onClick={(e) => handleClick(e, displayEl.id)}
        style={spacingStyle(displayEl)}
      >
        <h1
          contentEditable={!isPreview}
          suppressContentEditableWarning={!isPreview}
          onBlur={(e) => handleBlur(displayEl, e)}
          onKeyDown={handleKeyDown}
          onFocus={(e) => {
            editingRef.current = e.currentTarget;
          }}
          style={{
            fontSize: `${displayEl.fontSize}px`,
            color: displayEl.color,
            textAlign: displayEl.alignment,
            fontWeight: displayEl.fontWeight,
            fontStyle: displayEl.fontStyle,
            ...spacingStyle(displayEl),
            lineHeight: 1.2,
            outline: "none",
            cursor: "text",
          }}
        >
          {displayEl.text}
        </h1>
      </div>
    );
  }

  if (displayEl.type === ELEMENT_TYPE.PARAGRAPH) {
    return (
      <div
        key={displayEl.id}
        className={cls}
        onClick={(e) => handleClick(e, displayEl.id)}
        style={spacingStyle(displayEl)}
      >
        <p
          contentEditable={!isPreview}
          suppressContentEditableWarning={!isPreview}
          onBlur={(e) => handleBlur(displayEl, e)}
          onKeyDown={handleKeyDown}
          onFocus={(e) => {
            editingRef.current = e.currentTarget;
          }}
          style={{
            fontSize: `${displayEl.fontSize}px`,
            color: displayEl.color,
            textAlign: displayEl.alignment,
            fontWeight: displayEl.fontWeight,
            fontStyle: displayEl.fontStyle,
            ...spacingStyle(displayEl),
            lineHeight: 1.6,
            outline: "none",
            cursor: "text",
          }}
        >
          {displayEl.text}
        </p>
      </div>
    );
  }

  if (displayEl.type === ELEMENT_TYPE.IMAGE) {
    return (
      <div
        key={displayEl.id}
        className="page-preview__element--image-wrap"
        style={{ textAlign: displayEl.alignment, ...spacingStyle(displayEl) }}
        onClick={(e) => handleClick(e, displayEl.id)}
      >
        <div
          className={`page-preview__image-inner ${isSelected ? "page-preview__element--selected" : ""}`}
          style={{ width: `${displayEl.width}%` }}
        >
          <img
            src={displayEl.src}
            alt={displayEl.alt}
            style={{ width: "100%", display: "block" }}
          />
        </div>
      </div>
    );
  }

  if (displayEl.type === ELEMENT_TYPE.SECTION) {
    const section = displayEl as SectionElement;
    const orderedChildren = section.reversed ? [...section.children].reverse() : section.children;
    return (
      <div
        key={displayEl.id}
        className={`page-preview__section ${isSelected ? "page-preview__section--selected" : ""}`}
        style={{
          gap: `${section.gap}px`,
          backgroundColor: section.backgroundColor,
          borderRadius: `${section.borderRadius}px`,
          ...spacingStyle(displayEl),
        }}
        onClick={(e) => handleClick(e, displayEl.id)}
      >
        {orderedChildren.map((child) => (
          <Element key={child.id} el={child} isPreview={isPreview} />
        ))}
      </div>
    );
  }

  return null;
};
