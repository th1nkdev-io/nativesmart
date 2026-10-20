export type Token = {
  text: string;
  kind?: "comment" | "string" | "tag" | "attr" | "keyword" | "number" | "punct";
};

const keywords =
  /^(import|from|export|function|return|const|let|var|true|false|null|class|extends|lang|setup|type|module|package|void|new|if|else)$/;

/**
 * Splits code into colored tokens. Deliberately small: enough for usage snippets in markup,
 * TypeScript, Dart, Kotlin and Swift. Rendered with text nodes only, never as HTML.
 */
const pattern =
  /(\/\/[^\n]*|<!--[\s\S]*?-->)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(<\/?[A-Za-z][\w.-]*|\/?>)|([@:]?[A-Za-z_[(][\w.\-\])]*)(?==)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_]\w*\b)|([{}()[\];,.=])/g;

export function highlight(code: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  for (const match of code.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) tokens.push({ text: code.slice(last, index) });
    const [text, comment, string, tag, attr, number, word, punct] = match;
    if (comment) tokens.push({ text, kind: "comment" });
    else if (string) tokens.push({ text, kind: "string" });
    else if (tag) tokens.push({ text, kind: "tag" });
    else if (attr) tokens.push({ text, kind: "attr" });
    else if (number) tokens.push({ text, kind: "number" });
    else if (word) tokens.push({ text, kind: keywords.test(word) ? "keyword" : undefined });
    else if (punct) tokens.push({ text, kind: "punct" });
    last = index + text.length;
  }
  if (last < code.length) tokens.push({ text: code.slice(last) });
  return tokens;
}
