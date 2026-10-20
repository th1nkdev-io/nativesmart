import { getComponentContract } from "@nativesmart/contracts";
import { describe, expect, it } from "vitest";
import {
  componentSnippet,
  examplesSnippet,
  snippetLanguages,
  snippetVariantsFor
} from "./snippets";
import { defaultProps } from "./variations";

const button = getComponentContract("button")!;
const props = { ...defaultProps(button), variant: "outline", loading: true };

describe("snippets", () => {
  it("only writes props that differ from the contract defaults", () => {
    const code = componentSnippet("vue", button, props);
    expect(code).toContain('import { NsButton } from "@nativesmart/vue";');
    expect(code).toContain(
      '<NsButton label="Button" variant="outline" loading @press="onPress" />'
    );
    expect(code).not.toContain('size="md"');
  });

  it("speaks each language's idiom", () => {
    expect(componentSnippet("react", button, props)).toContain("onPress={() => {}}");
    expect(componentSnippet("angular", button, props)).toContain('[loading]="true"');
    expect(componentSnippet("flutter", button, props)).toContain(
      "variant: NsButtonVariant.outline,"
    );
    expect(componentSnippet("compose", button, props)).toContain(
      "variant = NsButtonVariant.Outline,"
    );
    expect(componentSnippet("swiftui", button, props)).toContain("variant: .outline,");
    expect(componentSnippet("html", button, props)).toContain(
      '<ns-button label="Button" variant="outline" loading></ns-button>'
    );
  });

  it("covers every target", () => {
    for (const language of snippetLanguages) {
      expect(componentSnippet(language, button, props).length).toBeGreaterThan(20);
    }
  });

  it("offers the variants of each technology, preferred first", () => {
    expect(snippetVariantsFor("vue").map((variant) => variant.label)).toEqual(["Nuxt", "Vue"]);
    expect(snippetVariantsFor("unknown")[0].language).toBe("html");
    const nuxt = componentSnippet("nuxt", button, props);
    expect(nuxt).not.toContain("import");
    expect(nuxt).toContain("function onPress()");
  });

  it("writes several examples without event handlers", () => {
    const code = examplesSnippet("vue", button, [
      { ...defaultProps(button), variant: "solid" },
      { ...defaultProps(button), variant: "ghost" }
    ]);
    expect(code).toContain(
      '  <NsButton label="Button" />\n  <NsButton label="Button" variant="ghost" />'
    );
    expect(code).not.toContain("onPress");
    expect(examplesSnippet("react", button, [props, props])).toContain("    <>");
  });
});
