import type { Template } from "../../../types/template";

export function exportToHtml(template: Template) {
  const { pageSettings, elements, layout } = template;

  const elementsHtml = elements
    .map((el) => {
      if (el.type === "heading") {
        return `<h1 style="font-size:${el.fontSize}px;font-weight:${el.fontWeight || "bold"};font-style:${el.fontStyle || "normal"};color:${el.color};text-align:${el.alignment};margin:0 0 16px;line-height:1.2;">${escapeHtml(el.text)}</h1>`;
      }
      if (el.type === "paragraph") {
        return `<p style="font-size:${el.fontSize}px;font-weight:${el.fontWeight || "normal"};font-style:${el.fontStyle || "normal"};color:${el.color};text-align:${el.alignment};margin:0 0 16px;line-height:1.6;">${escapeHtml(el.text)}</p>`;
      }
      if (el.type === "image") {
        return `<div style="text-align:${el.alignment};margin:0 0 16px;"><img src="${escapeHtml(el.src)}" alt="${escapeHtml(el.alt)}" style="width:${el.width}%;max-width:100%;border-radius:6px;" /></div>`;
      }
      return "";
    })
    .join("\n    ");

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
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
