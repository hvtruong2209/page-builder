import "./index.css";
import type { TemplateElement, SectionElement } from "../../../../types/element";
import { spacingStyle } from "../../services/elementService";
import { usePageContent } from "./usePageCotent";

export const PageContent = ({ isPreview }: { isPreview?: boolean }) => {
  const {
    elements,
    layout,
    pageSettingsDisplay,
    selectedElementId,
    editingRef,
    draft,
    handleClick,
    handleBlur,
    handleKeyDown,
    setSelectedElementId,
  } = usePageContent();

  const renderElement = (el: TemplateElement) => {
    const isSelected = el.id === selectedElementId;
    const displayEl: TemplateElement =
      draft && draft.kind === "element" && draft.id === el.id ? { ...el, ...draft.changes } : el;

    const cls = `page-preview__element ${isSelected ? "page-preview__element--selected" : ""}`;

    if (displayEl.type === "heading") {
      return (
        <div
          key={displayEl.id}
          className={cls}
          onClick={(e) => handleClick(e, displayEl.id)}
          style={spacingStyle(el)}
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
              margin: 0,
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

    if (displayEl.type === "paragraph") {
      return (
        <div
          key={displayEl.id}
          className={cls}
          onClick={(e) => handleClick(e, displayEl.id)}
          style={spacingStyle(el)}
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
              margin: 0,
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

    if (displayEl.type === "image") {
      return (
        <div
          key={displayEl.id}
          className="page-preview__element--image-wrap"
          style={{ textAlign: displayEl.alignment, ...spacingStyle(el) }}
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

    if (displayEl.type === "section") {
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
            ...spacingStyle(el),
          }}
          onClick={(e) => handleClick(e, el.id)}
        >
          {orderedChildren.map((child) => (
            <div key={child.id} className="page-preview__section-child">
              {renderElement(child)}
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="builder__preview-pane" onClick={() => setSelectedElementId(null)}>
      <div
        className={`page-preview ${layout === "two-column" ? "page-preview--two-column" : ""}`}
        style={{
          backgroundColor: pageSettingsDisplay.backgroundColor,
          maxWidth: `${pageSettingsDisplay.contentWidth}px`,
        }}
      >
        {elements.map((el) => renderElement(el))}
      </div>
    </div>
  );
};
