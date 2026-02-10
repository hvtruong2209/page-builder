import { useRef, useState, useEffect } from "react";
import type { Template } from "../../../types/template";

export function TemplateMiniPreview({ template }: { template: Template }) {
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
          display: layout === "two-column" ? "grid" : "block",
          gridTemplateColumns: layout === "two-column" ? "1fr 1fr" : undefined,
          gap: layout === "two-column" ? "24px" : undefined,
          alignItems: layout === "two-column" ? "center" : undefined,
        }}
      >
        {elements.map((el) => {
          if (el.type === "heading") {
            return (
              <h2
                key={el.id}
                style={{
                  fontSize: `${el.fontSize}px`,
                  color: el.color,
                  textAlign: el.alignment,
                  margin: "0 0 12px",
                }}
              >
                {el.text}
              </h2>
            );
          }
          if (el.type === "paragraph") {
            return (
              <p
                key={el.id}
                style={{
                  fontSize: `${el.fontSize}px`,
                  color: el.color,
                  textAlign: el.alignment,
                  margin: "0 0 12px",
                  lineHeight: 1.5,
                }}
              >
                {el.text}
              </p>
            );
          }
          if (el.type === "image") {
            return (
              <div key={el.id} style={{ textAlign: el.alignment, margin: "0 0 12px" }}>
                <img
                  src={el.src}
                  alt={el.alt}
                  style={{
                    width: `${el.width}%`,
                    maxWidth: "100%",
                    borderRadius: "8px",
                  }}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
