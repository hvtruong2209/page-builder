import { DEFAULT_SPACING } from "../../../config/variable";
import { type TemplateElement, type SectionElement, type Template } from "../../../types/element";
import type { Spacing } from "../../../types/styles";

const spacingCss = (prefix: string, s: Spacing) => {
  return `${prefix}:${s.top}px ${s.right}px ${s.bottom}px ${s.left}px;`;
};

const renderElementHtml = (el: TemplateElement): string => {
  const m = el.margin || DEFAULT_SPACING;
  const p = el.padding || DEFAULT_SPACING;
  const sp = `${spacingCss("margin", m)}${spacingCss("padding", p)}`;

  if (el.type === "heading") {
    return `<h1 style="font-size:${el.fontSize}px;font-weight:${el.fontWeight || "bold"};font-style:${el.fontStyle || "normal"};color:${el.color};text-align:${el.alignment};${sp}line-height:1.2;">${escapeHtml(el.text)}</h1>`;
  }
  if (el.type === "paragraph") {
    return `<p style="font-size:${el.fontSize}px;font-weight:${el.fontWeight || "normal"};font-style:${el.fontStyle || "normal"};color:${el.color};text-align:${el.alignment};${sp}line-height:1.6;">${escapeHtml(el.text)}</p>`;
  }
  if (el.type === "image") {
    return `<div style="text-align:${el.alignment};${sp}"><img src="${escapeHtml(el.src)}" alt="${escapeHtml(el.alt)}" style="width:${el.width}%;max-width:100%;border-radius:6px;" /></div>`;
  }
  if (el.type === "section") {
    const section = el as SectionElement;
    const ordered = section.reversed ? [...section.children].reverse() : section.children;
    const childrenHtml = ordered.map(renderElementHtml).join("\n      ");
    return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:${section.gap}px;align-items:center;background-color:${section.backgroundColor};padding:${section.sectionPadding}px;border-radius:${section.borderRadius}px;${sp}">
      ${childrenHtml}
    </div>`;
  }
  return "";
};

export const exportToHtml = (template: Template) => {
  const { pageSettings, elements, layout } = template;

  const elementsHtml = elements.map(renderElementHtml).join("\n    ");

  const containerStyle =
    layout === "two-column"
      ? `display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:center;`
      : "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(template.name)}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      background-color: ${pageSettings.backgroundColor};
      padding: 48px 24px;
    }
    .container {
      max-width: ${pageSettings.contentWidth}px;
      margin: 0 auto;
      ${containerStyle}
    }
  </style>
</head>
<body>
  <div class="container">
    ${elementsHtml}
  </div>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${template.id}.html`;
  a.click();
  URL.revokeObjectURL(url);
};

const escapeHtml = (s: string) => {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};
