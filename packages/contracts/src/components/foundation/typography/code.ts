import { defineContract, property } from "../../../define";

export const codeContract = defineContract({
  status: "preview",
  id: "code",
  name: "Code",
  layer: "foundation",
  category: "typography",
  priority: "P2",
  description: "Inline and block monospace text",
  anatomy: ["root", "header", "title", "copy", "gutter", "line", "token"],
  properties: [
    property("code", "string", "Source text; the default slot can hold it instead", {
      example: 'const total = 25000;\nsend("Aïcha Diallo", total);'
    }),
    property("variant", "enum", "A block with its own lines, or a word inside a sentence", {
      values: ["block", "inline"],
      defaultValue: "block"
    }),
    property("language", "enum", "Colors keywords, strings, numbers and comments", {
      values: ["ts", "js", "vue", "html", "css", "json", "bash", "text"],
      defaultValue: "ts"
    }),
    property("title", "string", "File name or caption in the header", { example: "send.ts" }),
    property("tone", "enum", "Inline code color", {
      values: ["neutral", "primary", "success", "warning", "danger"],
      defaultValue: "neutral"
    }),
    property("size", "enum", "Text size: 12 or 14 px in a block", {
      values: ["sm", "md"],
      defaultValue: "md"
    }),
    property("lineNumbers", "boolean", "Numbers each line in a gutter", { defaultValue: false }),
    property("highlight", "string", "Lines to emphasise, such as 2 or 4-6", { example: "4" }),
    property("prompt", "boolean", "Starts each line with a shell prompt that is not copied", {
      defaultValue: false
    }),
    property("wrap", "boolean", "Wraps long lines instead of scrolling sideways", {
      defaultValue: false
    }),
    property("copyable", "boolean", "Shows a copy button", { defaultValue: true }),
    property("maxLines", "number", "Lines shown before an expand button"),
    property("copyLabel", "string", "Accessible name of the copy button", {
      defaultValue: "Copy code"
    }),
    property("copiedLabel", "string", "Announced once the code is copied", {
      defaultValue: "Copied"
    }),
    property("children", "slot", "Source text, when code is not set"),
    property("actions", "slot", "Extra buttons in the header, before copy")
  ],
  events: ["copy"],
  states: ["default", "copied", "collapsed"],
  accessibility: {
    role: "none",
    requirements: [
      "Inline code is a code element; a block is a pre inside a figure, captioned by its title",
      "A block that scrolls sideways is focusable so the keyboard can scroll it",
      "Line numbers and prompts are hidden from assistive tech and are never copied",
      "The copy button has an accessible name and announces the copy in a live region"
    ]
  },
  semanticTokens: ["code.background", "code.font", "code.syntax", "code.highlight"],
  docs: {
    anatomy: {
      root: "The code element inline, or a figure around the block",
      header: "Title, language and actions above a block",
      title: "File name or caption, read as the figure caption",
      copy: "Copies the source without numbers or prompts, then confirms",
      gutter: "Line numbers or the shell prompt, outside the copied text",
      line: "One source line; highlighted lines get a primary tint and a bar",
      token: "A colored piece of syntax: keyword, string, number, comment or tag"
    },
    events: {
      copy: { description: "The code was copied to the clipboard", payload: "The copied source" }
    },
    states: {
      copied: "The copy icon turns into a check for two seconds",
      collapsed: "Only the first lines show, under a fade, with a button to expand"
    },
    tokens: {
      "code.background": "Sunken surface in a block, muted surface inline",
      "code.font": "Mono family at the code text size",
      "code.syntax":
        "Keywords primary, strings success, numbers warning, tags info, comments subtle",
      "code.highlight": "Primary tint with a 2 px primary bar at the start"
    }
  }
});
