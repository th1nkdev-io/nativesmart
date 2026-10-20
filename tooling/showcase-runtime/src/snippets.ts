import type { ComponentContract, ComponentProperty } from "@nativesmart/contracts";
import type { ShowcaseProps, ShowcasePropValue } from "./protocol";

export type SnippetLanguage =
  | "vue"
  | "react"
  | "html"
  | "svelte"
  | "angular"
  | "react-native"
  | "flutter"
  | "compose"
  | "swiftui";

export type SnippetTarget = {
  language: SnippetLanguage;
  /** Platform registry renderer that ships this API. */
  renderer: string;
  label: string;
  /** Syntax used to highlight the snippet. */
  syntax: "markup" | "tsx" | "dart" | "kotlin" | "swift";
};

export const snippetTargets: readonly SnippetTarget[] = [
  { language: "vue", renderer: "vue", label: "Vue", syntax: "markup" },
  { language: "react", renderer: "react-web", label: "React", syntax: "tsx" },
  { language: "html", renderer: "html-css", label: "Web Components", syntax: "markup" },
  { language: "svelte", renderer: "svelte", label: "Svelte", syntax: "markup" },
  { language: "angular", renderer: "angular", label: "Angular", syntax: "markup" },
  { language: "react-native", renderer: "react-native", label: "React Native", syntax: "tsx" },
  { language: "flutter", renderer: "flutter", label: "Flutter", syntax: "dart" },
  { language: "compose", renderer: "compose", label: "Compose", syntax: "kotlin" },
  { language: "swiftui", renderer: "swiftui", label: "SwiftUI", syntax: "swift" }
];

const pascal = (id: string) =>
  id.replace(/(^|-)([a-z0-9])/g, (_, __: string, letter: string) => letter.toUpperCase());
const camel = (id: string) => pascal(id).replace(/^./, (letter) => letter.toLowerCase());
const handler = (event: string) => `on${pascal(event)}`;

/** Props that differ from the contract defaults, in contract order. */
function changedProps(contract: ComponentContract, props: ShowcaseProps) {
  return contract.properties
    .filter((property) => property.name in props)
    .filter((property) => props[property.name] !== property.defaultValue)
    .filter((property) => !(property.kind === "boolean" && props[property.name] === false))
    .map((property) => ({ property, value: props[property.name] }));
}

function quote(value: string, mark = '"') {
  return `${mark}${value.replaceAll(mark, `\\${mark}`)}${mark}`;
}

function listLiteral(value: readonly string[], mark = '"') {
  return `[${value.map((item) => quote(item, mark)).join(", ")}]`;
}

function lines(items: readonly string[], indent: string, open: string, close: string) {
  if (items.length === 0) return `${open}${close}`;
  const inline = `${open} ${items.join(" ")}${close}`;
  if (inline.length <= 80) return inline;
  return `${open}\n${items.map((item) => `${indent}  ${item}`).join("\n")}\n${indent}${close.trimStart()}`;
}

type Attribute = (property: ComponentProperty, value: ShowcasePropValue) => string;

function markupTag(
  tag: string,
  contract: ComponentContract,
  props: ShowcaseProps,
  attribute: Attribute,
  event: (name: string) => string,
  selfClosing: boolean,
  indent = ""
) {
  const items = [
    ...changedProps(contract, props).map(({ property, value }) => attribute(property, value)),
    ...contract.events.slice(0, 1).map(event)
  ];
  const close = selfClosing ? " />" : `></${tag}>`;
  return lines(items, indent, `${indent}<${tag}`, close).trimEnd();
}

function vue(contract: ComponentContract, props: ShowcaseProps) {
  const name = `Ns${pascal(contract.id)}`;
  const tag = markupTag(
    name,
    contract,
    props,
    (property, value) => {
      if (property.kind === "boolean") return property.name;
      if (property.kind === "number") return `:${property.name}="${value}"`;
      if (Array.isArray(value)) return `:${property.name}='${listLiteral(value)}'`;
      return `${property.name}=${quote(String(value))}`;
    },
    (event) => `@${event}="${handler(event)}"`,
    true,
    "  "
  );
  const script = contract.events.length
    ? `\n\nfunction ${handler(contract.events[0])}() {\n  // ...\n}`
    : "";
  return `<script setup lang="ts">\nimport { ${name} } from "@nativesmart/vue";${script}\n</script>\n\n<template>\n${tag}\n</template>`;
}

function jsx(contract: ComponentContract, props: ShowcaseProps, from: string) {
  const name = pascal(contract.id);
  const tag = markupTag(
    name,
    contract,
    props,
    (property, value) => {
      if (property.kind === "boolean") return property.name;
      if (property.kind === "number") return `${property.name}={${value}}`;
      if (Array.isArray(value)) return `${property.name}={${listLiteral(value)}}`;
      return `${property.name}=${quote(String(value))}`;
    },
    (event) => `${handler(event)}={() => {}}`,
    true,
    "    "
  );
  return `import { ${name} } from "${from}";\n\nexport function Example() {\n  return (\n${tag}\n  );\n}`;
}

function webComponent(contract: ComponentContract, props: ShowcaseProps) {
  const tag = `ns-${contract.id}`;
  const element = markupTag(
    tag,
    contract,
    props,
    (property, value) => {
      const attribute = property.name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
      if (property.kind === "boolean") return attribute;
      if (Array.isArray(value)) return `${attribute}='${JSON.stringify(value)}'`;
      return `${attribute}=${quote(String(value))}`;
    },
    () => "",
    false
  ).replace(/ +>/, ">");
  const listener = contract.events.length
    ? `\n\n<script type="module">\n  import "@nativesmart/elements";\n  document.querySelector("${tag}").addEventListener("ns-${contract.events[0]}", () => {});\n</script>`
    : `\n\n<script type="module">\n  import "@nativesmart/elements";\n</script>`;
  return `${element}${listener}`;
}

function svelte(contract: ComponentContract, props: ShowcaseProps) {
  const name = pascal(contract.id);
  const tag = markupTag(
    name,
    contract,
    props,
    (property, value) => {
      if (property.kind === "boolean") return property.name;
      if (property.kind === "number" || Array.isArray(value)) {
        return `${property.name}={${Array.isArray(value) ? listLiteral(value) : value}}`;
      }
      return `${property.name}=${quote(String(value))}`;
    },
    (event) => `on${event}={() => {}}`,
    true
  );
  return `<script lang="ts">\n  import { ${name} } from "@nativesmart/svelte";\n</script>\n\n${tag}`;
}

function angular(contract: ComponentContract, props: ShowcaseProps) {
  return markupTag(
    `ns-${contract.id}`,
    contract,
    props,
    (property, value) => {
      if (property.kind === "boolean") return `[${property.name}]="true"`;
      if (property.kind === "number") return `[${property.name}]="${value}"`;
      if (Array.isArray(value)) return `[${property.name}]="${listLiteral(value, "'")}"`;
      return `${property.name}=${quote(String(value))}`;
    },
    (event) => `(${event})="${handler(event)}()"`,
    false
  );
}

/** Dart, Kotlin and Swift share a "name: value" call syntax with their own literals. */
function nativeCall(
  contract: ComponentContract,
  props: ShowcaseProps,
  options: {
    name: string;
    separator: string;
    string: (value: string) => string;
    enumValue: (property: ComponentProperty, value: string) => string;
    list: (value: readonly string[]) => string;
    callback: string;
  }
) {
  const args = changedProps(contract, props).map(({ property, value }) => {
    const literal =
      property.kind === "enum"
        ? options.enumValue(property, String(value))
        : Array.isArray(value)
          ? options.list(value)
          : typeof value === "string"
            ? options.string(value)
            : String(value);
    return `${property.name}${options.separator}${literal}`;
  });
  if (contract.events.length) {
    args.push(`${handler(contract.events[0])}${options.separator}${options.callback}`);
  }
  if (args.length === 0) return `${options.name}()`;
  return `${options.name}(\n${args.map((arg) => `  ${arg},`).join("\n")}\n)`;
}

function flutter(contract: ComponentContract, props: ShowcaseProps) {
  const name = `Ns${pascal(contract.id)}`;
  const call = nativeCall(contract, props, {
    name,
    separator: ": ",
    string: (value) => quote(value, "'"),
    enumValue: (property, value) => `${name}${pascal(property.name)}.${camel(value)}`,
    list: (value) => listLiteral(value, "'"),
    callback: "() {}"
  });
  return `import 'package:nativesmart_flutter/nativesmart_flutter.dart';\n\n${call}`;
}

function compose(contract: ComponentContract, props: ShowcaseProps) {
  const name = `Ns${pascal(contract.id)}`;
  const call = nativeCall(contract, props, {
    name,
    separator: " = ",
    string: (value) => quote(value),
    enumValue: (property, value) => `${name}${pascal(property.name)}.${pascal(value)}`,
    list: (value) => `listOf(${value.map((item) => quote(item)).join(", ")})`,
    callback: "{ }"
  });
  return `import com.thinkdev.nativesmart.compose.${name}\n\n${call.replace(/,\n\)$/, "\n)")}`;
}

function swiftui(contract: ComponentContract, props: ShowcaseProps) {
  const name = `Ns${pascal(contract.id)}`;
  const call = nativeCall(contract, props, {
    name,
    separator: ": ",
    string: (value) => quote(value),
    enumValue: (_, value) => `.${camel(value)}`,
    list: (value) => listLiteral(value),
    callback: "{ }"
  });
  return `import NativesmartSwiftUI\n\n${call.replace(/,\n\)$/, "\n)")}`;
}

/** Usage code of a component with the given props, for one language. */
export function componentSnippet(
  language: SnippetLanguage,
  contract: ComponentContract,
  props: ShowcaseProps
) {
  switch (language) {
    case "vue":
      return vue(contract, props);
    case "react":
      return jsx(contract, props, "@nativesmart/react");
    case "react-native":
      return jsx(contract, props, "@nativesmart/react-native");
    case "html":
      return webComponent(contract, props);
    case "svelte":
      return svelte(contract, props);
    case "angular":
      return angular(contract, props);
    case "flutter":
      return flutter(contract, props);
    case "compose":
      return compose(contract, props);
    case "swiftui":
      return swiftui(contract, props);
  }
}
