<script setup lang="ts">
import {
  brandThemes,
  semanticColorRoles,
  toCSharp,
  toCss,
  toDart,
  toDesignTokens,
  toKotlin,
  toSwift,
  toXaml
} from "@nativesmart/tokens";
import { computed, ref, watch } from "vue";
import { useCopy } from "../../lib/clipboard";
import { highlight } from "../../lib/highlight";
import { tokenPlatform } from "../../lib/tokenPlatform";
import { state } from "../../state";
import { technologyFamilies } from "../../technologies";

const theme = computed(() => brandThemes[state.brand]);

type Format = {
  id: string;
  label: string;
  file: string;
  audience: string;
  usage: string;
  /** Excerpt of the generated file, from a marker. */
  excerpt: () => string;
};

/** Lines of `source` starting at the first line containing `marker`. */
function from(source: string, marker: string, count = 28) {
  const lines = source.split("\n");
  const start = Math.max(
    0,
    lines.findIndex((line) => line.includes(marker))
  );
  return [...lines.slice(start, start + count), "…"].join("\n");
}

const formats = computed<Format[]>(() => {
  const id = theme.value.id;
  const brandType = id.replace(/(^|-)([a-z])/g, (_, __, letter: string) => letter.toUpperCase());
  const brandName = brandType.charAt(0).toLowerCase() + brandType.slice(1);
  return [
    {
      id: "css",
      label: "CSS",
      file: `@nativesmart/tokens/css/${id}.css`,
      audience: "Vue, React, Svelte, Angular, HTML",
      usage: `/* main.css */\n@import "@nativesmart/tokens/css/${id}.css";\n\n.card {\n  padding: var(--ns-inset-lg);\n  border-radius: var(--ns-radius-card);\n  background: var(--ns-color-surface);\n  box-shadow: var(--ns-elevation-card);\n  transition: box-shadow var(--ns-transition-move);\n}`,
      excerpt: () => from(toCss(theme.value), ":root", 24)
    },
    {
      id: "tailwind",
      label: "Tailwind",
      file: "@nativesmart/tailwind-preset",
      audience: "Tailwind CSS 3 et 4, NativeWind",
      usage: `// tailwind.config.ts\nimport { nativesmartPreset } from "@nativesmart/tailwind-preset";\n\nexport default { presets: [nativesmartPreset] };\n\n<div class="p-ns-inset-lg rounded-ns-card bg-ns-surface shadow-ns-elevation-card">\n  <h2 class="text-ns-title-md text-ns-text">Solde</h2>\n</div>`,
      excerpt: () =>
        `colors: { ns: { ${semanticColorRoles
          .slice(0, 6)
          .map((role) => role.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`))
          .join(
            ", "
          )}, … } }\nspacing: { "ns-inset-md", "ns-stack-lg", "ns-0-5", … }\nborderRadius: { "ns-card", "ns-sheet", "ns-md", … }\nboxShadow: { "ns-elevation-modal", "ns-glow-md", "ns-inset-sm", … }\ntransitionTimingFunction: { "ns-standard", "ns-spring-bouncy", … }\nanimation: { "ns-fade-in", "ns-slide-up", … }`
    },
    {
      id: "dtcg",
      label: "W3C · Figma",
      file: `@nativesmart/tokens/dtcg/${id}.light.tokens.json`,
      audience: "Figma, Tokens Studio, Style Dictionary",
      usage: `${id}.light.tokens.json\n${id}.dark.tokens.json\n${id}.light-hc.tokens.json\n${id}.dark-hc.tokens.json\n\n// Format du W3C Design Tokens Community Group :\n// importez-le dans Tokens Studio ou transformez-le avec Style Dictionary.`,
      excerpt: () => {
        const tokens = toDesignTokens(theme.value, "light") as Record<string, unknown>;
        const color = tokens.color as Record<string, unknown>;
        const typography = tokens.typography as Record<string, unknown>;
        return JSON.stringify(
          {
            color: { primary: color.primary, onPrimary: color.onPrimary, "…": "" },
            typography: { h1: typography.h1 }
          },
          null,
          2
        );
      }
    },
    {
      id: "swift",
      label: "SwiftUI",
      file: "@nativesmart/tokens/swift/NativesmartTokens.swift",
      audience: "iOS, iPadOS, macOS, visionOS",
      usage: `struct BalanceCard: View {\n  @Environment(\\.nsTheme) var theme\n  @State private var expanded = false\n\n  var body: some View {\n    Text("Solde")\n      .padding(NsTokens.Space.s4)\n      .background(theme.colors.surface)\n      .clipShape(RoundedRectangle(cornerRadius: theme.shape.card))\n      .animation(NsTokens.Spring.snappy, value: expanded)\n  }\n}\n\n// App : .environment(\\.nsTheme, NsBrands.${brandType}.light)`,
      excerpt: () => from(toSwift(), `public enum ${brandType}`, 16)
    },
    {
      id: "kotlin",
      label: "Compose",
      file: "@nativesmart/tokens/compose/NativesmartTokens.kt",
      audience: "Android, Wear OS, Compose Multiplatform",
      usage: `@Composable\nfun BalanceCard() {\n  Box(\n    Modifier\n      .background(NsTheme.colors.surface, RoundedCornerShape(NsTheme.shape.card))\n      .padding(NsTokens.Space.s4)\n  ) {\n    Text("Solde", color = NsTheme.colors.text)\n  }\n}\n\n// App : CompositionLocalProvider(LocalNsTheme provides NsBrands.${brandType}.light) { … }`,
      excerpt: () => from(toKotlin(), `object ${brandType}`, 16)
    },
    {
      id: "dart",
      label: "Flutter",
      file: "@nativesmart/tokens/flutter/nativesmart_theme.g.dart",
      audience: "iOS, Android, web et desktop avec Flutter",
      usage: `Widget build(BuildContext context) {\n  final theme = NsTheme.of(context);\n  return Container(\n    padding: const EdgeInsets.all(NsSpace.s4),\n    decoration: BoxDecoration(\n      color: theme.colors.surface,\n      borderRadius: BorderRadius.circular(theme.shape.card),\n    ),\n    child: Text('Solde', style: NsTextStyles.titleMd),\n  );\n}\n\n// App : NsTheme(data: NsBrands.${brandName}Light, child: …)`,
      excerpt: () => from(toDart(), `static const ${brandName}Light`, 16)
    },
    {
      id: "csharp",
      label: ".NET MAUI",
      file: "@nativesmart/tokens/maui/NativesmartTokens.cs",
      audience: "iOS, Android, Windows et macOS avec .NET MAUI",
      usage: `<!-- App.xaml : un dictionnaire par identité et par mode -->\n<ResourceDictionary Source="Tokens/${id}.light.xaml" />\n\n<Border Padding="{StaticResource SpaceS4}"\n        BackgroundColor="{DynamicResource ColorSurface}">\n  <Border.StrokeShape>\n    <RoundRectangle CornerRadius="{DynamicResource RadiusCard}" />\n  </Border.StrokeShape>\n  <Label Text="Solde" TextColor="{DynamicResource ColorText}" />\n</Border>\n\n// C# : var theme = NsBrands.${brandType}.Light;\nlabel.TextColor = theme.Colors.Text;`,
      excerpt: () =>
        from(toXaml(theme.value, "light"), "<ResourceDictionary", 10) +
        "\n\n" +
        from(toCSharp(), "public static class Space", 10)
    },
    {
      id: "react-native",
      label: "React Native",
      file: "@nativesmart/tokens/react-native",
      audience: "iOS et Android avec React Native, Expo",
      usage: `import { useNativesmartTheme } from "@nativesmart/react-native";\n\nexport function BalanceCard() {\n  const theme = useNativesmartTheme();\n  return (\n    <View style={{ padding: theme.spacing[4], backgroundColor: theme.colors.surface }}>\n      <Text style={{ color: theme.colors.text }}>Solde</Text>\n    </View>\n  );\n}`,
      excerpt: () =>
        `export const primitives = { colors, spacing, spaceUsages, radius, typography,\n  sizing, density, aspectRatios, grid, chrome, borders, elevation,\n  elevationUsages, insetShadows, glows, blur, materials, iconography,\n  accessibility, opacity, alpha, zIndex, motion, breakpoints } as const;\n\nexport const themes = { light: { mode: "light", colors: { … } }, dark: { … } };`
    }
  ];
});

const defaults: Record<string, string> = {
  swift: "swift",
  kotlin: "kotlin",
  dart: "dart",
  csharp: "csharp",
  "react-native": "react-native",
  css: "css"
};
const active = ref(defaults[tokenPlatform.value] ?? "css");
watch(tokenPlatform, (platform) => (active.value = defaults[platform] ?? "css"));

const format = computed(
  () => formats.value.find((item) => item.id === active.value) ?? formats.value[0]
);
const usage = computed(() => highlight(format.value.usage));
const excerpt = computed(() => highlight(format.value.excerpt()));
const { copied, copy } = useCopy();

/* Coverage: the format each technology reads, and the Tailwind preset where it applies. */
const consumes: Record<string, { format: string; extra?: string; note: string }> = {
  vue: { format: "css", extra: "tailwind", note: "Variables CSS, thème par attribut" },
  "react-web": { format: "css", extra: "tailwind", note: "Variables CSS, thème par attribut" },
  "html-css": { format: "css", extra: "tailwind", note: "Une feuille de style, sans build" },
  svelte: { format: "css", extra: "tailwind", note: "Variables CSS, thème par attribut" },
  angular: { format: "css", extra: "tailwind", note: "Variables CSS, thème par attribut" },
  "react-native": { format: "react-native", note: "Objets typés, hook de thème" },
  "react-native-nativewind": {
    format: "react-native",
    extra: "tailwind",
    note: "Préréglage Tailwind via NativeWind"
  },
  flutter: { format: "dart", note: "ThemeExtension et constantes" },
  compose: { format: "kotlin", note: "CompositionLocal et objets" },
  swiftui: { format: "swift", note: "EnvironmentValues et enums" },
  "ionic-capacitor": { format: "css", extra: "tailwind", note: "Variables CSS dans la WebView" },
  maui: { format: "csharp", note: "ResourceDictionary XAML et classes C#" },
  "desktop-web": { format: "css", extra: "tailwind", note: "Variables CSS dans Electron ou Tauri" }
};
const formatLabel = (formatId: string) =>
  formats.value.find((item) => item.id === formatId)?.label ?? formatId;
const coveredCount = computed(
  () =>
    technologyFamilies.flatMap((family) => family.items).filter((tech) => consumes[tech.id]).length
);
</script>

<template>
  <div class="token-sections">
    <section class="token-section">
      <header class="token-section__header">
        <h2>Une source, huit formats</h2>
        <p>
          Les tokens sont écrits une fois en TypeScript, validés, puis générés pour chaque
          plateforme à la compilation. Les noms ne changent pas d'un format à l'autre :
          <code>primary</code> reste <code>primary</code>, du CSS à SwiftUI.
        </p>
      </header>

      <div class="export-flow" aria-hidden="true">
        <span class="export-flow__source">
          <strong>tokens.ts</strong>
          <small>{{ semanticColorRoles.length }} rôles · 3 identités · 4 modes</small>
        </span>
        <span class="export-flow__line" />
        <span class="export-flow__targets">
          <button
            v-for="item in formats"
            :key="item.id"
            type="button"
            tabindex="-1"
            :class="{ 'is-active': item.id === active }"
            @click="active = item.id"
          >
            {{ item.label }}
          </button>
        </span>
      </div>

      <div class="export-card">
        <div class="export-card__tabs" role="tablist" aria-label="Formats">
          <button
            v-for="item in formats"
            :key="item.id"
            type="button"
            role="tab"
            :aria-selected="item.id === active"
            @click="active = item.id"
          >
            {{ item.label }}
          </button>
        </div>
        <div class="export-card__meta">
          <code>{{ format.file }}</code>
          <span class="muted">{{ format.audience }}</span>
        </div>
        <div class="export-card__panes">
          <figure>
            <figcaption>
              Utilisation
              <button type="button" class="export-card__copy" @click="copy(format.usage)">
                {{ copied ? "Copié" : "Copier" }}
              </button>
            </figcaption>
            <pre class="code-block__pre" dir="ltr"><code><span
              v-for="(token, index) in usage"
              :key="index"
              :class="token.kind && `tok-${token.kind}`"
            >{{ token.text }}</span></code></pre>
          </figure>
          <figure>
            <figcaption>Extrait du fichier généré · {{ theme.name }}</figcaption>
            <pre class="code-block__pre export-card__excerpt" dir="ltr"><code><span
              v-for="(token, index) in excerpt"
              :key="index"
              :class="token.kind && `tok-${token.kind}`"
            >{{ token.text }}</span></code></pre>
          </figure>
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Couverture des technologies</h2>
        <p>
          Chacune des {{ coveredCount }} technologies lit les tokens dans son format natif, généré à
          chaque compilation. Figma et les outils de design lisent le format W3C.
        </p>
      </header>
      <div class="export-coverage">
        <div
          v-for="family in technologyFamilies"
          :key="family.family"
          class="export-coverage__family"
        >
          <small class="export-coverage__label">{{ family.label }}</small>
          <div
            v-for="tech in family.items"
            :key="tech.id"
            :class="['export-coverage__row', { 'is-active': consumes[tech.id]?.format === active }]"
          >
            <span class="export-coverage__tech">
              <svg
                v-if="tech.icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
                :style="{ color: `#${tech.icon.hex}` }"
              >
                <path :d="tech.icon.path" />
              </svg>
              <strong>{{ tech.name }}</strong>
            </span>
            <span class="export-coverage__note">{{ consumes[tech.id]?.note }}</span>
            <span class="export-coverage__formats">
              <button
                v-if="consumes[tech.id]"
                type="button"
                class="export-coverage__chip"
                @click="active = consumes[tech.id].format"
              >
                {{ formatLabel(consumes[tech.id].format) }}
              </button>
              <button
                v-if="consumes[tech.id]?.extra"
                type="button"
                class="export-coverage__chip export-coverage__chip--soft"
                @click="active = consumes[tech.id].extra!"
              >
                + {{ formatLabel(consumes[tech.id].extra!) }}
              </button>
            </span>
            <span class="export-coverage__check" aria-label="Généré">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
