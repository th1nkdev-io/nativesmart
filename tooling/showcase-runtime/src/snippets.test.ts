import { getComponentContract } from "@nativesmart/contracts";
import { describe, expect, it } from "vitest";
import { componentSnippet, snippetTargets } from "./snippets";
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
    for (const target of snippetTargets) {
      expect(componentSnippet(target.language, button, props).length).toBeGreaterThan(20);
    }
  });
});
