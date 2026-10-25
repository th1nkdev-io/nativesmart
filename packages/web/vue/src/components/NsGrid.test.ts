import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h } from "vue";
import NsGrid from "./NsGrid.vue";
import NsGridItem from "./NsGridItem.vue";

describe("NsGrid", () => {
  it("defaults to 12 columns and the layout gutter, measured on the window", () => {
    const wrapper = mount(NsGrid);
    const style = wrapper.attributes("style");
    expect(style).toContain("--ns-grid-count-base: 12");
    expect(style).toContain("--ns-grid-gap-base: var(--ns-grid-gutter)");
    expect(wrapper.classes()).toContain("ns-grid--viewport");
  });

  it("follows the layout grid tokens", () => {
    expect(mount(NsGrid, { props: { columns: "layout" } }).attributes("style")).toContain(
      "--ns-grid-count-base: var(--ns-grid-columns)"
    );
  });

  it("changes columns and gaps per breakpoint", () => {
    const wrapper = mount(NsGrid, {
      props: { columns: { base: 1, md: 2, lg: 3 }, gap: { base: "2", lg: "6" }, rowGap: "8" }
    });
    const style = wrapper.attributes("style");
    expect(style).toContain("--ns-grid-count-md: 2");
    expect(style).toContain("--ns-grid-gap-lg: var(--ns-space-6)");
    expect(style).toContain("--ns-grid-rgap-base: var(--ns-space-8)");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["ns-grid--count-lg", "ns-grid--gap-lg"])
    );
  });

  it("becomes fluid with a minimum item width", () => {
    const wrapper = mount(NsGrid, { props: { minItemWidth: "240px" } });
    expect(wrapper.classes()).toContain("ns-grid--fluid");
    expect(wrapper.attributes("style")).toContain("--ns-grid-min: 240px");
  });

  it("measures its own width when asked", () => {
    const wrapper = mount(NsGrid, { props: { breakpoints: "container" } });
    expect(wrapper.classes()).toContain("ns-grid-scope");
    expect(wrapper.find(".ns-grid").classes()).toContain("ns-grid--container");
  });

  it("renders a list when asked, with dense packing", () => {
    const wrapper = mount(NsGrid, { props: { as: "ul", dense: true } });
    expect(wrapper.element.tagName).toBe("UL");
    expect(wrapper.classes()).toContain("ns-grid--dense");
  });
});

describe("NsGridItem", () => {
  it("spans, offsets and orders per breakpoint", () => {
    const wrapper = mount(NsGridItem, {
      props: { span: { base: 12, md: 6 }, offset: { lg: 2 }, order: "first", rowSpan: 2 }
    });
    const style = wrapper.attributes("style");
    expect(style).toContain("--ns-grid-item-span-base: 12");
    expect(style).toContain("--ns-grid-item-span-md: 6");
    expect(style).toContain("--ns-grid-item-start-lg: 3");
    expect(style).toContain("--ns-grid-item-order-base: -1");
    expect(style).toContain("--ns-grid-item-rows-base: 2");
  });

  it("takes the whole row with full", () => {
    expect(mount(NsGridItem, { props: { span: "full" } }).attributes("style")).toContain(
      "--ns-grid-item-span-base: 999"
    );
  });

  it("nests inside a grid", () => {
    const wrapper = mount(NsGrid, {
      slots: { default: () => [h(NsGridItem, { span: 4 }, () => "A"), h(NsGridItem, () => "B")] }
    });
    expect(wrapper.findAll(".ns-grid-item")).toHaveLength(2);
  });
});
