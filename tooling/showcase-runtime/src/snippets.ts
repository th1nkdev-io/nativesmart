import type { ComponentContract, ComponentProperty } from "@nativesmart/contracts";
import type { ShowcaseProps, ShowcasePropValue } from "./protocol";

export type SnippetLanguage =
  | "nuxt"
  | "vue"
  | "react"
  | "html"
  | "svelte"
  | "angular"
  | "react-native"
  | "flutter"
  | "compose"
  | "swiftui"
  | "maui";

/** One way of writing a component in a technology, for example Nuxt or plain Vue. */
export type SnippetVariant = { language: SnippetLanguage; label: string };

const webComponents: readonly SnippetVariant[] = [{ language: "html", label: "Web Components" }];

const rendererSnippets: Readonly<Record<string, readonly SnippetVariant[]>> = {
  vue: [
    { language: "nuxt", label: "Nuxt" },
    { language: "vue", label: "Vue" }
  ],
  "react-web": [{ language: "react", label: "React" }],
  "html-css": [{ language: "html", label: "HTML" }],
  svelte: [{ language: "svelte", label: "Svelte" }],
  angular: [{ language: "angular", label: "Angular" }],
  "react-native": [{ language: "react-native", label: "React Native" }],
  "react-native-nativewind": [{ language: "react-native", label: "React Native" }],
  flutter: [{ language: "flutter", label: "Dart" }],
  compose: [{ language: "compose", label: "Kotlin" }],
  swiftui: [{ language: "swiftui", label: "Swift" }],
  maui: [{ language: "maui", label: "XAML" }],
  "ionic-capacitor": webComponents,
  "desktop-web": webComponents
};

/** Ways of writing a component for one renderer of the platform registry, preferred first. */
export function snippetVariantsFor(renderer: string): readonly SnippetVariant[] {
  return rendererSnippets[renderer] ?? webComponents;
}

export const snippetLanguages: readonly SnippetLanguage[] = [
  "nuxt",
  "vue",
  "react",
  "html",
  "svelte",
  "angular",
  "react-native",
  "flutter",
  "compose",
  "swiftui",
  "maui"
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

const indent = (text: string, prefix: string) =>
  text
    .split("\n")
    .map((line) => (line ? `${prefix}${line}` : line))
    .join("\n");

type Attribute = (property: ComponentProperty, value: ShowcasePropValue) => string;

function markupTag(
  tag: string,
  contract: ComponentContract,
  props: ShowcaseProps,
  attribute: Attribute,
  event: ((name: string) => string) | null,
  selfClosing: boolean
) {
  const items = [
    ...changedProps(contract, props).map(({ property, value }) => attribute(property, value)),
    ...(event ? contract.events.slice(0, 1).map(event) : [])
  ];
  const close = selfClosing ? " />" : `></${tag}>`;
  return lines(items, "", `<${tag}`, close).trimEnd();
}

/** How one language writes a single usage, and the file around one or several usages. */
type Language = {
  usage: (contract: ComponentContract, props: ShowcaseProps, events: boolean) => string;
  wrap: (contract: ComponentContract, usages: readonly string[], events: boolean) => string;
};

const firstEvent = (contract: ComponentContract, events: boolean) =>
  events ? contract.events[0] : undefined;

function vueLanguage(withImport: boolean): Language {
  return {
    usage: (contract, props, events) =>
      markupTag(
        `Ns${pascal(contract.id)}`,
        contract,
        props,
        (property, value) => {
          if (property.kind === "boolean") return property.name;
          if (property.kind === "number") return `:${property.name}="${value}"`;
          if (Array.isArray(value)) return `:${property.name}='${listLiteral(value)}'`;
          return `${property.name}=${quote(String(value))}`;
        },
        events ? (event) => `@${event}="${handler(event)}"` : null,
        true
      ),
    wrap: (contract, usages, events) => {
      const event = firstEvent(contract, events);
      const script = [
        withImport ? `import { Ns${pascal(contract.id)} } from "@nativesmart/vue";` : "",
        event ? `function ${handler(event)}() {\n  // ...\n}` : ""
      ].filter(Boolean);
      const head = script.length
        ? `<script setup lang="ts">\n${script.join("\n\n")}\n</script>\n\n`
        : "";
      return `${head}<template>\n${indent(usages.join("\n"), "  ")}\n</template>`;
    }
  };
}

function jsxLanguage(from: string): Language {
  return {
    usage: (contract, props, events) =>
      markupTag(
        pascal(contract.id),
        contract,
        props,
        (property, value) => {
          if (property.kind === "boolean") return property.name;
          if (property.kind === "number") return `${property.name}={${value}}`;
          if (Array.isArray(value)) return `${property.name}={${listLiteral(value)}}`;
          return `${property.name}=${quote(String(value))}`;
        },
        events ? (event) => `${handler(event)}={() => {}}` : null,
        true
      ),
    wrap: (contract, usages) => {
      const body =
        usages.length === 1
          ? indent(usages[0], "    ")
          : `    <>\n${indent(usages.join("\n"), "      ")}\n    </>`;
      return `import { ${pascal(contract.id)} } from "${from}";\n\nexport function Example() {\n  return (\n${body}\n  );\n}`;
    }
  };
}

const html: Language = {
  usage: (contract, props) =>
    markupTag(
      `ns-${contract.id}`,
      contract,
      props,
      (property, value) => {
        const attribute = property.name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
        if (property.kind === "boolean") return attribute;
        if (Array.isArray(value)) return `${attribute}='${JSON.stringify(value)}'`;
        return `${attribute}=${quote(String(value))}`;
      },
      null,
      false
    ),
  wrap: (contract, usages, events) => {
    const event = firstEvent(contract, events);
    const listener = event
      ? `\n  document.querySelector("ns-${contract.id}").addEventListener("ns-${event}", () => {});`
      : "";
    return `${usages.join("\n")}\n\n<script type="module">\n  import "@nativesmart/elements";${listener}\n</script>`;
  }
};

const svelte: Language = {
  usage: (contract, props, events) =>
    markupTag(
      pascal(contract.id),
      contract,
      props,
      (property, value) => {
        if (property.kind === "boolean") return property.name;
        if (property.kind === "number" || Array.isArray(value)) {
          return `${property.name}={${Array.isArray(value) ? listLiteral(value) : value}}`;
        }
        return `${property.name}=${quote(String(value))}`;
      },
      events ? (event) => `on${event}={() => {}}` : null,
      true
    ),
  wrap: (contract, usages) =>
    `<script lang="ts">\n  import { ${pascal(contract.id)} } from "@nativesmart/svelte";\n</script>\n\n${usages.join("\n")}`
};

const angular: Language = {
  usage: (contract, props, events) =>
    markupTag(
      `ns-${contract.id}`,
      contract,
      props,
      (property, value) => {
        if (property.kind === "boolean") return `[${property.name}]="true"`;
        if (property.kind === "number") return `[${property.name}]="${value}"`;
        if (Array.isArray(value)) return `[${property.name}]="${listLiteral(value, "'")}"`;
        return `${property.name}=${quote(String(value))}`;
      },
      events ? (event) => `(${event})="${handler(event)}()"` : null,
      false
    ),
  wrap: (_, usages) => usages.join("\n")
};

/** Dart, Kotlin and Swift share a "name: value" call syntax with their own literals. */
type NativeOptions = {
  separator: string;
  string: (value: string) => string;
  enumValue: (name: string, property: ComponentProperty, value: string) => string;
  list: (value: readonly string[]) => string;
  callback: string;
  trailingComma: boolean;
  header: (name: string) => string;
};

function nativeLanguage(options: NativeOptions): Language {
  return {
    usage: (contract, props, events) => {
      const name = `Ns${pascal(contract.id)}`;
      const args = changedProps(contract, props).map(({ property, value }) => {
        const literal =
          property.kind === "enum"
            ? options.enumValue(name, property, String(value))
            : Array.isArray(value)
              ? options.list(value)
              : typeof value === "string"
                ? options.string(value)
                : String(value);
        return `${property.name}${options.separator}${literal}`;
      });
      const event = firstEvent(contract, events);
      if (event) args.push(`${handler(event)}${options.separator}${options.callback}`);
      if (args.length === 0) return `${name}()`;
      const body = args.map((arg) => `  ${arg},`).join("\n");
      return `${name}(\n${options.trailingComma ? body : body.replace(/,$/, "")}\n)`;
    },
    wrap: (contract, usages) =>
      `${options.header(`Ns${pascal(contract.id)}`)}\n\n${usages.join("\n\n")}`
  };
}

const maui: Language = {
  usage: (contract, props, events) =>
    markupTag(
      `ns:Ns${pascal(contract.id)}`,
      contract,
      props,
      (property, value) => {
        const name = pascal(property.name);
        if (property.kind === "boolean") return `${name}="True"`;
        if (Array.isArray(value)) return `${name}="{Binding ${name}}"`;
        if (property.kind === "enum") return `${name}="${pascal(String(value))}"`;
        return `${name}=${quote(String(value))}`;
      },
      events ? (event) => `${pascal(event)}="${pascal(handler(event))}"` : null,
      true
    ),
  wrap: (_, usages) =>
    `<!-- xmlns:ns="clr-namespace:NativeSmart.Maui;assembly=NativeSmart.Maui" -->\n${usages.join("\n")}`
};

const languages: Readonly<Record<SnippetLanguage, Language>> = {
  nuxt: vueLanguage(false),
  vue: vueLanguage(true),
  react: jsxLanguage("@nativesmart/react"),
  "react-native": jsxLanguage("@nativesmart/react-native"),
  html,
  svelte,
  angular,
  flutter: nativeLanguage({
    separator: ": ",
    string: (value) => quote(value, "'"),
    enumValue: (name, property, value) => `${name}${pascal(property.name)}.${camel(value)}`,
    list: (value) => listLiteral(value, "'"),
    callback: "() {}",
    trailingComma: true,
    header: () => "import 'package:nativesmart_flutter/nativesmart_flutter.dart';"
  }),
  compose: nativeLanguage({
    separator: " = ",
    string: (value) => quote(value),
    enumValue: (name, property, value) => `${name}${pascal(property.name)}.${pascal(value)}`,
    list: (value) => `listOf(${value.map((item) => quote(item)).join(", ")})`,
    callback: "{ }",
    trailingComma: false,
    header: (name) => `import com.thinkdev.nativesmart.compose.${name}`
  }),
  swiftui: nativeLanguage({
    separator: ": ",
    string: (value) => quote(value),
    enumValue: (_, __, value) => `.${camel(value)}`,
    list: (value) => listLiteral(value),
    callback: "{ }",
    trailingComma: false,
    header: () => "import NativesmartSwiftUI"
  }),
  maui
};

/** Usage code of a component with the given props, for one language. */
export function componentSnippet(
  language: SnippetLanguage,
  contract: ComponentContract,
  props: ShowcaseProps
) {
  const { usage, wrap } = languages[language];
  return wrap(contract, [usage(contract, props, true)], true);
}

/** Usage code of several examples of a component side by side, without event handlers. */
export function examplesSnippet(
  language: SnippetLanguage,
  contract: ComponentContract,
  examples: readonly ShowcaseProps[]
) {
  const { usage, wrap } = languages[language];
  return wrap(
    contract,
    examples.map((props) => usage(contract, props, false)),
    false
  );
}
