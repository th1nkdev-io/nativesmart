import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NsAspectRatio from "./NsAspectRatio.vue";

const ratioOf = (props: Record<string, unknown>) =>
  mount(NsAspectRatio, { props }).attributes("style");

describe("NsAspectRatio", () => {
  it("reads ratio tokens, numbers and w:h strings", () => {
    expect(ratioOf({})).toContain("--ns-aspect-ratio: var(--ns-aspect-video)");
    expect(ratioOf({ ratio: "golden" })).toContain("var(--ns-aspect-golden)");
    expect(ratioOf({ ratio: 2 })).toContain("--ns-aspect-ratio: 2");
    expect(ratioOf({ ratio: "4:5" })).toContain("--ns-aspect-ratio: 4 / 5");
    expect(ratioOf({ ratio: "3/2" })).toContain("--ns-aspect-ratio: 3 / 2");
  });

  it("lets the media keep its own ratio with auto", () => {
    const wrapper = mount(NsAspectRatio, { props: { ratio: "auto" } });
    expect(wrapper.classes()).toContain("ns-aspect-ratio--auto");
    expect(wrapper.attributes("style")).not.toContain("--ns-aspect-ratio:");
  });

  it("switches ratio from a breakpoint up", () => {
    const wrapper = mount(NsAspectRatio, {
      props: { ratio: "square", responsive: { md: "wide" } }
    });
    expect(wrapper.classes()).toContain("ns-aspect-ratio--at-md");
    expect(wrapper.attributes("style")).toContain("--ns-aspect-ratio-md: var(--ns-aspect-wide)");
  });

  it("shows the placeholder until the image loads", async () => {
    const wrapper = mount(NsAspectRatio, {
      slots: { default: '<img src="photo.jpg" alt="Lagune" />' }
    });
    expect(wrapper.classes()).toContain("ns-aspect-ratio--loading");
    expect(wrapper.find(".ns-aspect-ratio__placeholder--shimmer").exists()).toBe(true);
    await wrapper.find("img").trigger("load");
    expect(wrapper.classes()).toContain("ns-aspect-ratio--loaded");
    expect(wrapper.find(".ns-aspect-ratio__placeholder").exists()).toBe(false);
    expect(wrapper.emitted("load")).toHaveLength(1);
  });

  it("falls back when the image fails, keeping its alternative text", async () => {
    const wrapper = mount(NsAspectRatio, {
      slots: { default: '<img src="gone.jpg" alt="Lagune" />' }
    });
    await wrapper.find("img").trigger("error");
    const fallback = wrapper.find(".ns-aspect-ratio__fallback");
    expect(fallback.attributes("role")).toBe("img");
    expect(fallback.attributes("aria-label")).toBe("Lagune");
    expect(wrapper.emitted("error")).toHaveLength(1);
  });

  it("uses a custom fallback", async () => {
    const wrapper = mount(NsAspectRatio, {
      slots: { default: '<img src="gone.jpg" alt="" />', fallback: "<p>Image indisponible</p>" }
    });
    await wrapper.find("img").trigger("error");
    expect(wrapper.find(".ns-aspect-ratio__fallback").text()).toBe("Image indisponible");
  });

  it("treats content that is not media as loaded", async () => {
    const wrapper = mount(NsAspectRatio, { slots: { default: "<div>Carte</div>" } });
    await wrapper.vm.$nextTick();
    expect(wrapper.classes()).toContain("ns-aspect-ratio--loaded");
  });

  it("forces the placeholder while loading and marks the frame busy", () => {
    const wrapper = mount(NsAspectRatio, {
      props: { loading: true },
      slots: { default: "<div>Carte</div>" }
    });
    expect(wrapper.find(".ns-aspect-ratio__placeholder").exists()).toBe(true);
    expect(wrapper.attributes("aria-busy")).toBe("true");
  });

  it("keeps the caption and scrim back until the media is there", () => {
    const wrapper = mount(NsAspectRatio, { props: { loading: true, title: "Grand-Bassam" } });
    expect(wrapper.find(".ns-aspect-ratio__caption").exists()).toBe(false);
    expect(wrapper.find(".ns-aspect-ratio__scrim").exists()).toBe(false);
  });

  it("renders a caption over a scrim, and overlays", async () => {
    const wrapper = mount(NsAspectRatio, {
      props: { title: "Grand-Bassam", description: "Côte d'Ivoire" },
      slots: { overlay: "<span>Nouveau</span>" }
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".ns-aspect-ratio__title").text()).toBe("Grand-Bassam");
    expect(wrapper.find(".ns-aspect-ratio__scrim").exists()).toBe(true);
    expect(wrapper.find(".ns-aspect-ratio__overlay").text()).toBe("Nouveau");
  });

  it("applies fit, focus, radius and a height cap", () => {
    const wrapper = mount(NsAspectRatio, {
      props: { fit: "contain", focus: "top", radius: "full", maxHeight: "60vh", as: "figure" }
    });
    expect(wrapper.element.tagName).toBe("FIGURE");
    expect(wrapper.classes()).toContain("ns-aspect-ratio--focus-top");
    const style = wrapper.attributes("style");
    expect(style).toContain("--ns-aspect-fit: contain");
    expect(style).toContain("var(--ns-radius-full)");
    expect(style).toContain("max-block-size: 60vh");
  });
});
