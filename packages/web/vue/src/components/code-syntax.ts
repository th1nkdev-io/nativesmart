export type NsCodeLanguage = "ts" | "js" | "vue" | "html" | "css" | "json" | "bash" | "text";
export type NsCodeTokenKind =
  | "plain"
  | "keyword"
  | "string"
  | "number"
  | "comment"
  | "tag"
  | "attribute"
  | "punctuation";
export type NsCodeToken = { kind: NsCodeTokenKind; text: string };

const scriptKeywords =
  "const|let|var|function|return|import|from|export|default|if|else|for|while|of|in|class|new|await|async|type|interface|extends|true|false|null|undefined|this|try|catch|throw|switch|case|break";
const bashKeywords = "sudo|cd|export|echo|if|then|fi|for|do|done|npm|pnpm|npx|yarn|git|docker";

/*
 * One pattern per language, tried left to right on each line; every match names its kind. It is
 * a light highlighter for docs and demos, not a parser: a comment spanning lines is colored line
 * by line only where it opens.
 */
const patterns: Record<Exclude<NsCodeLanguage, "text">, [NsCodeTokenKind, string][]> = {
  ts: [
    ["comment", String.raw`\/\/.*|\/\*.*?(?:\*\/|$)`],
    ["string", String.raw`"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\`(?:\\.|[^\`\\])*\``],
    ["number", String.raw`\b\d[\d_.]*\b`],
    ["keyword", String.raw`\b(?:${scriptKeywords})\b`],
    ["punctuation", String.raw`[{}()[\];,.=<>:?!+\-*/&|]`]
  ],
  js: [],
  vue: [
    ["comment", String.raw`<!--.*?(?:-->|$)|\/\/.*`],
    ["tag", String.raw`<\/?[A-Za-z][\w-]*|\/?>`],
    ["attribute", String.raw`[:@#]?[A-Za-z-]+(?==)`],
    ["string", String.raw`"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'`],
    ["keyword", String.raw`\b(?:${scriptKeywords})\b`],
    ["number", String.raw`\b\d[\d_.]*\b`]
  ],
  html: [],
  css: [
    ["comment", String.raw`\/\*.*?(?:\*\/|$)`],
    ["attribute", String.raw`--?[A-Za-z][\w-]*(?=\s*:)|[A-Za-z-]+(?=\s*:)`],
    ["string", String.raw`"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'`],
    ["number", String.raw`#[\da-fA-F]{3,8}\b|\b\d[\d.]*(?:px|rem|em|%|s|ms|deg)?\b`],
    ["keyword", String.raw`@[\w-]+|!important|\bvar\b`],
    ["punctuation", String.raw`[{}();:,]`]
  ],
  json: [
    ["attribute", String.raw`"(?:\\.|[^"\\])*"(?=\s*:)`],
    ["string", String.raw`"(?:\\.|[^"\\])*"`],
    ["number", String.raw`-?\b\d[\d.eE+-]*\b`],
    ["keyword", String.raw`\b(?:true|false|null)\b`],
    ["punctuation", String.raw`[{}[\],:]`]
  ],
  bash: [
    ["comment", String.raw`#.*`],
    ["string", String.raw`"(?:\\.|[^"\\])*"|'[^']*'`],
    ["attribute", String.raw`(?<=\s)--?[\w-]+`],
    ["keyword", String.raw`\b(?:${bashKeywords})\b`],
    ["number", String.raw`\b\d[\d.]*\b`]
  ]
};
patterns.js = patterns.ts;
patterns.html = patterns.vue;

const compiled = new Map<string, RegExp>();

function matcher(language: Exclude<NsCodeLanguage, "text">) {
  let regex = compiled.get(language);
  if (!regex) {
    regex = new RegExp(patterns[language].map(([, source]) => `(${source})`).join("|"), "g");
    compiled.set(language, regex);
  }
  return regex;
}

/** Splits one line into colored tokens. Plain text between matches stays one token. */
export function tokenizeLine(line: string, language: NsCodeLanguage): NsCodeToken[] {
  if (language === "text" || !line) return [{ kind: "plain", text: line }];
  const kinds = patterns[language].map(([kind]) => kind);
  const tokens: NsCodeToken[] = [];
  const regex = matcher(language);
  regex.lastIndex = 0;
  let last = 0;
  for (const match of line.matchAll(regex)) {
    const index = match.index ?? 0;
    if (index > last) tokens.push({ kind: "plain", text: line.slice(last, index) });
    const group = match.slice(1).findIndex((value) => value !== undefined);
    tokens.push({ kind: kinds[group] ?? "plain", text: match[0] });
    last = index + match[0].length;
  }
  if (last < line.length) tokens.push({ kind: "plain", text: line.slice(last) });
  return tokens;
}

/** Line numbers from a list such as `2, 4-6`, starting at 1. */
export function parseLineRanges(value: string | undefined): Set<number> {
  const lines = new Set<number>();
  for (const part of (value ?? "").split(",")) {
    const [start, end] = part.split("-").map((item) => Number.parseInt(item.trim(), 10));
    if (start === undefined || Number.isNaN(start)) continue;
    const last = end === undefined || Number.isNaN(end) ? start : end;
    for (let line = start; line <= last; line++) lines.add(line);
  }
  return lines;
}
