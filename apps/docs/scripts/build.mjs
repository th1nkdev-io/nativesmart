import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync
} from "node:fs";
import { basename, join, relative, resolve } from "node:path";

const root = resolve("../..");
const docsDir = join(root, "docs");
const outDir = resolve("dist");
const mode = process.argv[2] ?? "build";

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function titleFromMarkdown(markdown, fallback) {
  const heading = markdown.match(/^#\s+(.+)$/m);
  return heading?.[1] ?? fallback.replace(/-/g, " ");
}

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  return lines
    .map((line) => {
      if (line.startsWith("# ")) return `<h1>${escapeHtml(line.slice(2))}</h1>`;
      if (line.startsWith("## ")) return `<h2>${escapeHtml(line.slice(3))}</h2>`;
      if (line.startsWith("### ")) return `<h3>${escapeHtml(line.slice(4))}</h3>`;
      if (line.startsWith("- ")) return `<li>${escapeHtml(line.slice(2))}</li>`;
      if (line.trim() === "") return "";
      return `<p>${escapeHtml(line)}</p>`;
    })
    .join("\n")
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>\n${match}</ul>\n`);
}

function getDocs() {
  return readdirSync(docsDir)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file) => {
      const path = join(docsDir, file);
      const markdown = readFileSync(path, "utf8");
      return {
        file,
        title: titleFromMarkdown(markdown, basename(file, ".md")),
        html: renderMarkdown(markdown)
      };
    });
}

function renderPage(docs) {
  const nav = docs
    .map((doc) => `<a href="#${basename(doc.file, ".md")}">${escapeHtml(doc.title)}</a>`)
    .join("");
  const sections = docs
    .map((doc) => `<section id="${basename(doc.file, ".md")}">${doc.html}</section>`)
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Nativesmart Docs</title>
  <style>
    :root { color-scheme: light dark; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
    body { margin: 0; background: #f8fafc; color: #0f172a; }
    header { background: #0f172a; color: white; padding: 32px max(24px, 8vw); }
    main { display: grid; grid-template-columns: 240px minmax(0, 1fr); gap: 32px; padding: 32px max(24px, 8vw); }
    nav { position: sticky; top: 24px; display: flex; flex-direction: column; gap: 8px; align-self: start; }
    nav a { color: #334155; text-decoration: none; font-size: 14px; }
    section { border-top: 1px solid #cbd5e1; padding: 24px 0; max-width: 860px; }
    h1, h2, h3 { line-height: 1.15; }
    p, li { line-height: 1.65; }
    @media (max-width: 760px) { main { display: block; } nav { position: static; margin-bottom: 24px; } }
  </style>
</head>
<body>
  <header>
    <h1>Nativesmart Docs</h1>
    <p>Mobile production infrastructure for React Native and Flutter products.</p>
  </header>
  <main>
    <nav>${nav}</nav>
    <article>${sections}</article>
  </main>
</body>
</html>`;
}

function build() {
  if (!existsSync(docsDir))
    throw new Error(`Missing docs directory: ${relative(process.cwd(), docsDir)}`);
  const docs = getDocs();
  if (docs.length === 0) throw new Error("No markdown docs found.");
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), renderPage(docs));
  return docs.length;
}

if (mode === "--check") {
  const docs = getDocs();
  if (docs.length < 5) throw new Error("Docs app expects at least five foundation docs.");
  console.log(`Docs source check passed for ${docs.length} documents.`);
} else {
  const count = build();
  console.log(`Built docs site from ${count} markdown documents.`);
}

if (mode === "--watch") {
  console.log("Watch mode is intentionally lightweight; rerun build after editing docs.");
}
