import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h } from "vue";
import NsScrollArea from "./NsScrollArea.vue";

/** The test DOM has no layout: give the viewport the sizes a browser would. */
function size(element: Element, sizes: Record<string, number>) {
  for (const [key, value] of Object.entries(sizes)) {
    Object.defineProperty(element, key, { configurable: true, writable: true, value });
  }
}

describe("NsScrollArea", () => {
  it("exposes a labelled region", () => {
    const wrapper = mount(NsScrollArea, {
      props: { label: "Opérations" },
      slots: { default: "<p>A</p>" }
    });
    const viewport = wrapper.find(".ns-scroll-area__viewport");
    expect(viewport.attributes("role")).toBe("region");
    expect(viewport.attributes("aria-label")).toBe("Opérations");
  });

  it("draws no bar and takes no focus while nothing overflows", () => {
    const wrapper = mount(NsScrollArea, { slots: { default: "<p>A</p>" } });
    expect(wrapper.find(".ns-scroll-area__bar").exists()).toBe(false);
    expect(wrapper.find(".ns-scroll-area__viewport").attributes("tabindex")).toBeUndefined();
  });

  it("draws a bar and becomes focusable once content overflows", async () => {
    const wrapper = mount(NsScrollArea, { slots: { default: "<p>A</p>" } });
    const viewport = wrapper.find(".ns-scroll-area__viewport");
    size(viewport.element, { clientHeight: 200, scrollHeight: 800, scrollTop: 0 });
    await viewport.trigger("scroll");
    expect(wrapper.find(".ns-scroll-area__bar--y").exists()).toBe(true);
    expect(viewport.attributes("tabindex")).toBe("0");
    expect(wrapper.emitted("scroll")?.[0]).toEqual([{ top: 0, left: 0 }]);
  });

  it("renders only the visible rows of a virtual list", async () => {
    const items = Array.from({ length: 10000 }, (_, index) => `Ligne ${index}`);
    const wrapper = mount(NsScrollArea, {
      props: { items, itemHeight: 40, overscan: 2 },
      slots: { item: ({ item }: { item: unknown }) => h("span", String(item)) }
    });
    const viewport = wrapper.find(".ns-scroll-area__viewport");
    expect(wrapper.find(".ns-scroll-area__virtual").attributes("style")).toContain("400000px");
    size(viewport.element, { clientHeight: 400, scrollHeight: 400000, scrollTop: 4000 });
    await viewport.trigger("scroll");
    const rows = wrapper.findAll(".ns-scroll-area__row");
    expect(rows.length).toBe(14);
    expect(rows[0]!.text()).toBe("Ligne 98");
  });

  it("fires end-reached once near the end, then again after new content", async () => {
    const wrapper = mount(NsScrollArea, {
      props: { endThreshold: 160 },
      slots: { default: "<p>A</p>" }
    });
    const viewport = wrapper.find(".ns-scroll-area__viewport");
    size(viewport.element, { clientHeight: 400, scrollHeight: 1000, scrollTop: 500 });
    await viewport.trigger("scroll");
    await viewport.trigger("scroll");
    expect(wrapper.emitted("end-reached")).toHaveLength(1);
    size(viewport.element, { scrollHeight: 2000 });
    await viewport.trigger("scroll");
    size(viewport.element, { scrollTop: 1500 });
    await viewport.trigger("scroll");
    expect(wrapper.emitted("end-reached")).toHaveLength(2);
  });

  it("applies orientation, bar mode, size and snap", () => {
    const classes = mount(NsScrollArea, {
      props: { orientation: "horizontal", scrollbars: "always", size: "thin", snap: "center" }
    }).classes();
    expect(classes).toEqual(
      expect.arrayContaining([
        "ns-scroll-area--horizontal",
        "ns-scroll-area--bars-always",
        "ns-scroll-area--thin",
        "ns-scroll-area--snap-center"
      ])
    );
  });
});
