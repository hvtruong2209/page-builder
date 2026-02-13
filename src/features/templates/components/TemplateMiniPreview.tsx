import { useRef, useState, useEffect } from "react";
import type { SectionElement, Template, TemplateElement } from "../../../types/element";
import { ELEMENT_TYPE, LAYOUT_OPTIONS } from "../../../config/variable";
import { spacingStyle } from "../../detail-template/services/elementService";

interface Props {
  template: Template;
}

export const TemplateMiniPreview = ({ template }: Props) => {
  const { pageSettings, elements, layout } = template;

  // Ref and state for scaling
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const containerWidth = entry.contentRect.width;
      const newScale = containerWidth / pageSettings.contentWidth;

      setScale(newScale);
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, [pageSettings.contentWidth]);

  const renderElement = (el: TemplateElement) => {
    if (el.type === ELEMENT_TYPE.HEADING) {
      return (
        <h2
          key={el.id}
          style={{
            fontSize: `${el.fontSize}px`,
            color: el.color,
            textAlign: el.alignment,
            fontWeight: el.fontWeight,
            fontStyle: el.fontStyle,
            ...spacingStyle(el),
          }}
        >
          {el.text}
        </h2>
      );
    }
    if (el.type === ELEMENT_TYPE.PARAGRAPH) {
      return (
        <p
          key={el.id}
          style={{
            fontSize: `${el.fontSize}px`,
            color: el.color,
            textAlign: el.alignment,
            lineHeight: 1.5,
            fontWeight: el.fontWeight,
            fontStyle: el.fontStyle,
            ...spacingStyle(el),
          }}
        >
          {el.text}
        </p>
      );
    }
    if (el.type === ELEMENT_TYPE.IMAGE) {
      return (
        <div key={el.id} style={{ textAlign: el.alignment }}>
          <img
            src={el.src}
            alt={el.alt}
            style={{
              width: `${el.width}%`,
              maxWidth: "100%",
              borderRadius: "8px",
              ...spacingStyle(el),
            }}
          />
        </div>
      );
    }
    if (el.type === ELEMENT_TYPE.SECTION) {
      const section = el as SectionElement;
      const orderedChildren = section.reversed ? [...section.children].reverse() : section.children;
      return (
        <div
          key={el.id}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            gap: `${section.gap}px`,
            backgroundColor: section.backgroundColor,
            borderRadius: `${section.borderRadius}px`,
            ...spacingStyle(el),
          }}
        >
          {orderedChildren.map((child) => (
            <div key={child.id}>{renderElement(child)}</div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div ref={containerRef} style={{ width: "100%", overflow: "hidden" }}>
      <div
        style={{
          width: `${pageSettings.contentWidth}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          backgroundColor: pageSettings.backgroundColor,
          padding: "40px",
          boxSizing: "border-box",
          display: layout === LAYOUT_OPTIONS.TWO_COLUMN ? "grid" : "block",
          gridTemplateColumns: layout === LAYOUT_OPTIONS.TWO_COLUMN ? "1fr 1fr" : undefined,
          gap: layout === LAYOUT_OPTIONS.TWO_COLUMN ? "24px" : undefined,
          alignItems: layout === LAYOUT_OPTIONS.TWO_COLUMN ? "center" : undefined,
        }}
      >
        {elements.map((el) => renderElement(el))}
      </div>
    </div>
  );
};
