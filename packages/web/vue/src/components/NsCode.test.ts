import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { parseLineRanges, tokenizeLine } from "./code-syntax";
import NsCode from "./NsCode.vue";

const sample = 'const total = 25000;\n// envoi\nsend("Aïcha", total);';

describe("code syntax", () => {
  it("colors keywords, numbers, strings and comments", () => {
    const kinds = tokenizeLine('const total = 25000; // "ok"', "ts").map((token) => token.kind);
    expect(kinds).toEqual(
      expect.arrayContaining(["keyword", "number", "comment", "plain", "punctuation"])
    );
    expect(tokenizeLine('"name": "Kofi"', "json")[0]).toEqual({
      kind: "attribute",
      text: '"name"'
    });
  });

  it("reads line ranges", () => {
    expect([...parseLineRanges("2, 4-6")]).toEqual([2, 4, 5, 6]);
    expect(parseLineRanges(undefined).size).toBe(0);
  });
});

describe("NsCode", () => {
  it("renders inline code as a code element", () => {
    const wrapper = mount(NsCode, {
      props: { variant: "inline", tone: "primary" },
      slots: { default: "pnpm i" }
    });
    expect(wrapper.element.tagName).toBe("CODE");
    expect(wrapper.text()).toBe("pnpm i");
    expect(wrapper.classes()).toContain("ns-code--tone-primary");
  });

  it("renders a block with a caption, lines and highlighted lines", () => {
    const wrapper = mount(NsCode, { props: { code: sample, title: "send.ts", highlight: "2" } });
    expect(wrapper.element.tagName).toBe("FIGURE");
    expect(wrapper.find("figcaption").text()).toContain("send.ts");
    const lines = wrapper.findAll(".ns-code__line");
    expect(lines).toHaveLength(3);
    expect(lines[1]!.classes()).toContain("is-highlighted");
    expect(wrapper.find(".ns-code__token--string").text()).toBe('"Aïcha"');
  });

  it("copies the source and announces it", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    const wrapper = mount(NsCode, { props: { code: sample, lineNumbers: true } });
    await wrapper.find(".ns-code__copy").trigger("click");
    await nextTick();
    await nextTick();
    expect(writeText).toHaveBeenCalledWith(sample);
    expect(wrapper.emitted("copy")?.[0]).toEqual([sample]);
    expect(wrapper.find('[role="status"]').text()).toBe("Copied");
  });

  it("collapses after maxLines and expands", async () => {
    const wrapper = mount(NsCode, { props: { code: sample, maxLines: 2 } });
    expect(wrapper.findAll(".ns-code__line")).toHaveLength(2);
    await wrapper.find(".ns-code__expand").trigger("click");
    expect(wrapper.findAll(".ns-code__line")).toHaveLength(3);
    expect(wrapper.find(".ns-code__expand").attributes("aria-expanded")).toBe("true");
  });
});
